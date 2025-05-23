export function inicializarSelecaoTabela() {
    document.querySelectorAll('.table tbody tr').forEach(linha => {
        const celulaTipo = linha.cells[1];
        const iconeStatus = linha.cells[0]?.querySelector('.icon-check-empty');
        if (celulaTipo && iconeStatus) {
            linha.setAttribute('tabindex', '0');
            linha.style.cursor = 'pointer';
            linha.addEventListener('click', function(e) {
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    this.classList.toggle('linha-selecionada');
                    this.style.backgroundColor = this.classList.contains('linha-selecionada') ? '#13f706' : '';
                } else {
                    document.querySelectorAll('.table tr.linha-selecionada').forEach(l => {
                        l.classList.remove('linha-selecionada');
                        l.style.backgroundColor = '';
                    });
                    this.classList.add('linha-selecionada');
                    this.style.backgroundColor = '#13f706';
                }
            });
            linha.addEventListener('focus', function() {
                if (!this.classList.contains('linha-selecionada')) {
                    this.style.backgroundColor = '#f0f0f0';
                }
            });
            linha.addEventListener('blur', function() {
                if (!this.classList.contains('linha-selecionada')) {
                    this.style.backgroundColor = '';
                }
            });
        }
    });
}

export function obterLinhasSelecionadas() {
    const linhasSelecionadas = document.querySelectorAll('tr.linha-selecionada');
    return linhasSelecionadas.length > 0 ? linhasSelecionadas : (document.activeElement.tagName === 'TR' ? [document.activeElement] : []);
}