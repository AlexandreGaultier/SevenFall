# SevenFall - Site Web Vitrine

Site vitrine pour le système de JDR médiéval fantastique **SevenFall**.

## 🎨 Caractéristiques

- **Design automnal** avec palette de couleurs chaudes
- **Responsive** : adapté pour mobile, tablette et desktop
- **Animations soignées** : effets de fade-in, feuilles qui tombent, etc.
- **Curseur personnalisé** : curseur unique pour le site
- **Musique de fond** : système intégré pour la musique (à ajouter)
- **Navigation fluide** : menu responsive avec hamburger sur mobile

## 📁 Structure du Projet

```
SevenFall/
├── index.html          # Page d'accueil
├── regles.html         # Page des règles du système
├── classes.html        # Page des classes de personnages
├── personnages.html    # Page des fiches personnages (exemples)
├── monstres.html       # Page du bestiaire
├── scenarios.html      # Page des scénarios avec formulaire
├── styles.css          # Feuille de style principale
├── script.js           # Scripts JavaScript
├── music/              # Dossier pour la musique de fond
│   └── background.mp3  # (À ajouter)
└── README.md           # Ce fichier
```

## 🎵 Ajouter la Musique de Fond

1. Téléchargez votre fichier audio au format MP3
2. Renommez-le en `background.mp3`
3. Placez-le dans le dossier `music/`

Le système de musique est déjà intégré et fonctionnera automatiquement une fois le fichier ajouté.

## 🎨 Personnalisation des Couleurs

Le fichier `styles.css` contient des variables CSS pour faciliter la personnalisation. Plusieurs palettes sont disponibles en commentaire :

### Palette Actuelle (Automnale)
- Orange foncé, marron, crème

### Palette Alternative 1 (Plus douce)
- Commentée dans le CSS

### Palette Alternative 2 (Plus sombre)
- Commentée dans le CSS

### Palette Noir, Blanc et Orange
- Commentée dans le CSS

Pour changer de palette, décommentez la palette souhaitée dans `styles.css` et commentez la palette actuelle.

## 📱 Responsive

Le site est entièrement responsive :
- **Desktop** : Navigation complète en haut
- **Tablette** : Menu adaptatif
- **Mobile** : Menu hamburger avec navigation déroulante

## 🚀 Utilisation

1. Ouvrez `index.html` dans votre navigateur
2. Naviguez entre les différentes pages
3. Utilisez le bouton musique en bas à droite pour contrôler la musique de fond

## 📝 Formulaire de Scénarios

La page `scenarios.html` contient un formulaire pour déposer des scénarios. Actuellement, le formulaire affiche une alerte de confirmation. Pour une utilisation en production, vous devrez connecter le formulaire à un backend.

## 🛠️ Technologies Utilisées

- HTML5
- CSS3 (Variables CSS, Flexbox, Grid)
- JavaScript (Vanilla)
- Pas de dépendances externes

## 📄 Licence

Tous droits réservés - SevenFall
