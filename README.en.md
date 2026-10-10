# Anti Phishing Extension

URL validator and phishing detector focused on domain reverse engineering to authenticate institutional, banking, and social media channels.

---

## Overview

Modern phishing attacks routinely rely on social engineering combined with domain typosquatting, spoofed tracking parameters, or cheap generic top-level domains (.com, .online) impersonating government portals, banking entities, or multinational corporations.

This extension for Chromium-based browsers (Chrome, Brave, Edge) operates on the client side to parse FQDNs (Fully Qualified Domain Names), isolate the public zone (eTLD+1), and verify whether the address strictly belongs to the official channels of the selected entity before the user enters credentials or sensitive data.

---

## Features

- Secure URL Parsing: Input handling powered by the WHATWG URL API, preventing bypasses common to naive regular expressions.
- eTLD+1 Validation: Proper identification of second-level suffixes (such as .gov.br and .com.br) to eliminate false negatives caused by fraudulent subdomains.
- Evidence-Based Institutional Allowlist: Coverage of high-risk entities and critical channels frequently targeted by social engineering campaigns in Brazil, including:
  - Government Agencies: Federal Government (Gov.br) and Caixa Econômica Federal.
  - Banking & Fintechs: Banco do Brasil, Bradesco, Itaú, Santander, and Nubank.
  - Big Tech & Messaging Platforms: Google, WhatsApp, and Instagram.
- Zero Invasive Permissions: Built following the Manifest V3 standard, without history logging or continuous traffic monitoring.
- Domain Existence Check via DoH (DNS-over-HTTPS): Real-time query against the Google DNS API to detect non-existent or unregistered domains (NXDOMAIN), preventing false positives from fabricated links.

---

## Installation

1. Clone this repository:

```sh
git clone https://github.com/Joao-Vitor-1812/Anti-Phishing-Extension
cd Anti-Phishing-Extension
```

2. Open the extensions manager in your Chromium-based browser:

- Google Chrome: chrome://extensions
- Brave Browser: brave://extensions
- Microsoft Edge: edge://extensions

3. Toggle the Developer mode switch (top-right corner).

4. Click Load unpacked.

5. Select the root folder of the cloned repository.

---

## Usage

1. Copy the suspicious URL.
2. Open the extension popup in your browser.
3. Select the institution claiming ownership of the link (e.g., Gov.br, Banco do Brasil).
4. Paste the link into the analysis field and submit.
5. The extension will return an immediate classification with visual feedback:
    - Official Website: Active domain that belongs to the official entity.
    - Suspicious Website: Active domain that is unauthorized or does not match the official pattern.
    - Non-Existent Website: Domain that is unregistered or inactive in public DNS.

---

## License

MIT.
