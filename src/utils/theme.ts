export function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme')
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    document.body.setAttribute('data-theme', newTheme)
}

export const checkSavedTheme = () => {
    if (!localStorage) return
    const savedTheme = localStorage.getItem('theme')
    if (!savedTheme) {
        console.log('No theme saved')
        return
    }

    document.body.setAttribute('data-theme', savedTheme)
    console.log(`theme saved : ${savedTheme}`)
}

export const saveThemeChoice = () => {
    if (!localStorage) return
    const currentTheme = document.body.getAttribute('data-theme')
    if (!currentTheme) {
        console.log('Error: no theme on the body')
        return
    }

    localStorage.setItem('theme', currentTheme)
    console.log(`theme saved : ${currentTheme}`)
}
