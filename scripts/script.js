//permite o js mexer nos elementos da página dinamicamente
const form = document.querySelector('form');
const selectInstituicao = document.querySelector('#instituicao');
const inputUrl = document.querySelector('.input');

//elementos de alternância de tela
const areaFormulario = document.querySelector('#area-formulario');
const areaResultado = document.querySelector('#area-resultado');
const bannerResultado = document.querySelector('#banner-resultado');
const btnVoltar = document.querySelector('#btn-voltar');

//domínios listados nesse projeto
const DOMINIOS_OFICIAIS = {
    govbr: ["gov.br"],
    bb: ["bb.com.br"],
    santander: ["santander.com.br"],
    itau: ["itau.com.br"],
    nubank: ["nubank.com.br"],
    bradesco: ["banco.bradesco"],
    caixa: ["caixa.gov.br"],
    google: ["google.com"],
    whatsapp: ["web.whatsapp.com", "whatsappbusiness.com"],
    instagram: ["instagram.com"]
};

//alterar o logo do topo conforme a instituição selecionada
selectInstituicao.addEventListener('change', () => {
    form.classList.remove('theme-govbr', 'theme-bb', 'theme-santander', 'theme-itau', 'theme-nubank', 'theme-bradesco', 'theme-caixa', 'theme-google', 'theme-whatsapp', 'theme-instagram');

    const instituicaoSelecionada = selectInstituicao.value;
    if (instituicaoSelecionada) {//quando seleciona a instituição no formulário ele altera para ela 
        form.classList.add(`theme-${instituicaoSelecionada}`);
    }
});

//exibir apenas o resultado (remove logos do topo e campos)
function mostrarResultado(tipo) {
    form.classList.add('modo-resultado'); //aciona o modo de resultado 
    areaFormulario.classList.add('oculto');//oculta o formulário para por o banner de resultado 
    areaResultado.classList.remove('oculto');//coloca a área do resultado em evidência 

    //resultados possíveis
    bannerResultado.className = '';
    if (tipo === 'confiavel') {
        bannerResultado.classList.add('img-oficial');//adiciona o banner de site oficial 
    } else if(tipo === 'suspeito'){
        bannerResultado.classList.add('img-suspeito');//adiciona o banner de site suspeito 
    } else if(tipo === 'inexistente'){
        bannerResultado.classList.add('img-inexistente');//adiciona o banner de site inexistente
    }
}

//volta para o formulário depois de verificar uma url
btnVoltar.addEventListener('click', () => { //ao clicar o botão de voltar acontece:
    form.classList.remove('modo-resultado');//remove a formatação de resultado
    areaResultado.classList.add('oculto');//some com o banner do resultado
    areaFormulario.classList.remove('oculto');//volta com a tela inicial de seleção 
    inputUrl.value = '';//limpa o campo de por a URL
    inputUrl.focus();//coloca o cursor de texto na caixa da url 
});

//Validação da URL
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const instituicao = selectInstituicao.value; //pega a instituição que o usuário selecionou
    let urlDigitada = inputUrl.value.trim().toLowerCase(); //trata inicialmente a URL digitada, retirando espaços e transmorfa as letras em maiúsculas
    const dominiosValidos = DOMINIOS_OFICIAIS[instituicao]; //consulta o domínio selecionado com o que tem na base de domínios

    if (!instituicao || !urlDigitada) {//válida se tem uma instituição selecionada ou URL digitada
        return;
    }

    if (!urlDigitada.startsWith('http://') && !urlDigitada.startsWith('https://')) {//verifica se a URL não tem o protocolo http e o https 
        urlDigitada = "https://" + urlDigitada;//concatena https:// com a URL para a verificação
    }    

    try {
        const validaUrl = new URL(urlDigitada);//internamente verifica se a URL é uma URL mesmo ou se são palavras soltas
        const hostname = validaUrl.hostname;//extrai o domínio da URL

        const existe = await checaExistenciaDominio(hostname);//checa se o domínio existe usando o dns.google
        if (!existe) {
            return; // Se retornar 3 ou der erro, checaExistenciaDominio exibe a flag de site inexistente 
        }

        let confiavel = false; //flag para verificar a confiança do site
        for (let i = 0; i < dominiosValidos.length; i++) {//percorre o array de domínios válidos
            if (hostname === dominiosValidos[i] || hostname.endsWith('.' + dominiosValidos[i])) {//Análise de Domínio Registrável(*eTLD+1 Parsing/Public Suffix List Matching) e Subdomain Boundary Verification
                confiavel = true;
                break;
            }
        }

        if (confiavel) {
            mostrarResultado('confiavel');//exibe a flag de site oficial
        } else {
            mostrarResultado('suspeito');//exibe a flag de site suspeito
        }

    } catch {
        mostrarResultado('suspeito');//se der erro retorna que o site é suspeito
    }
});

//valida se o site existe, para evitar falso-positivo
async function checaExistenciaDominio(dominio) {
        try{
            const response = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(dominio)}&type=A`);//joga o domínio no site dns.google
            const data = await response.json();//pega os dados do site que estão em .json

            if(data.Status == 3){//verifica a variável status e se retorna 3 o site não existe 
                mostrarResultado('inexistente');//exibe a flag de site inexistente 
                return false
            }
            return data.Status === 0;//url existente
        }catch (error){
            console.error("Erro ao consultar DNS:", error);
            mostrarResultado('inexistente');//exibe a flag de site inexistente 
            return false;
        }
    }
