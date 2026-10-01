# PhishGuard Browser Extension

URL validator and phishing detector focused on domain reverse engineering to authenticate institutional and banking endpoints.

---

## Overview

Modern phishing attacks routinely rely on social engineering combined with domain typosquatting, spoofed tracking parameters, or cheap generic top-level domains (.com, .online) designed to impersonate government services or financial institutions.

This Chromium-based browser extension (Chrome, Brave, Edge) operates on the client side to parse FQDNs (Fully Qualified Domain Names), isolate the public zone (eTLD+1), and strictly verify whether the target address belongs to official infrastructure before the user submits credentials or sensitive personal information.

---

## Features

- Robust URL Parsing: Relies on the WHATWG URL API to prevent common bypass techniques that affect naive regex matching.
- eTLD+1 Validation: Native handling of multi-part public suffixes (such as .gov.br and .com.br) to prevent deceptive subdomains from evading detection.
- Curated Allowlist: Local knowledge base mapping verified domains for critical public entities and banks.
- Minimal Permissions: Compliant with the modern Manifest V3 specification without requiring browser history access or continuous network interception.

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

1.Copy the suspicious URL.
2.Open the extension popup in your browser.
3.Select the institution claiming ownership of the link (e.g., Gov.br, Banco do Brasil).
4.Paste the link into the analysis field and submit.
5.The extension evaluates the FQDN hierarchy and outputs an immediate classification: verified official domain or fraudulent attempt.

---

## License

MIT.
