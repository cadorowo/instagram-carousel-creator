# Instagram Carousel Workflow — Scaffold

Questo pacchetto contiene lo scaffold di partenza per il workflow descritto nel piano.
Sistema i file nella tua repo locale con questa struttura:

```
instagram-workflow/
├── AGENTS.md                      <- istruzioni permanenti per l'agente
├── render.js                      <- script Playwright HTML -> PNG
├── package.json                   <- (crealo con npm init, vedi sotto)
├── brand/
│   └── style.md                   <- config brand (colori, font, tono)
├── templates/
│   ├── slide-cover.html
│   ├── slide-testo.html
│   ├── slide-immagine-testo.html
│   └── slide-cta.html
└── posts/
    └── esempio-post/
        ├── 01-concept.md
        ├── 02-carosello.md
        ├── 03-immagini/          <- crea tu, ci metti gli asset generati
        └── output/                <- generato da render.js
```

## Setup iniziale (una volta sola)

```bash
mkdir instagram-workflow && cd instagram-workflow
npm init -y
npm install playwright
npx playwright install chromium
```

Poi copia dentro tutti i file di questo scaffold nelle cartelle indicate sopra.

## Uso quotidiano

1. Apri il tuo agente locale (Claude Code, Cursor, Aider...) nella cartella `instagram-workflow/`.
   Leggerà automaticamente `AGENTS.md` e capirà le regole del progetto.
2. Crea una nuova cartella in `posts/nome-post/` e chiedi all'agente di popolare
   `01-concept.md` (Fase 1) partendo dalla tua idea grezza.
3. Fatto approvare il concept, chiedi di generare `02-carosello.md` (Fase 2): testo +
   descrizione immagine per ogni slide, assegnando il template giusto a ciascuna.
4. Genera/scarica le immagini in `03-immagini/` (Fase 3).
5. Chiedi all'agente di compilare i template in `templates/` sostituendo i placeholder
   con i dati di `02-carosello.md`, salvando gli HTML compilati in `posts/nome-post/compiled/`.
6. Esegui il rendering:
   ```bash
   node render.js posts/nome-post/compiled posts/nome-post/output
   ```
7. Controlla i PNG in `output/`, poi pubblica manualmente (o via Meta Graph API se vuoi
   automatizzare anche quello in futuro).

## Note

- Formato slide di default: **1080x1350px** (4:5, il formato con più reach sui caroselli).
- Cambia le dimensioni in `render.js` e nel CSS `body{width;height}` dei template se vuoi
  passare a 1:1 (1080x1080) o 9:16 (1080x1920).
- I template usano `device_scale_factor` per un rendering nitido stile Retina, non serve
  che tu alzi manualmente le dimensioni CSS.
