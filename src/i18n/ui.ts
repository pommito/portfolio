import commonFr from './fr/common.json'
import homeFr from './fr/home.json'
import aboutFr from './fr/about.json'
import blogFr from './fr/blog.json'
import notFoundFr from './fr/404.json'

import commonEn from './en/common.json'
import homeEn from './en/home.json'
import aboutEn from './en/about.json'
import blogEn from './en/blog.json'
import notFoundEn from './En/404.json'

export const languages = {
    fr: 'Français',
    en: 'English',
}
export const defaultLang = 'fr'
export const showDefaultLang = false

export const routes = {
    fr: {
        Accueil: '/',
        'a-propos': 'a-propos',
        blog: 'blog',
        'hello-world': 'blog/hello-world',
    },
    en: {
        Accueil: '/',
        'a-propos': 'about',
        blog: 'blog',
        'blog/hello-world': 'hello-world',
    },
}

export const ui = {
    en: {
        common: commonEn,
        home: homeEn,
        about: aboutEn,
        blog: blogEn,
        '404': notFoundEn,
    },
    fr: {
        common: commonFr,
        home: homeFr,
        about: aboutFr,
        blog: blogFr,
        '404': notFoundFr,
    },
} as const
