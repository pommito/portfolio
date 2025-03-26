export function handleKeyboardShortcut(e: KeyboardEvent) {
    switch (e.key) {
        case 'i':
            window.location.href = '/about'
            break
        case 'b':
            window.location.href = '/blog'
            break
    }
}
