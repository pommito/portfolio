---
title: How to add ViteJS to your WordPress theme
publishingDate: 2025-05-01
tags: ['WordPress', 'ViteJS', 'TailwindCSS']
published: true
href: vitejs-theme-wordpress
---

In my freelance developer activity, I often work with WordPress. Initially, I used various builders from the ecosystem, but today I am moving towards custom themes. This choice is certainly debatable, but in my opinion, it is a much more coherent choice for both me and my clients.

After struggling for hours and following all the tutorials I could find on the internet, I finally managed to solve the biggest problem (*in my opinion*) in the WordPress theme development experience.

Before we begin, I would like to thank **[Stéfan Lancelot](https://github.com/stfnlnc)** who greatly helped me set up my starter.

## Why Use ViteJS in Your WordPress Theme?

Vite brings numerous advantages to WordPress theme development and allows me to gain efficiency when working on a project. It offers many benefits such as:

- Development speed and fluidity
- Hot Module Replacement (HMR)
- Production optimization

In short, its interest could be the subject of a complete article. For now, let's focus on implementing ViteJS in a theme. After looking at various articles and tutorials, I long believed that integrating ViteJS and its hot reload into a WordPress theme would be a complex task.

In the end (*thanks to Stéfan*), I found a very simple version to implement. For those who want a starter with only **ViteJS** and **TailwindCSS** to get started directly, you can find a repository to clone [here](https://github.com/pommito/wp-theme-starter).

## Installing ViteJS in Your WordPress Theme

### Step 1: Installing Dependencies

At the root of your theme ( *assuming you already have a theme set up* ), install ViteJS:

```bash
   npm i vite tailwindcss @tailwindcss/vite
```

In your package.json, you should now see ViteJS and Tailwind in your project's dependencies. Tailwind is not mandatory here.

```json
// package.json

{
  "name": "tuto-vite",
  "version": "1.0.0",
  "description": "ViteJS in WordPress theme",
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

>*In this file, the dev and build scripts are also necessary for Vite to function properly.*

### Step 2: Editing and Configuring ViteJS

Here, nothing is too complicated; we simply configure the behavior of our asset build and add Tailwind to Vite.

```js
// vite.config.mjs

import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: '',
    emptyOutDir: true,
    manifest: true,
  },
  plugins: [tailwindcss()],
});
```

Once the configuration is done, we can launch our development project:

```bash
npm run dev
```

>*For now, nothing much happens, we agree*

Now, you can set up a `main.js` and `main.css` file in the `assets` folder of your project. Our JavaScript file will be the entry point for our assets, so we will import our `main.css` file directly into our `main.js` file.

```js
// main.js
import './main.css';

console.log('Vite is working!');
```

To use Tailwind, remember to import it into your file:

```css
/* main.css */

@import 'tailwindcss';
@source "./**/*.php";
```

### Step 3: Managing Assets in Your Project

Now that Vite and Tailwind are added and configured, we need to add our assets to the project to take advantage of Vite's features. To do this, we will use a function in our *functions.php* file that will load the correct files depending on the environment (*dev or prod*).

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

This function will manage the addition of assets to our project depending on the environment we are in, via the `WP_DEBUG` variable.

Specifically, if we are in development mode (`WP_DEBUG` is `true`), we will load the files from the Vite development server (`http://localhost:5173`). If we are in production mode (`WP_DEBUG` is `false`), we will load the compiled files from the `dist` folder of our theme.

### Step 4: Launching the Development Environment

At this stage, here is the content of my theme:

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

To link your Vite server to your theme, make sure you have the script load in your `<head>` tag. At a minimum, you should have:

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

If you have followed the previous steps, you should now see your Vite development server (`http://localhost:5173`) on the frontend of your WordPress site, along with your assets. You can now modify your files, and HMR will automatically reload your page!

That's it! Today, all my WordPress projects are based on this starter, which is much more enjoyable to use in my development. It is certainly perfectible and can be configured in many other ways. If you also use ViteJS in another way, do not hesitate to give me feedback.
