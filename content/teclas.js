export function configurarAtalhosDeTeclado(acaoDeletar) {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Delete') {
            e.preventDefault();
            e.stopPropagation();
            acaoDeletar();
        }
    }, true);
}