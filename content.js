import { configurarAtalhosDeTeclado } from './content/teclas.js';
import { obterLinhasSelecionadas } from './content/selecaoTabela.js';
import { verificarImpedimentosPendentes, removerImpedimentosSelecionados } from './content/impedimentos.js';

function initExtension() {
    obterLinhasSelecionadas();
    configurarAtalhosDeTeclado(removerImpedimentosSelecionados);
    verificarImpedimentosPendentes();
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