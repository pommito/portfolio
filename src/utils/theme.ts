export const toggleTheme = () => {
    const currentTheme = document.body.getAttribute('data-theme')
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    document.body.setAttribute('data-theme', newTheme)
    saveThemeChoice()
}

export const checkSavedTheme = () => {
    if (!localStorage) return
    const savedTheme = localStorage.getItem('theme')
    if (!savedTheme) return
    document.body.setAttribute('data-theme', savedTheme)
}

export const saveThemeChoice = () => {
    if (!localStorage) return
    const currentTheme = document.body.getAttribute('data-theme')
    if (!currentTheme) return

    localStorage.setItem('theme', currentTheme)
}
