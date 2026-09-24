# Stili & Templates — Instagram Carousel Framework

Questa cartella raccoglie i diversi **sistemi di stile visivo** (Design Systems) da cui derivano i template HTML e le regole di rendering per ciascun brand.

---

## 🎨 Catalogo degli Stili Disponibili

| Stile | Cartella | Mood & Settori Ideali | Palette Chiave | Tipografia |
| :--- | :--- | :--- | :--- | :--- |
| **Alpine Editorial** | [`styles/alpine-editorial/`](alpine-editorial/) | Hospitality di lusso, Chalet, Montagna, Architettura, Travel di prestigio | Crema Avorio (`#F3E8DC`), Terracotta Cerise (`#86382C`), Noce Tostato (`#382A24`) | *Playfair Display* + *Plus Jakarta Sans* |
| **Earthy Organic Editorial** | [`styles/earthy-organic-editorial/`](earthy-organic-editorial/) | Interior design, Architettura, Moodboard di design, Hospitality moderna | Crema Avorio (`#F0ECE1`), Terracotta Clay (`#8C5946`), Verde Oliva (`#5C6846`) | *Outfit* + *Plus Jakarta Sans* |
| **Dark Tech Minimal** | [`styles/dark-tech-minimal/`](dark-tech-minimal/) | SaaS, Tech, Creator Economy, AI tools, Formazione & Growth | Dark Charcoal (`#0F0F0F`), Neon Orange (`#FF5A36`), Bianco (`#FFFFFF`) | *Inter* / *Plus Jakarta Sans* + *Space Mono* |
| **Brutalist Bold** | [`styles/brutalist-bold/`](brutalist-bold/) | Streetwear, Gen Z, Eventi, Marketing provocatorio, E-commerce audace | Off-white (`#F3F3F3`), Deep Black (`#0A0A0A`), Giallo Elettrico (`#E8FE46`) | *Plus Jakarta Sans* (800) + *Space Mono* |
| **Warm Minimal Lifestyle** | [`styles/warm-minimal-lifestyle/`](warm-minimal-lifestyle/) | Wellness, Interior design, Moda sostenibile, Ristorazione d'autore | Lino Ecru (`#F6F2EC`), Sabbia (`#EAE3D9`), Espresso Notte (`#241E1A`) | *Cormorant Garamond* + *Inter* |
| **Flat Party Bold** | [`styles/flat-party-bold/`](flat-party-bold/) | Giochi di carta, Festa di gruppo, Party games, Group celebration (Twist It) | Giallo (`#FFD400`), Inchiostro (`#141414`), Panna (`#FDFBF4`), Arancio (`#FD6C12`) | *Playfair Display* (900) + *Inter* + *IBM Plex Mono* |

---

## 🏗️ Come Funziona la Relazione tra Brand, Stili e Post

1. **Uno Stile (`styles/<style-id>/`)** definisce il linguaggio visivo (palette generica, font pairing, proporzioni e suite di 5-10 template HTML riutilizzabili).
2. **Un Brand (`brand/<brand-slug>/` o `brand/style-<nome>.md`)** sceglie il suo *Stile* di riferimento, applica i propri loghi ufficiali, codici colore esatti e vincoli di copy.
3. **Un Post (`posts/<brand-slug>/<post-slug>/`)** utilizza i template dello stile scelto, compila i testi e le immagini, e renderizza i PNG finali in `output/`.

---

## 📁 Struttura Interna di Ogni Stile

```
styles/<nome-stile>/
├── style.md              <-- Guida di stile, regole tipografiche e palette
└── templates/            <-- Suite di slide HTML indipendenti
    ├── slide-01-cover.html
    ├── slide-02-....html
    └── ...
```
