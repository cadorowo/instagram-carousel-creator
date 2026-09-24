#!/usr/bin/env node

/**
 * scripts/gflow-adapter.js
 * 
 * Legge 02-carosello.md, estrae i prompt per le immagini,
 * inietta i modificatori di stile del brand (brand/style.md)
 * e genera un file batch per GFlow (gflow-batch.json) o esegue
 * direttamente il comando di generazione se gflow-cli è installato.
 *
 * Uso:
 *   node scripts/gflow-adapter.js <cartella-post> [--run]
 *
 * Esempio:
 *   node scripts/gflow-adapter.js posts/hook-virali-instagram
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const GFLOW_PROJECT_ID = process.env.GFLOW_PROJECT_ID || "";
const BRAND_STYLE_SIGNATURE = 
  "minimalist dark UI tech aesthetic, deep charcoal and graphite background (#0F0F0F), vibrant neon orange accents (#FF5A36), clean 3D studio lighting, sharp focus, geometric composition, premium editorial look, high quality, no text watermark";

function parseCarouselFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File non trovato: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const sections = content.split(/##\s+Slide\s+/i).slice(1);

  const imageTasks = [];

  sections.forEach((sec, index) => {
    const slideNumberMatch = sec.match(/\*\*Numero Slide:\*\*\s*`?([^\n`]+)`?/i);
    const slideNum = slideNumberMatch ? slideNumberMatch[1].trim() : `0${index + 1}`;

    const imgMatch = sec.match(/\*\*Immagine:\*\*\s*`?([^\n`]+)`?/i);
    const promptMatch = sec.match(/\*\*Descrizione\s*\/\s*Prompt\s*Immagine:\*\*\s*`?([^\n`]+)`?/i);
    const refMatch = sec.match(/\*\*Reference(?:\s*Immagine)?:\*\*\s*`?([^\n`]+)`?/i);

    if (imgMatch && promptMatch) {
      const imgVal = imgMatch[1].trim();
      const promptVal = promptMatch[1].trim();
      const refVal = refMatch ? refMatch[1].trim() : null;

      if (imgVal.toLowerCase() !== 'nessuna' && imgVal.length > 0 && promptVal.length > 0) {
        // Estrai il nome del file target (es. slide-03.png)
        const filename = path.basename(imgVal);
        imageTasks.push({
          slide: slideNum,
          targetFile: filename,
          rawPrompt: promptVal,
          reference: refVal && refVal.toLowerCase() !== 'nessuna' ? refVal : null,
          fullPrompt: `${promptVal}, ${BRAND_STYLE_SIGNATURE}`,
          aspectRatio: "4:3",
        });
      }
    }
  });

  return imageTasks;
}

function main() {
  const postDir = process.argv[2];
  const shouldRun = process.argv.includes('--run');

  if (!postDir) {
    console.error('Uso: node scripts/gflow-adapter.js <cartella-post> [--run]');
    console.error('Esempio: node scripts/gflow-adapter.js posts/hook-virali-instagram');
    process.exit(1);
  }

  const resolvedPostDir = path.resolve(process.cwd(), postDir);
  const caroselloPath = path.join(resolvedPostDir, '02-carosello.md');
  const imagesDir = path.join(resolvedPostDir, '03-immagini');
  const batchJsonPath = path.join(resolvedPostDir, 'gflow-batch.json');

  if (!fs.existsSync(resolvedPostDir)) {
    console.error(`Errore: Cartella post '${postDir}' non trovata.`);
    process.exit(1);
  }

  fs.mkdirSync(imagesDir, { recursive: true });

  console.log(`\n🔍 Analisi file: ${caroselloPath}`);
  const tasks = parseCarouselFile(caroselloPath);

  if (tasks.length === 0) {
    console.log('ℹ️  Nessuna immagine richiesta in questo carosello (o tutte impostate su "nessuna").');
    return;
  }

  console.log(`✅ Trovate ${tasks.length} immagini da generare:`);
  tasks.forEach((t) => {
    console.log(`  - [Slide ${t.slide}] -> 03-immagini/${t.targetFile}`);
  });

  const batchPayload = {
    post: path.basename(resolvedPostDir),
    projectId: GFLOW_PROJECT_ID,
    generatedAt: new Date().toISOString(),
    brandStyle: BRAND_STYLE_SIGNATURE,
    tasks: tasks.map((t) => ({
      output: path.join('03-immagini', t.targetFile),
      aspectRatio: t.aspectRatio,
      reference: t.reference,
      prompt: t.fullPrompt,
      rawPrompt: t.rawPrompt,
    })),
  };

  fs.writeFileSync(batchJsonPath, JSON.stringify(batchPayload, null, 2), 'utf8');
  console.log(`\n💾 File batch GFlow creato con successo: ${path.relative(process.cwd(), batchJsonPath)}`);

  // Controlla se gflow è disponibile
  const checkGflow = spawnSync('which', ['gflow'], { encoding: 'utf8' });
  const hasGflow = checkGflow.status === 0;

  if (hasGflow && shouldRun) {
    console.log('\n🚀 Avvio esecuzione con GFlow CLI...');
    const runResult = spawnSync('gflow', ['batch', batchJsonPath, '--out-dir', imagesDir], {
      stdio: 'inherit',
    });
    if (runResult.status === 0) {
      console.log('✨ Generazione immagini completata con GFlow!');
    } else {
      console.error('⚠️  Errore durante l\'esecuzione di gflow batch.');
    }
  } else {
    console.log('\n📋 Prossimi passi:');
    if (hasGflow) {
      console.log(`  Esegui: gflow batch "${batchJsonPath}" --out-dir "${imagesDir}"`);
      console.log(`  Oppure: node scripts/gflow-adapter.js "${postDir}" --run`);
    } else {
      console.log('  1. Puoi usare il file `gflow-batch.json` generato con il tuo client/CLI GFlow preferito.');
      console.log(`  2. Gli asset verranno salvati direttamente in ${imagesDir}/`);
    }
  }
}

main();
