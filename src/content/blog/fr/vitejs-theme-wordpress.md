---
title: Comment ajouter ViteJS à son thème WordPress
description: Découvrez comment intégrer ViteJS à un thème WordPress pour améliorer votre workflow de développement, profiter du hot reload et optimiser vos assets avec une configuration simple et efficace.
publishingDate: 2025-05-01
tags: ['WordPress', 'ViteJS', 'TailwindCSS']
published: true
href: vitejs-theme-wordpress
---

Dans mon activité de développeur freelance, il m'arrive très souvent de travailler avec WordPress. Au début j'utilisais les différents builders de l'écosystème, mais aujourd'hui je m'oriente vers des thèmes personnalisés. Choix certainement discutable, mais c'est selon moi un choix bien plus cohérent que ce soit pour moi comme pour mon client.

Après avoir bataillé pendant des heures, suivis tous les tutos que j'ai pu trouvé sur internet, j'ai enfin réussi à résoudre le plus gros problème (_selon moi_) dans l'experience de développement de thèmes WordPress.

Avant de commencé, je tiens à remercier **[Stéfan Lancelot](https://github.com/stfnlnc)** qui m'a grandement aidé dans la mise de mon starter.

## Pourquoi utiliser ViteJS dans son thème WordPress ?

Vite apporte de nombreux avantages pour le développement de thèmes WordPress et me permet de gagner en efficacité lorsque je travaille sur un projet. Et pour cause, il apporte de nombreux avantages comme :

- Une rapidité et fluidité de développement
- Le Hot Module Replacement (HMR)
- Optimisation pour la production

Bref, son intérêt pourrait être le sujet d'un article complet. On va se concentrer pour le moment sur l'implémentation de ViteJS dans un thème. En regardant les différents articles et tuto que j'ai pas trouvé, j'ai cru pendant longtemps que c'était tout un chantier d'avoir dans son thème WordPress viteJS et son hot reload.

Au final (_et grâce à Stéfan_), j'ai trouvé une version vraiment très simple à implémenter. Pour les personnes voulant un starter avec uniquement **ViteJS** et **TailwindCSS** pour commencer directement, vous trouverez un repo à cloner [ici](https://github.com/pommito/wp-theme-starter).

## Installer ViteJS dans son thème WordPress

### Etape 1 : Installation des dépendances

A la racine de votre thème ( _je suppose ici que vous avez déjà un thème mis en place_ ), installez viteJS :

```bash
   npm i vite tailwindcss @tailwindcss/vite
```

Dans votre package.json, vous devriez maintenant voir ViteJS ainsi que Tailwind dans les dépendances de votre projet. Tailwind n'est pas obligatoire ici.

```json
// package.json

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

> _Dans ce fichier, les scripts dev et build sont également nécessaires pour le bon fonctionnement de Vite._

### Etape 2: Editer et configurer ViteJS

Ici pas grand chose de compliqué, on configure simplement le comportement du build de nos assets ainsi que l'ajout de tailwind à vite.

```js
// vite.config.mjs

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

Une fois, la configuration faite, on peut lancer notre projet en développement

```bash
npm run dev
```

> _Pour le moment il ne se passe pas grand chose, on est d'accord_

Maintenant, vous pouvez mettre en place un fichier `main.js` et `main.css` dans le dossier `assets` de votre projet. Notre fichier javascript va être le point d'entrée de nos assets, nous allons donc importer notre fichier `main.css` directement notre fichier `main.js`

```js
// main.js
import './main.css'

console.log('Vite is working !')
```

Pour faire fonctionner Tailwind, n'oubliez pas de l'importer dans votre fichier

```css
/* main.css */

@import 'tailwindcss';
@source "./**/*.php";
```

### Etape 3: Gérer l'ajout de nos assets dans notre projet

Maintenant que Vite et Tailwind sont ajoutés et configurés, il faut que l'on ajoute nos assets dans notre projet pour pouvoir profiter des fonctionnalités de Vite. Pour ce faire, nous allons utiliser une fonction dans notre fichier _functions.php_ qui va en fonction de l'environnement (_dev ou prod_) aller charger les bons fichiers.

```php
// functions.php

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

Cette fonction va venir faire gérer l'ajout des assets dans notre projet en fonction de l'environnement dans lequel nous sommes. Et cela via la variable `WP_DEBUG`.

Concrètement, si nous sommes en mode développement (`WP_DEBUG` est `true`), nous allons charger les fichiers depuis le serveur de développement de Vite (`http://localhost:5173`). Si nous sommes en mode production (`WP_DEBUG` est `false`), nous allons charger les fichiers compilés depuis le dossier `dist` de notre thème.

### Etape 4: Lancement de l'environnement de développement

A ce stade, voici le contenu de mon theme :

```
└── 📁theme-vite
    └── 📁assets
        └── main.css
        └── main.js
    └── functions.php
    └── index.php
    └── package-lock.json
    └── package.json
    └── style.css
    └── vite.config.mjs
```

Pour lié votre serveur vite à votre theme, veillez à bien avoir dans votre balise `<head>` le load de vos scripts. Au minimum, vous devriez avoir :

```php
// header.php

<?php

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo("charset"); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title><?php wp_title(); ?></title>
    <?php wp_head(); ?>
</head>
```

Si vous avez suivi les étapes précédentes, vous devriez désormais sur le frontend de votre site WordPress, voir votre serveur de développement de Vite (`http://localhost:5173`), ainsi que vos assets, vous pouvez désormais modifier vos fichiers et le HMR rechargera automatiquement votre page !

Voila, aujourd'hui tous mes projets WordPress se basent sur ce starter, qui est pour moi bien plus agréable à utiliser dans mon développement. Il est très certainement perfectible et peut être configuré de bien d'autres manières. Si vous utilisez également ViteJS d'une autre façon, n'hésitez pas à me faire un retour.
