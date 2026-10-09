// 1. Mapeamento dos elementos do DOM
const form = document.querySelector('form');
const selectInstituicao = document.querySelector('#instituicao');
const inputUrl = document.querySelector('.input');

// Elementos de alternância de tela
const areaFormulario = document.querySelector('#area-formulario');
const areaResultado = document.querySelector('#area-resultado');
const bannerResultado = document.querySelector('#banner-resultado');
const btnVoltar = document.querySelector('#btn-voltar');

const DOMINIOS_OFICIAIS = {
    govbr: ["gov.br"],
    bb: ["bb.com.br"],
    santander: ["santander.com.br"],
    itau: ["itau.com.br"],
    nubank: ["nubank.com.br"],
};

// 2. Evento para alterar o logo do topo conforme a instituição selecionada
selectInstituicao.addEventListener('change', () => {
    form.classList.remove('theme-govbr', 'theme-bb', 'theme-santander', 'theme-itau', 'theme-nubank');

    const instituicaoSelecionada = selectInstituicao.value;
    if (instituicaoSelecionada) {
        form.classList.add(`theme-${instituicaoSelecionada}`);
    }
});

// 3. Função para exibir apenas o resultado (remove logos do topo e campos)
function mostrarResultado(tipo) {
    form.classList.add('modo-resultado'); // Desativa imagem de logo e padding do topo
    areaFormulario.classList.add('oculto');
    areaResultado.classList.remove('oculto');

    bannerResultado.className = '';
    if (tipo === 'confiavel') {
        bannerResultado.classList.add('img-oficial');
    } else if(tipo === 'suspeito'){
        bannerResultado.classList.add('img-suspeito');
    } else if(tipo === 'inexistente'){
        bannerResultado.classList.add('img-inexistente');
    }
}

// 4. Voltar para o formulário
btnVoltar.addEventListener('click', () => {
    form.classList.remove('modo-resultado'); // Reativa o layout padrão e o logo do banco
    areaResultado.classList.add('oculto');
    areaFormulario.classList.remove('oculto');
    inputUrl.value = '';
    inputUrl.focus();
});

// 5. Evento de envio para validar o link
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const instituicao = selectInstituicao.value;
    let urlDigitada = inputUrl.value.trim().toLowerCase();
    const dominiosValidos = DOMINIOS_OFICIAIS[instituicao];

    if (!instituicao || !urlDigitada) {
        alert('Por favor, selecione uma instituição e digite um link.');
        return;
    }

    if (!urlDigitada.startsWith('http://') && !urlDigitada.startsWith('https://')) {
        urlDigitada = "https://" + urlDigitada;
    }    

    try {
        const validaUrl = new URL(urlDigitada);
        const hostname = validaUrl.hostname;

        const existe = await checaExistenciaDominio(hostname);
        if (!existe) {
            return; // Se retornar 3 (NXDOMAIN) ou der erro, checaExistenciaDominio já exibiu a tela
        }
        let confiavel = false;
        for (let i = 0; i < dominiosValidos.length; i++) {
            if (hostname === dominiosValidos[i] || hostname.endsWith('.' + dominiosValidos[i])) {
                confiavel = true;
                break;
            }
        }

        if (confiavel) {
            mostrarResultado('confiavel');
        } else {
            mostrarResultado('suspeito');
        }

    } catch {
        mostrarResultado('suspeito');
    }
});

//valida se o site existe, para não dar falso-positivo
async function checaExistenciaDominio(dominio) {
        try{
            const response = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(dominio)}&type=A`);
            const data = await response.json();

            if(data.Status == 3){//se retornar 3 é pq o site não existe 
                mostrarResultado('inexistente');
                return false
            }
            return data.Status === 0;//url existente
        }catch{
            console.error("Erro ao consultar DNS:", error);
            mostrarResultado('inexistente');
            return false;
        }
    }
