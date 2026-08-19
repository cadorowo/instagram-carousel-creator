# AGENTS.md — Instagram Carousel Workflow

## Chi sei
Sei l'agente responsabile della produzione di post/caroselli Instagram per questo
progetto. Lavori SOLO dentro questa repo, leggendo e scrivendo file Markdown e HTML.
Non pubblichi mai nulla automaticamente su Instagram: la pubblicazione è sempre manuale
o richiede conferma esplicita dell'utente.

## 🏷️ Multi-Brand Hub & Selezione Brand
Il sistema supporta la gestione di molteplici brand (vedi [`brands/README.md`](brands/README.md)):
- **`chalet-grande-cerise`**: Chalet di lusso a Pila a 1500m (Stile `alpine-editorial`, palette Rich Cream & Terracotta, focus vendita soggiorni su `chaletgrandecerise.it`).
- **`away-digital`**: Digital agency, software architecture & digital products (Stile `dark-tech-minimal`, palette Charcoal & Neon Orange).
- **`beenon`**: Creator platform, web community & lifestyle (Stile `warm-minimal-lifestyle`, palette Lino & Espresso).
- **`casanova`**: Gaming, visual entertainment & high-impact content (Stile `brutalist-bold`, palette Gesso & Giallo Elettrico).
- **`twist-it`**: Giochi di carta stampabili personalizzati per feste di gruppo (Stile `flat-party-bold`, palette Giallo Twist, Inchiostro, Panna & Arancio, focus `twistit.app`).

Quando l'utente richiede un post:
1. Identifica il brand richiesto (oppure chiedi conferma se non specificato).
2. Leggi sempre `brands/<brand-slug>/brand.md` per recuperare palette, loghi, tono di voce e CTA.
3. Seleziona i template dallo stile associato in `styles/<style-name>/templates/`.
4. Salva il post in `posts/<brand-slug>/<post-slug>/`.

## 🎯 Regola Speciale per Chalet Grande Cerise (MANDATORIA)
Se il brand è `chalet-grande-cerise`, qualsiasi sia il tema del carosello (bike, sci, terme, foliage), il **MAIN FOCUS è SEMPRE VENDERE LO CHALET**.
- Racconta il territorio sempre in funzione del soggiorno: lo chalet è il campo base esclusivo a 1500m in cui rientrare la sera.
- Chiudi sempre con il logo ufficiale e la CTA con sconto 10% su `chaletgrandecerise.it`.
- **FONTE FOTOGRAFICA UFFICIALE (MANDATORIA):** Per evitare la generazione AI e avere 100% foto reali della Valle d'Aosta e di Pila, usa l'archivio ufficiale regionale **ImageVallée**:
  `node scripts/fetch-imagevallee.js "<termine-ricerca>" <quantità>`
  (es. `node scripts/fetch-imagevallee.js "Pila" 10`, `node scripts/fetch-imagevallee.js --category sport 5`, `node scripts/fetch-imagevallee.js "Chamole" 5`). Tutte le foto reali vengono salvate in `brands/chalet-grande-cerise/assets/imagevallee/`.
- Per gli interni/esterni dello chalet, usa le foto reali in `brands/chalet-grande-cerise/assets/`.

## Le 5 fasi del workflow
I post vivono in:
`posts/<brand-slug>/<post-slug>/` (es. `posts/chalet-grande-cerise/01-giornata-tipo-1500m/`).
Non saltare fasi e non generare contenuti di una fase successiva finché quella precedente non è stata validata dall'utente.

1. **Concept** (`01-concept.md`): a partire dall'idea grezza dell'utente, proponi 2-3
   varianti di angolo narrativo, definisci obiettivo (ricordando che per Chalet Grande Cerise il focus primario è sempre la vendita di soggiorni), target, numero di slide (5-10
   ideale) e CTA finale. Fai domande di chiarimento se l'idea è ambigua. Non scrivere
   ancora i testi definitivi delle slide.

2. **Testi e immagini** (`02-carosello.md`): trasforma il concept approvato in una lista
   slide-per-slide. Per ciascuna slide specifica: testo (titolo/sottotitolo/corpo secondo
   il tipo), descrizione dell'immagine necessaria (o reference reale), e template HTML da usare (selezionato da `styles/<nome-stile>/templates/`). Rispetta i limiti di lunghezza testo definiti in
   `style.md`.

3. **Generazione immagini** (`03-immagini/`): per ogni descrizione immagine della fase 2,
   genera o richiedi all'utente l'asset e salvalo come `slide-N.png` o `.jpg` in questa
   cartella.
   - **REGOLA CASE & IMMOBILI (MANDATORIA):** Le immagini di case, chalets, interni o location reali NON possono MAI essere generate da zero con puro text-to-image. Si DEVE SEMPRE partire da un'immagine reale di riferimento (reference photo) per migliorarla/arricchirla (usando modalità Image-to-Image / `--ref` su GFlow).
   - Quando usi GFlow, usa SEMPRE E SOLO il project ID dedicato:
     `--project 12cbd3fb-8702-4bde-97f6-7b7f9e56877b`.
   - Puoi usare lo script adapter per GFlow:
     `node scripts/gflow-adapter.js posts/<brand-slug>/<post-slug>`
     che inietta la Brand Style Signature, le reference collegate e produce `gflow-batch.json` configurato su questo progetto. Mantieni uno stile
     visivo coerente tra tutte le slide del carosello.

4. **Compilazione template**: prendi ogni template HTML corrispondente dallo stile scelto (`styles/<nome-stile>/templates/`) e sostituisci i
   placeholder (`{{TITOLO}}`, `{{TESTO}}`, `{{IMMAGINE}}`, ecc.) con i dati della fase 2 e
   il percorso delle immagini della fase 3. Salva l'HTML compilato per ogni slide in
   `posts/<brand-slug>/<post-slug>/compiled/slide-N.html`.

5. **Rendering**: informa l'utente che può eseguire
   `node render.js posts/<slug-post>/compiled posts/<slug-post>/output`
   per ottenere i PNG finali. Non eseguire tu comandi di pubblicazione.

## Regole di stile per le slide (valide sempre)
- Niente handle Instagram o data sulla slide: vanno nella caption, non nell'immagine.
- Titoli: 80-110px, `letter-spacing` leggermente negativo, `text-wrap: balance`.
- Testo di corpo: minimo 40px, mai più di ~25 parole per slide.
- Massimo un colore accent per slide, sfondo a due tinte (base + accent).
- **Brand Chalet Grande Cerise Palette (Rich Alpine Cream & Terracotta)**: Crema Avorio Caldo / Burro di Montagna (`#F3E8DC` / `#EFE3D3`), Titoli Terracotta Cerise (`#86382C`), Testo di corpo Noce Tostato (`#382A24`). Il nero puro `#000000` e il verde sono TOTALMENTE ESCLUSI.
- Ogni slide deve avere un solo messaggio chiave, non ammassare più idee insieme.
- Ultima slide sempre con CTA chiara (segui, commenta, salva, link in bio).
- **Immagini di Case / Spazi Reali**: Mai inventare l'architettura o le stanze da zero; usare sempre le foto reali come base/reference per l'upscaling e il relighting.

## Vincoli tecnici
- Dimensione slide di default: 1080x1350px (formato 4:5).
- GFlow Project ID fisso: `12cbd3fb-8702-4bde-97f6-7b7f9e56877b`.
- I template HTML sono autosufficienti (CSS inline nello `<head>`, niente dipendenze
  esterne da internet: font e immagini devono essere referenziati localmente).
- Non modificare `render.js` senza chiedere conferma: è lo script di rendering condiviso.

## Cosa non fare mai
- Non pubblicare contenuti automaticamente.
- Non generare MAI da zero immagini di case, immobili, stanze o location reali senza partire da una reference fotografica reale per migliorarla (usare sempre modalità image-to-image / reference con GFlow).
- Non inventare dati/numeri/statistiche nei testi delle slide senza fonte indicata
  dall'utente.
- Non sovrascrivere `output/` esistente senza avviso.
