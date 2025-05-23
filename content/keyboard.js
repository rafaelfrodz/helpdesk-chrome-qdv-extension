export function initKeyboardShortcuts(onDelete) {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Delete') {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
        }
    }, true);
}