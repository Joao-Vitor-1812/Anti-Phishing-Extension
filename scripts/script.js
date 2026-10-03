// 1. Mapeamento dos elementos do DOM
const form = document.querySelector('form');
const selectInstituicao = document.querySelector('#instituicao');
const inputUrl = document.querySelector('.input');
const divResultado = document.querySelector('#resultado');

// 2. Evento para alterar o fundo conforme a instituição selecionada
selectInstituicao.addEventListener('change', () => {
    // Remove temas anteriores para não misturar fundos
    form.classList.remove('theme-govbr', 'theme-bb');

    const instituicaoSelecionada = selectInstituicao.value;

    if (instituicaoSelecionada === 'govbr') {
        form.classList.add('theme-govbr');
    } else if (instituicaoSelecionada === 'bb') {
        form.classList.add('theme-bb');
    }
});

// 3. Evento de envio para validar o link (vamos programar a regra a seguir)
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const instituicao = selectInstituicao.value;
    const urlDigitada = inputUrl.value.trim();

    // Verificação simples se o usuário preencheu ambos os campos
    if (!instituicao || !urlDigitada) {
        alert('Por favor, selecione uma instituição e insira um link.');
        return;
    }

    console.log('Dados prontos para análise:', { instituicao, urlDigitada });
});