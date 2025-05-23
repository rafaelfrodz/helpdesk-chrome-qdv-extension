import { initKeyboardShortcuts } from './content/keyboard.js';
import { initTableSelection } from './content/tableSelection.js';
import { checkPendingImpedimentos, handleDeleteImpedimentos } from './content/impedimentos.js';

function initExtension() {
    initTableSelection();
    initKeyboardShortcuts(handleDeleteImpedimentos);
    checkPendingImpedimentos();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExtension);
} else {
    initExtension();
}

new MutationObserver(() => {
    initExtension();
}).observe(document.body, {
    childList: true,
    subtree: true
});