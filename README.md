# Portfolio Mohamed AIT KHERI

Portfolio professionnel développé avec Next.js 14, TypeScript, Tailwind CSS et Framer Motion.

## 🚀 Fonctionnalités

- **Design moderne et interactif** avec des animations fluides
- **Curseur personnalisé** avec effet magnétique
- **Animations au scroll** avec Framer Motion
- **Visualisation de réseau neuronal** animée en SVG
- **Navigation sticky** avec indicateur de section active
- **Compteurs animés** pour les statistiques
- **Cartes interactives** avec effets hover 3D
- **Effets de shimmer et glow** sur les éléments
- **Particules flottantes** dans la section contact
- **Responsive design** pour tous les appareils

## 🛠️ Technologies utilisées

- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Bibliothèque d'animations
- **React** - Bibliothèque JavaScript

## 📦 Installation

### Prérequis

- Node.js 18+ 
- npm ou yarn

### Étapes d'installation

1. **Cloner ou télécharger le projet**

```bash
cd portfolio-nextjs
```

2. **Installer les dépendances**

```bash
npm install
# ou
yarn install
```

3. **Lancer le serveur de développement**

```bash
npm run dev
# ou
yarn dev
```

4. **Ouvrir le navigateur**

Allez sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
portfolio-nextjs/
├── app/
│   ├── globals.css          # Styles globaux et animations CSS
│   ├── layout.tsx            # Layout racine
│   └── page.tsx              # Page principale
├── components/
│   ├── CustomCursor.tsx      # Curseur personnalisé
│   ├── Navigation.tsx        # Barre de navigation
│   ├── Hero.tsx              # Section hero
│   ├── NeuralNetwork.tsx     # Animation SVG réseau neuronal
│   ├── Stats.tsx             # Section statistiques
│   ├── Experience.tsx        # Section expérience
│   ├── Projects.tsx          # Section projets
│   ├── Skills.tsx            # Section compétences
│   ├── Contact.tsx           # Section contact
│   └── Footer.tsx            # Pied de page
├── public/                   # Fichiers statiques
├── package.json              # Dépendances
├── tsconfig.json             # Configuration TypeScript
├── tailwind.config.js        # Configuration Tailwind
└── next.config.js            # Configuration Next.js
```

## 🎨 Personnalisation

### Couleurs

Les couleurs sont définies dans `app/globals.css` :

```css
:root {
  --primary: #0a0e27;
  --secondary: #1a1f3a;
  --accent: #00d9ff;
  --accent-warm: #ff6b35;
  --text: #e8eaed;
  --text-dim: #9ca3af;
  --border: rgba(0, 217, 255, 0.2);
}
```

### Contenu

Modifiez le contenu dans les fichiers de composants respectifs :

- **Expérience** : `components/Experience.tsx`
- **Projets** : `components/Projects.tsx`
- **Compétences** : `components/Skills.tsx`
- **Formation** : `components/Skills.tsx`
- **Contact** : `components/Contact.tsx`

## 🚀 Déploiement

### Vercel (Recommandé)

1. Poussez votre code sur GitHub
2. Importez le projet sur [Vercel](https://vercel.com)
3. Déployez automatiquement

### Build de production

```bash
npm run build
npm start
```

## 📱 Responsive

Le portfolio est entièrement responsive et optimisé pour :

- Desktop (1200px+)
- Tablette (768px - 1199px)
- Mobile (< 768px)

## ⚡ Optimisations

- **Code splitting** automatique avec Next.js
- **Lazy loading** des images et composants
- **Animations optimisées** avec Framer Motion
- **CSS optimisé** avec Tailwind et PurgeCSS

## 🎯 Interactions spéciales

- **Curseur magnétique** : Suit la souris avec effet de retard
- **Hover effects** : Transformations 3D sur les cartes
- **Scroll animations** : Apparitions progressives au scroll
- **Compteurs animés** : Incrémentation automatique
- **Particules** : Animation de particules flottantes
- **Shimmer effect** : Effet de brillance sur les cartes
- **Gradient borders** : Bordures avec dégradés animés

## 📄 Licence

Ce projet est libre d'utilisation pour votre propre portfolio.

## 👤 Auteur

**Mohamed AIT KHERI**
- Email: medaitkheri@gmail.com
- LinkedIn: [Mohamed Ait Kheri](https://linkedin.com/in/mohamed-ait-kheri)
- GitHub: [aitkherimed1228](https://github.com/aitkherimed1228)

---

Développé avec ❤️ et Next.js
