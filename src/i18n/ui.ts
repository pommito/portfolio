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
    },
    fr: {
        'nav.home': 'Accueil',
        'nav.about': 'À propos',
    },
} as const
