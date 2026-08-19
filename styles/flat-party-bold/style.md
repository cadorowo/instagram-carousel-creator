# Style Guide — Flat Party Bold (Giochi di carta / Group Celebration / Gen Z & Millennial)

Stile derivato dal design system ufficiale dell'app **Twist It** (`webapp/design.md`): superfici piatte di colore pieno, disegno a tratto spesso, tipografia grossa nera. Riferimento visivo: la **faccia di una carta da gioco** che si riconosce a due metri, non la cartoleria.

## Identità Visiva
- **Il colore è il contenuto.** Un fondo di colore pieno vale quanto un'illustrazione. Giallo = "qui si tocca" (CTA, azione). Panna = lettura. Nero = struttura. I colori gioco (Viola, Azzurro, Rosso, Verde, Blu) entrano solo come superficie d'accento, uno per slide.
- **Niente texture, niente finto artigianale, niente gradienti.** Zero `linear-gradient`/`radial-gradient`, zero grana di carta, zero ombre decorative sul testo.
- **Filetti e bordi neri spessi** (2-6px): la carta comanda, le slide devono sembrare già pronte per la stampa.

## Palette Colori
- **Superficie Azione / CTA:** Giallo `#FFD400`
- **Testo & Struttura:** Inchiostro `#141414`
- **Sfondo Base / Lettura:** Panna `#FDFBF4`
- **Superficie Secondaria / Divisori:** Beige `#DED7C6`
- **Annotazione Ironica:** Arancio `#FD6C12` (Playfair 900, sempre tra parentesi)
- **Testo Secondario:** Grigio `#5C5648`
- **Accenti Gioco (una sola superficie per slide):** Viola `#8C6BFF` · Azzurro `#4CC9F0` · Rosso `#FF4A5E` · Verde `#7BD44A` · Blu `#3D5AF1`

## Tipografia
- **Titoli:** `Playfair Display` (900 per hero, 700 per citazioni), tracking stretto (`letter-spacing: -0.02em`), `text-wrap: balance`
- **Corpo:** `Inter` (400, 600), corpo minimo 40px, max ~25 parole
- **Etichette / Contatori / Numeri:** `IBM Plex Mono` (500), uppercase, letter-spacing `0.08-0.14em`

## Componenti Chiave
- **Filetto:** riga nera `#141414` spessa 2-4px che separa gli elementi (stile tabella stampata)
- **Pill CTA:** border-radius `999px`, giallo `#FFD400` su nero o nero `#141414` su giallo
- **Badge / Pill tag:** `IBM Plex Mono` uppercase, pill `999px` (es. "PRONTO", "SOLO LEI")
- **Annotazione ironica:** `Playfair Display` 900 arancio `#FD6C12`, testo tra parentesi
- **Swipe hint:** mono uppercase "SCORRI →"
- **Border radius ammessi:** solo `8px / 16px / 28px / 40px / 999px`

## Limiti di Testo
- Titolo: max 8 parole, 88-108px
- Corpo: max 25 parole, 40-46px
- Etichetta mono: max 5 parole uppercase
- Annotazione: max 10 parole

## Template Disponibili (`templates/`)
- `slide-01-cover.html`: Cover full yellow `#FFD400`, grande titolo nero e annotazione arancione.
- `slide-02-testo.html`: Card bianca/panna con bordo nero, titolo forte e testo di corpo.
- `slide-03-immagine-testo.html`: Box foto riquadrata in alto + testo e label in basso.
- `slide-04-lista-numerata.html`: Tabella di 3 punti numerati con badge scuro.
- `slide-05-big-number.html`: Numero gigante al centro per statistiche o percentuali (100%, 3 MIN, ecc.).
- `slide-06-citazione.html`: Card citazione con avatar e nome ("Chi l'ha detto?").
- `slide-07-closing.html`: Schermata finale dark con grande CTA pill gialla.
- `slide-08-bg-image-overlay.html`: Immagine di festa/laurea a tutto schermo con layer di trasparenza scuro, card frosted-glass con bordo giallo e testo panna.
- `slide-09-cover-bg-image.html`: Cover con foto full-bleed in background e overlay di trasparenza graduato per feste ad alto impatto.

## Cosa non fare mai
- ❌ Gradienti fini o finti 3D, ombre decorative su testo, texture di finta carta o cartoleria
- ❌ Più di un colore gioco d'accento per slide
- ❌ Font diversi da Playfair Display / Inter / IBM Plex Mono
- ❌ `border-radius` fuori dall'elenco 8/16/28/40/999px
- ❌ Annotazioni ironiche non in Arancio `#FD6C12` o non tra parentesi
- ❌ Nero su sfondo giallo nelle slide di lettura: il giallo è per azioni e CTA, non per il testo lungo
