export const languages = {
    fr: 'Français',
    en: 'English',
}

export const defaultLang = 'fr'
export const showDefaultLang = false

export const routes = {
    fr: {
        home: '/',
        about: '/a-propos/',
        blog: '/blog/',
    },
    en: {
        home: '/',
        about: '/about/',
        blog: '/blog/',
    },
}

export const ui = {
    en: {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.twitter': 'Twitter',
    },
    fr: {
        'nav.home': 'Accueil',
        'nav.about': 'À propos',
    },
} as const
