// @ts-check
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

import sitemap from '@astrojs/sitemap'

export default defineConfig({
    site: 'https://victorlebecq.fr',

    vite: {
        plugins: [tailwindcss()],
    },

    i18n: {
        locales: ['fr', 'en'],
        defaultLocale: 'fr',
        routing: {
            prefixDefaultLocale: false,
        },
    },

    integrations: [
        sitemap({
            i18n: {
                locales: {
                    fr: 'fr-FR',
                    en: 'en-US',
                },
                defaultLocale: 'fr',
            },
        }),
    ],
})
