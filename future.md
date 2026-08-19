# Idee e Roadmap di Miglioramento Progetto (`future.md`)

Questo documento raccoglie le proposte evolutive e le feature consigliate per trasformare questo workflow in un sistema di produzione caroselli Instagram/LinkedIn ad alta produttività, scalabile e automatizzato.

---

## 1. Automazione della Pipeline & Scripting

- [ ] **Compilatore Automatico (`compile.js`)**:
  - Script CLI che fa il parsing di `02-carosello.md` (estraendo titolo, corpo, template e percorso immagine) e compila automaticamente i file in `posts/<slug>/compiled/slide-NN.html`.
  - Elimina il lavoro manuale di copia-incolla dei placeholder `{{TITOLO}}`, `{{TESTO}}`, `{{IMMAGINE}}`.

- [ ] **Linter & Validatore di Brand (`validate.js`)**:
  - Script di verifica pre-render per controllare che ogni slide rispetti i vincoli di `brand/style.md`:
    - Lunghezza titolo (max 8 parole).
    - Lunghezza corpo (max 25 parole).
    - Presenza CTA univoca sull'ultima slide.
    - Esistenza e risoluzione minima degli asset immagine in `03-immagini/`.

- [ ] **Comando Unico `npm run build:post <slug>`**:
  - Pipeline concatenata: `Valida -> Compila HTML -> Render Playwright -> Output pronto`.

---

## 2. Nuovi Template & Varianti Visive

Espandere la cartella `templates/` con layout ad alto engagement:

- [ ] **`slide-statistica.html` (Big Number)**: Focus su un numero grande d'impatto (es. "+147%", "8 su 10"), etichetta e breve spiegazione.
- [ ] **`slide-confronto.html` (Before/After o VS)**: Due colonne a contrasto (es. "Approccio Vecchio vs Nuovo", "Sbagliato vs Corretto").
- [ ] **`slide-citazione.html` / `slide-tweet.html`**: Stile scheda profilo social / citazione evidenziata con avatar e nome.
- [ ] **`slide-codice.html` / `slide-terminale.html`**: Finestra editor/terminale scuro con sintassi evidenziata per post tecnici.
- [ ] **`slide-continuo-seamless.html` (Swipe continuo)**: Setup per immagini panoramiche o elementi grafici/frecce che "tagliano" il bordo destro della slide N e continuano sul bordo sinistro della slide N+1.

---

## 3. UI di Anteprima Interattiva (Live Web Preview)

- [ ] **Viewer Locale in Browser**:
  - Semplice interfaccia web locale (es. Vite/Node server) che monta le slide compilate in un simulatore interattivo di smartphone con swipe orizzontale.
  - Possibilità di testare al volo come appare il carosello prima di esportare le immagini PNG.

- [ ] **Quick Theme Switcher**:
  - Possibilità di cambiare al volo i colori o il font tramite un selettore e vedere l'impatto su tutte le slide contemporaneamente.

---

## 4. Multi-Formato ed Esportazione Cross-Platform

- [ ] **Supporto Multi-Rapporto d'Aspetto**:
  - Flag per esportare lo stesso post in diversi formati senza modificare i file a mano:
    - **4:5 (1080x1350px)**: Feed Instagram (default attuale).
    - **1:1 (1080x1080px)**: Feed standard / Facebook.
    - **9:16 (1080x1920px)**: Instagram Stories / TikTok slideshow.
- [ ] **Esportazione PDF per LinkedIn**:
  - Aggiungere un comando in `render.js` o script dedicato che unisce tutti i PNG in un unico file `.pdf` con le dimensioni corrette, pronto per essere caricato come carosello documento su LinkedIn.

---

## 5. Assistenza AI Avanzata & Workflow Caption

- [ ] **Generazione Caption & Hashtag (`caption.md`)**:
  - Generare automaticamente per ogni post il testo di accompagnamento (hook iniziale, corpo del testo per la caption, call-to-action per i commenti e gruppo di 5-10 hashtag mirati).
- [ ] **Integrazione API Generazione Immagini**:
  - Script per inviare direttamente i prompt definiti in `02-carosello.md` a un motore di generazione immagini (es. Imagen/FLUX/DALL-E) e salvare i file direttamente in `03-immagini/slide-N.png`.

---

## 6. Gestione Multi-Brand & Temi Dinamici

- [ ] **Configurazioni Brand multiple**:
  - Supporto a più file brand (es. `brand/tech-dark.json`, `brand/editorial-light.json`).
  - Iniezione automatica delle variabili CSS (`--color-bg`, `--color-accent`, `--font-title`) durante la fase di compilazione, rendendo i template 100% indipendenti dal brand.
