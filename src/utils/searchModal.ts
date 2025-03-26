export const handleModalTrigger = (modalElem: HTMLElement) => {
    const isModalOpen = modalElem.getAttribute('data-state') === 'open'
    const InputElem = modalElem.querySelector('input') as HTMLInputElement

    modalElem.setAttribute(
        'data-state',
        isModalOpen === true ? 'close' : 'open'
    )
    document.body.classList.toggle('!overflow-hidden')

    isModalOpen === true ? (InputElem.value = '') : InputElem.focus()
}
