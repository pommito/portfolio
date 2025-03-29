export const toggleModal = () => {
    console.log('toggleModal trigger')

    const LauncherElem = document.getElementById('search-menu')

    if (!LauncherElem) return
    const isModalOpen = LauncherElem.getAttribute('data-state') === 'open'

    if (isModalOpen) {
        console.log('Closing launcher.', isModalOpen)

        document.body.setAttribute('data-modal', 'close')
        LauncherElem.setAttribute('data-state', 'close')
    } else {
        console.log('Opening launcher.', isModalOpen)
        document.body.setAttribute('data-modal', 'open')
        LauncherElem.setAttribute('data-state', 'open')
    }
}

export const handleEscShortcut = (e: KeyboardEvent) => {
    console.log('handleEscShortcut')

    if (e.key !== 'Escape') return
    const searchMenuElem = document.getElementById('search-menu')
    if (searchMenuElem?.getAttribute('data-state') === 'open') {
        console.log('handleEscShortcut triggered')
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
