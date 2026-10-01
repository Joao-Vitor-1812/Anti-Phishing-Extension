# PhishGuard Browser Extension

Validador de URLs e detector de phishing focado em engenharia reversa de domínios para autenticação de canais institucionais e bancários (a princípio).

---

## Visão Geral

A maioria dos ataques de phishing modernos utiliza técnicas de engenharia social associadas a domínios registrados com pequenas variações visuais (typosquatting), parâmetros de rastreamento forjados ou serviços de hospedagem genéricos (.com, .online) simulando portais governamentais ou entidades bancárias.

Esta extensão para navegadores Chromium (Chrome, Brave, Edge) atua na camada do cliente para decompor FQDNs (Fully Qualified Domain Names), isolar a zona pública (eTLD+1) e validar se o endereço pertence rigorosamente aos canais oficiais da entidade selecionada antes que o usuário insira credenciais ou dados sensíveis.

---

## Funcionalidades

- **Decomposição Segura de URLs:** Tratamento de entradas via WHATWG URL API, evitando bypasses baseados em regex ingênua.
- **Validação de eTLD+1:** Reconhecimento correto de sufixos de segundo nível (como `.gov.br` e `.com.br`) para evitar falsos negativos com subdomínios fraudulentos.
- **Allowlist Institucional:** Base local de entidades críticas (Governo Federal, instituições bancárias e financeiras).
- **Sem Permissões Invasivas:** Construída seguindo o padrão Manifest V3, sem captura de histórico nem monitoramento contínuo de tráfego.

---

## Arquitetura do Projeto

```text
├── manifest.json       # Configuração da extensão (Manifest V3)
├── popup.html          # Interface de usuário da extensão
├── popup.js            # Orquestrador de eventos e manipulação de DOM
├── engine/
│   ├── validator.js    # Lógica de decomposição e checagem de domínios
│   └── domains.json    # Base estática de domínios oficiais
├── assets/             # Ícones e elementos visuais
├── README.md           # Documentação em Português
└── README.en.md        # English Documentation
