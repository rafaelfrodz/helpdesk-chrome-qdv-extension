import { configurarAtalhosDeTeclado } from './teclas.js';

export function verificarImpedimentosPendentes() {
    const pendentes = JSON.parse(localStorage.getItem('impedimentosPendentes') || '[]');
    if (pendentes.length > 0) {
        setTimeout(processarProximoImpedimento, 1000);
    }
}

export function removerImpedimentosSelecionados() {
    const linhasParaProcessar = configurarAtalhosDeTeclado();
    if (linhasParaProcessar.length === 0) return;
    const linhasDocumentos = Array.from(linhasParaProcessar).filter(linha => linha.cells[1]);
    if (linhasDocumentos.length === 0) return;
    if (confirm(`Deseja remover ${linhasDocumentos.length} impedimento(s) desta Ordem de Servico?`)) {
        const impedimentosParaRemover = linhasDocumentos.map(linha => {
            const linkRemover = linha.querySelector('a[onclick*="RemoverImpedimento"]');
            const match = linkRemover?.getAttribute('onclick').match(/RemoverImpedimento\((\d+)/);
            return match ? match[1] : null;
        }).filter(id => id !== null);
        localStorage.setItem('impedimentosPendentes', JSON.stringify(impedimentosParaRemover));
        processarProximoImpedimento();
    }
}

export function processarProximoImpedimento() {
    const pendentes = JSON.parse(localStorage.getItem('impedimentosPendentes') || '[]');
    if (pendentes.length === 0) return;
    const proximoId = pendentes[0];
    const linkRemover = document.querySelector(`a[onclick*="RemoverImpedimento(${proximoId})"]`);
    if (linkRemover) {
        linkRemover.click();
        const observadorModal = new MutationObserver((mutacoes, obs) => {
            const modal = document.querySelector('.bootbox.modal.in');
            if (modal && modal.textContent.includes('Tem certeza que deseja remover este impedimento?')) {
                const botaoConfirmar = modal.querySelector('[data-bb-handler="confirm"]');
                if (botaoConfirmar) {
                    obs.disconnect();
                    const pendentesAtualizados = JSON.parse(localStorage.getItem('impedimentosPendentes') || '[]').filter(id => id !== proximoId);
                    localStorage.setItem('impedimentosPendentes', JSON.stringify(pendentesAtualizados));
                    botaoConfirmar.click();
                    if (pendentesAtualizados.length > 0) {
                        setTimeout(() => {
                            if (document.readyState === 'complete') {
                                processarProximoImpedimento();
                            } else {
                                window.addEventListener('load', processarProximoImpedimento);
                            }
                        }, 1000);
                    }
                }
            }
        });
        observadorModal.observe(document.body, { childList: true, subtree: true });
        setTimeout(() => observadorModal.disconnect(), 5000);
    } else {
        const pendentesAtualizados = pendentes.filter(id => id !== proximoId);
        localStorage.setItem('impedimentosPendentes', JSON.stringify(pendentesAtualizados));
        if (pendentesAtualizados.length > 0) {
            setTimeout(processarProximoImpedimento, 500);
        }
    }
}