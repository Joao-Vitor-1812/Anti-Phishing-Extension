# Extensão Anti Phishing 

Validador de URLs e detector de phishing focado em engenharia reversa de domínios para autenticação de canais institucionais, bancários e redes sociais.

---

## Visão Geral

A maioria dos ataques de phishing modernos utilizam técnicas de engenharia social associadas a domínios registrados com pequenas variações visuais (typosquatting), parâmetros de rastreamento forjados ou serviços de hospedagem genéricos (.com, .online) simulando portais governamentais, entidades bancárias ou multinacionais.

Esta extensão para navegadores Chromium (Chrome, Brave, Edge), atua na camada do cliente para decompor FQDNs (Fully Qualified Domain Names), isolar a zona pública (eTLD+1) e validar se o endereço pertence rigorosamente aos canais oficiais da entidade selecionada antes que o usuário insira credenciais ou dados sensíveis.

---

## Funcionalidades

- Decomposição Segura de URLs: Tratamento de entradas via WHATWG URL API, evitando bypasses baseados em regex ingênua.
- Validação de eTLD+1: Reconhecimento correto de sufixos de segundo nível (como .gov.br e .com.br) para evitar falsos negativos com subdomínios fraudulentos.
- Allowlist Institucional Baseada em Evidências: Cobertura de entidades de alto risco e canais críticos frequentemente visados em campanhas de engenharia social no Brasil, abrangendo:
  - Órgãos Governamentais: Governo Federal (Gov.br) e Caixa Econômica Federal.
  - Setor Bancário & Fintechs: Banco do Brasil, Bradesco, Itaú, Santander e Nubank.
  - Big Techs & Mensageria: Google, WhatsApp e Instagram.
     > *A justificativa que fundamentam a seleção de cada uma dessas entidades estão detalhados em [Metodologia e Fontes de Seleção](./FONTES.md).*
- Sem Permissões Invasivas: Construída seguindo o padrão Manifest V3, sem captura de histórico nem monitoramento contínuo de tráfego.
- Verificação de Existência via DoH (DNS-over-HTTPS): Consulta em tempo real à API do Google DNS para detectar domínios inexistentes ou não registrados (NXDOMAIN), prevenindo falsos positivos com links forjados.

---

## Instalação 

1. Clone este repositório:
   
```sh
git clone https://github.com/Joao-Vitor-1812/Anti-Phishing-Extension
cd Anti-Phishing-Extension
```

2. Abra o gerenciador de extensões no seu navegador, sendo ele baseado em Chromium:
   
- Google Chrome: chrome://extensions
- Brave Browser: brave://extensions
- Microsoft Edge: edge://extensions

3. Ative a chave Modo do Desenvolvedor (canto superior direito).

4. Clique no botão Carregar sem compactação (ou Load unpacked).

5. Selecione o diretório raiz do projeto clonado.

---

## Como Usar

1. Copie a URL suspeita.
2. Abra o popup da extensão no navegador.
3. Selecione a instituição que o link diz representar (ex: Gov.br, Banco do Brasil).
4. Cole o link no campo de análise e confirme.
5. A extensão retornará a classificação imediata com feedback visual:
   - Site Oficial: Domínio ativo e pertencente à entidade oficial.
   - Site Suspeito: Domínio ativo, mas não autorizado/fora do padrão oficial.
   - Site Inexistente: Domínio não registrado ou inativo no DNS público.

---

## Licença

MIT.

---

[Switch to English version (README.en.md)](./README.en.md)
