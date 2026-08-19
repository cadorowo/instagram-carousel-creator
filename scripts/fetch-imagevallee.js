/**
 * scripts/fetch-imagevallee.js
 * Scraper & downloader for the official Regione Autonoma Valle d'Aosta photo archive (ImageVallée).
 * URL: https://www.regione.vda.it/imagevallee/default_i.asp?phv=2
 *
 * Usage:
 *   node scripts/fetch-imagevallee.js "Pila" 10
 *   node scripts/fetch-imagevallee.js "bike" 5
 *   node scripts/fetch-imagevallee.js "Chamole" 5
 *   node scripts/fetch-imagevallee.js --category 17 (Sport) 10
 *   node scripts/fetch-imagevallee.js --municipality 31 (Gressan/Pila) 15
 */

import fs from 'fs';
import path from 'path';
import https from 'https';

const BASE_URL = 'https://www.regione.vda.it/imagevallee';
const OUTPUT_DIR = path.resolve('brands/chalet-grande-cerise/assets/imagevallee');

// Category mapping
const CATEGORIES = {
  castelli: 1,
  borghi: 2,
  cultura: 3,
  montagna: 4,
  chiese: 5,
  natura: 6,
  paesaggi: 7,
  artigianato: 11,
  animali: 12,
  laghi: 13,
  flora: 14,
  fauna: 15,
  reportage: 16,
  sport: 17,
};

// Municipality mapping
const MUNICIPALITIES = {
  gressan: 31, // Pila
  aosta: 3,
  cogne: 21,
  courmayeur: 22,
  fenis: 27,
  presaintdidier: 53,
  la_thuile: 41,
  valtournenche: 71, // Cervinia
  aymavilles: 8,
  brusson: 12,
};

async function searchImageVallee({ query = '', category = 0, municipality = 0, count = 10 }) {
  const url = `${BASE_URL}/default_i.asp?phv=2`;
  const postData = [
    'm_view=0',
    `m_filtra=${encodeURIComponent(query)}`,
    `m_filtra=${category}`,
    `m_filtra=${municipality}`,
    `m_fotopag=${Math.max(15, count)}`,
    'filtracerca=Cerca'
  ].join('&');

  const html = await makePostRequest(url, postData);
  return parsePhotosFromHtml(html, count);
}

function makePostRequest(urlStr, postData) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(urlStr);
    const options = {
      hostname: parsed.hostname,
      port: 443,
      path: parsed.pathname + parsed.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => { resolve(data); });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function parsePhotosFromHtml(html, limit = 10) {
  const results = [];
  const regex = /<a href="getimage_g\.asp\?ID=([0-9]+)"[^>]*title="([^"]*)"/g;
  let match;

  while ((match = regex.exec(html)) !== null && results.length < limit) {
    const id = match[1];
    const rawTitle = match[2].replace(/&quot;/g, '').replace(/&#241;/g, 'ñ').replace(/&#233;/g, 'é').replace(/&#224;/g, 'à').trim();
    results.push({
      id,
      title: rawTitle || `Foto ${id}`,
      url: `${BASE_URL}/getimage_g.asp?ID=${id}`,
      previewUrl: `${BASE_URL}/getimage_h.asp?ID=${id}`,
    });
  }
  return results;
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(destPath);
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function main() {
  const args = process.argv.slice(2);
  let query = '';
  let category = 0;
  let municipality = 0;
  let count = 10;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--category') {
      category = CATEGORIES[args[++i].toLowerCase()] || parseInt(args[i]) || 0;
    } else if (args[i] === '--municipality') {
      municipality = MUNICIPALITIES[args[++i].toLowerCase()] || parseInt(args[i]) || 0;
    } else if (!isNaN(parseInt(args[i])) && !query) {
      count = parseInt(args[i]);
    } else {
      query = args[i];
    }
  }

  if (args.length === 0) {
    query = 'Pila';
  }

  console.log(`🔍 Ricerca ImageVallée: Query="${query}", Cat=${category}, Comune=${municipality}, Max=${count}`);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const photos = await searchImageVallee({ query, category, municipality, count });
  console.log(`📸 Trovate ${photos.length} immagini reali.`);

  const downloaded = [];
  for (const photo of photos) {
    const cleanName = photo.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 40);
    const fileName = `${photo.id}-${cleanName || 'image'}.jpg`;
    const destPath = path.join(OUTPUT_DIR, fileName);

    console.log(`⬇️ Scaricando [${photo.id}]: "${photo.title}" -> ${fileName}`);
    try {
      await downloadImage(photo.url, destPath);
      downloaded.push({ id: photo.id, title: photo.title, file: fileName, path: destPath });
    } catch (err) {
      console.error(`❌ Errore scaricamento ${photo.id}:`, err.message);
    }
  }

  // Update imagevallee-manifest.json
  const manifestPath = path.join(OUTPUT_DIR, 'manifest.json');
  let existingManifest = [];
  if (fs.existsSync(manifestPath)) {
    try {
      existingManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } catch (e) {}
  }
  const merged = [...existingManifest, ...downloaded.filter(d => !existingManifest.some(m => m.id === d.id))];
  fs.writeFileSync(manifestPath, JSON.stringify(merged, null, 2));

  console.log(`\n✅ Scaricate con successo ${downloaded.length} immagini in ${OUTPUT_DIR}`);
}

main().catch(console.error);
