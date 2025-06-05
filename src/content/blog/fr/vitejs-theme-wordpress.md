---
title: Comment ajouter ViteJS à son thème WordPress
description: Découvrez dans cet article comment intégrer simplement ViteJS dans un thème WordPress pour améliorer votre workflow de développement.
publishingDate: 2025-05-01
tags: ['WordPress', 'ViteJS', 'TailwindCSS']
published: true
href: vitejs-theme-wordpress
---

Dans mon activité de développeur freelance, il m'arrive très souvent de travailler avec WordPress. Au début, j'utilisais les différents builders de l'écosystème, mais aujourd'hui je m'oriente vers des thèmes personnalisés. Un choix peut-être discutable, mais selon moi, il est bien plus cohérent, tant pour moi que pour mon client.

Après avoir bataillé pendant des heures, suivi tous les tutoriels que j'ai pu trouver sur internet, j'ai enfin réussi à résoudre le plus gros problème (selon moi) dans l'expérience de développement de thèmes WordPress.

Avant de commencer, je tiens à remercier [Stéfan Lancelot](https://github.com/stfnlnc) qui m'a grandement aidé dans la mise en place de mon starter.

## Pourquoi utiliser ViteJS dans son thème WordPress ?

Vite apporte de nombreux avantages pour le développement de thèmes WordPress et me permet de gagner en efficacité lorsque je travaille sur un projet. Et pour cause, il apporte de nombreux avantages comme :

- Rapidité et fluidité de développement
- Le Hot Module Replacement (HMR)
- Optimisation pour la production

En bref, son intérêt mériterait un article à part entière. Concentrons-nous pour le moment sur l'implémentation de ViteJS dans un thème. En regardant les différents articles et tutoriels que j'ai pu trouver, j'ai cru pendant longtemps que c'était tout un chantier d'intégrer ViteJS et son hot reload dans un thème WordPress.

Au final (et grâce à Stéfan), j'ai trouvé une version vraiment très simple à implémenter. Pour les personnes voulant un starter avec uniquement ViteJS et TailwindCSS pour commencer directement, vous trouverez un dépôt à cloner [ici](https://github.com/pommito/wp-theme-starter).

## Installer ViteJS dans son thème WordPress

### Étape 1 : Installation des dépendances

À la racine de votre thème (je suppose ici que vous avez déjà un thème mis en place), installez ViteJS :

```bash
npm i vite tailwindcss @tailwindcss/vite
```

Dans votre package.json, vous devriez maintenant voir ViteJS ainsi que Tailwind dans les dépendances de votre projet. Tailwind n'est pas obligatoire ici.

```json
{
    "name": "tuto-vite",
    "version": "1.0.0",
    "description": "ViteJS in Wordpress theme",
    "main": "index.js",
    "scripts": {
        "dev": "vite",
        "build": "vite build"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "type": "commonjs",
    "dependencies": {
        "@tailwindcss/vite": "^4.1.5",
        "tailwindcss": "^4.1.5",
        "vite": "^6.3.2"
    }
}
```

> Dans ce fichier, les scripts dev et build sont également nécessaires pour le bon fonctionnement de Vite.

### Étape 2 : Éditer et configurer ViteJS

Ici, rien de bien compliqué, on configure simplement le comportement du build de nos assets ainsi que l'ajout de Tailwind à Vite.

```js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    build: {
        outDir: 'dist',
        assetsDir: '',
        emptyOutDir: true,
        manifest: true,
    },
    plugins: [tailwindcss()],
})
```

Une fois la configuration faite, on peut lancer notre projet en développement :

```bash
npm run dev
```

> Pour le moment, il ne se passe pas grand-chose, on est d'accord.

Maintenant, vous pouvez mettre en place un fichier `main.js` et `main.css` dans le dossier `assets` de votre projet. Notre fichier JavaScript va être le point d'entrée de nos assets, nous allons donc importer notre fichier `main.css` directement dans notre fichier `main.js`.

```js
import './main.css'

console.log('Vite is working!')
```

Pour faire fonctionner Tailwind, n'oubliez pas de l'importer dans votre fichier :

```css
@import 'tailwindcss';
@source "./**/*.php";
```

### Étape 3 : Gérer l'ajout de nos assets dans notre projet

Maintenant que Vite et Tailwind sont ajoutés et configurés, il faut ajouter nos assets dans notre projet pour pouvoir profiter des fonctionnalités de Vite. Pour ce faire, nous allons utiliser une fonction dans notre fichier functions.php qui va, en fonction de l'environnement (dev ou prod), charger les bons fichiers.

```php
function load_vitejs_assets(): void
{
    if (WP_DEBUG) {
        echo '<script type="module" src="http://localhost:5173/@vite/client"></script>';
        echo '<script type="module" src="http://localhost:5173/assets/main.js"></script>';
    } elseif (is_dir(get_theme_file_path() . "/dist")) {
        $data = file_get_contents(
            get_theme_file_path() . "/dist/.vite/manifest.json"
        );
        $manifest = json_decode($data, true)["index.html"];
        wp_enqueue_script(
            "vitejs",
            get_template_directory_uri() . "/dist/" . $manifest["file"],
            [],
            1,
            true
        );
        wp_enqueue_style(
            "vitejs",
            get_template_directory_uri() . "/dist/" . $manifest["css"][0]
        );
    }
}

add_action("wp_enqueue_scripts", "load_vitejs_assets");
```

Cette fonction va gérer l'ajout des assets dans notre projet en fonction de l'environnement dans lequel nous sommes, via la variable `WP_DEBUG`.

Concrètement, si nous sommes en mode développement (`WP_DEBUG` est `true`), nous allons charger les fichiers depuis le serveur de développement de Vite (`http://localhost:5173`). Si nous sommes en mode production (`WP_DEBUG` est `false`), nous allons charger les fichiers compilés depuis le dossier `dist` de notre thème.

### Étape 4 : Lancement de l'environnement de développement

À ce stade, voici le contenu de mon thème :

```
└── 📁theme-vite
    ├── 📁assets
    │   ├── main.css
    │   └── main.js
    ├── functions.php
    ├── index.php
    ├── package-lock.json
    ├── package.json
    ├── style.css
    └── vite.config.mjs
```

Pour lier votre serveur Vite à votre thème, veillez à bien avoir dans votre balise `<head>` le chargement de vos scripts. Au minimum, vous devriez avoir :

```php
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo("charset"); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title><?php wp_title(); ?></title>
    <?php wp_head(); ?>
</head>
```

## Conclusion

Si vous avez suivi les étapes précédentes, vous devriez désormais voir sur le frontend de votre site WordPress votre serveur de développement de Vite (`http://localhost:5173`), ainsi que vos assets. Vous pouvez désormais modifier vos fichiers et le HMR rechargera automatiquement votre page !

Voilà, aujourd'hui tous mes projets WordPress se basent sur ce starter, qui est pour moi bien plus agréable à utiliser dans mon développement. Il est très certainement perfectible et peut être configuré de bien d'autres manières. Si vous utilisez également ViteJS d'une autre façon, n'hésitez pas à me faire un retour.
