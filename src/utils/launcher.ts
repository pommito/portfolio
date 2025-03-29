export const toggleModal = (modalElem: HTMLElement) => {
    const isModalOpen = modalElem.getAttribute('data-state') === 'open'

    if (isModalOpen) {
        modalElem.setAttribute('data-state', 'close')
        document.body.setAttribute('data-modal', 'close')
        window.removeEventListener('keydown', handleEscShortcut)
    } else {
        modalElem.setAttribute('data-state', 'open')
        document.body.setAttribute('data-modal', 'open')
        window.addEventListener('keydown', handleEscShortcut)
    }
}

export const handleEscShortcut = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
        const searchMenuElem = document.getElementById('search-menu')
        if (
            searchMenuElem &&
            searchMenuElem.getAttribute('data-state') === 'open'
        ) {
            toggleModal(searchMenuElem)
        }
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
