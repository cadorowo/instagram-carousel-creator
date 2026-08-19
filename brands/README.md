# Brands Hub — Selezione Brand & Identità

Questa cartella raccoglie tutti i **Brand** configurati nel sistema. Ciascun brand definisce la propria identità, i propri asset (loghi/foto), i vincoli di business e lo **Stile Grafico** predefinito (da `styles/`).

---

## 🏷️ Brand Disponibili per la Creazione Post

| Brand Slug | Nome Brand | Stile Associato | Palette Caratteristica | Focus di Conversione |
| :--- | :--- | :--- | :--- | :--- |
| **`chalet-grande-cerise`** | **Chalet Grande Cerise** | `alpine-editorial` | Crema Avorio (`#F3E8DC`) + Terracotta (`#86382C`) + Noce (`#382A24`) | Vendita diretta soggiorni a Pila (sconto 10% su `chaletgrandecerise.it`) |
| **`away-digital`** | **Away Digital** | `dark-tech-minimal` | Dark Charcoal (`#0F0F0F`) + Neon Orange (`#FF5A36`) + White (`#FFFFFF`) | Soluzioni software, consulenza tech & digital products |
| **`beenon`** | **BeenON** | `warm-minimal-lifestyle` | Lino (`#F6F2EC`) + Espresso (`#241E1A`) + Terracotta Argilla (`#9E5848`) | Creator platform, lifestyle & social community |
| **`casanova`** | **Casanova** | `brutalist-bold` | Gesso (`#F3F3F3`) + Deep Black (`#0A0A0A`) + Giallo Elettrico (`#E8FE46`) | Entertainment, gaming & visual engagement |
| **`twist-it`** | **Twist It** | `flat-party-bold` | Giallo Twist (`#FFD400`) + Inchiostro (`#141414`) + Panna (`#FDFBF4`) + Arancio (`#FD6C12`) | Giochi di carta personalizzati per feste di gruppo su `twistit.app` |

---

## 🚀 Come Creare un Post per un Brand

Quando chiedi all'agente di generare un nuovo carosello, puoi specificare il brand desiderato:
> *"Crea un carosello per **Chalet Grande Cerise** su le migliori escursioni invernali"*  
> *"Crea un carosello per **Away Digital** sui 3 trend dell'AI nel 2026"*  
> *"Crea un carosello per **BeenON** in stile warm-minimal"*

L'agente creerà automaticamente la cartella corrispondente in:
`posts/<brand-slug>/<post-slug>/`
applicando i loghi, i colori, lo stile e la CTA corretta.

---

## ➕ Come Aggiungere un Nuovo Brand

1. Crea la cartella `brands/<nuovo-brand>/assets/`
2. Aggiungi il file `brands/<nuovo-brand>/brand.md` indicando:
   - Stile preferito (da `styles/`)
   - Palette colori esatta
   - Regole di business e CTA finale
3. Inserisci il logo in `brands/<nuovo-brand>/assets/logo.png`
