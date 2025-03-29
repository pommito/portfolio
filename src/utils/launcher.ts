export const toggleModal = () => {
    const LauncherElem = document.getElementById('search-menu')

    if (!LauncherElem) return
    const isModalOpen = LauncherElem.getAttribute('data-state') === 'open'

    if (!isModalOpen) {
        console.log('toggle modal')
        LauncherElem.setAttribute('data-state', 'open')
        document.body.setAttribute('data-modal', 'open')
        window.addEventListener('keydown', handleEscShortcut)
        return
    }
    LauncherElem.setAttribute('data-state', 'close')
    document.body.setAttribute('data-modal', 'close')
    window.removeEventListener('keydown', handleEscShortcut)
}

export const handleEscShortcut = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
        const searchMenuElem = document.getElementById('search-menu')
        if (
            searchMenuElem &&
            searchMenuElem.getAttribute('data-state') === 'close'
        )
            return
        toggleModal()
    }
}

export const replicateClick = (e: KeyboardEvent) => {
    const focusedItem = document.activeElement
    if (!focusedItem || focusedItem.getAttribute('role') !== 'menuitem') return

    const anchor = focusedItem.querySelector('a')
    if (!anchor) {
        const button = focusedItem.querySelector('button')
        e.preventDefault()
        button?.click()
    }
    e.preventDefault()
    anchor?.click()
}
