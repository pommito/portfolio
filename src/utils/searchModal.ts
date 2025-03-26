export const handleModalTrigger = (modalElem: HTMLElement) => {
    const isModalOpen = modalElem.getAttribute('data-state') === 'open'
    const inputElem = modalElem.querySelector('input') as HTMLInputElement

    if (isModalOpen) {
        modalElem.setAttribute('data-state', 'close')
        document.body.setAttribute('data-modal', 'close')
        inputElem.value = ''
        window.removeEventListener('keydown', handleEscShortcut)
    } else {
        modalElem.setAttribute('data-state', 'open')
        document.body.setAttribute('data-modal', 'open')
        inputElem.focus()
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
            handleModalTrigger(searchMenuElem)
        }
    }
}
