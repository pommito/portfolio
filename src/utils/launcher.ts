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
