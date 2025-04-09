import blogFr from './fr/blog.json'
import blogEn from './en/blog.json'
import notFoundFr from './fr/404.json'
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
        'nav.home': 'Home',
        'nav.about': 'About',
        blog: blogEn,
        '404': notFoundEn,
    },
    fr: {
        'nav.home': 'Accueil',
        'nav.about': 'À propos',
        blog: blogFr,
        '404': notFoundFr,
    },
} as const
