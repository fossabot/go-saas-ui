# go-saas-ui

Go SaaS Framework - TypeScript & Vue.js Implementation

[![Build Status](https://ci.loeffel.io/api/badges/go-saas/go-saas-ui/status.svg)](https://ci.loeffel.io/go-saas/go-saas-ui)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fgo-saas%2Fgo-saas-ui.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fgo-saas%2Fgo-saas-ui?ref=badge_shield)
<a href="https://www.npmjs.com/package/@go-saas/go-saas-ui"><img src="https://img.shields.io/npm/v/@go-saas/go-saas-ui.svg?sanitize=true" alt="Version"></a>

- Based on TypeScript, Vue.js & Bootstrap 4
- Super clean and small
- Fully customizable and configurable
- State of the art Authentication with JWT HttpOnly Cookies
- User management
- Team management
- Token management for users and teams
- Subscriptions and Per-Seat Payments out of the box (coming soon)

## Preview

<img src="https://raw.githubusercontent.com/go-saas/go-saas-ui/master/preview.png" alt="logo">

## Backend

- Go: [https://github.com/go-saas/go-saas](https://github.com/go-saas/go-saas)

## Demo

- Go + TypeScript & Vue.js: [https://github.com/go-saas/go-saas-demo](https://github.com/go-saas/go-saas-demo)

## Usage

main.ts

```javascript
import Saas from '@go-saas/go-saas-ui/src/saas';

// packages
import Config from "@go-saas/go-saas-ui/src/packages/config/basic/config";
import Router from "@go-saas/go-saas-ui/src/packages/router/basic/router";
import Axios from "@go-saas/go-saas-ui/src/packages/http/axios/axios";
import I18n from "@go-saas/go-saas-ui/src/packages/i18n/basic/i18n";
import LocalStorage from "@go-saas/go-saas-ui/src/packages/storage/local-storage/local-storage";
import Event from "@go-saas/go-saas-ui/src/packages/event/basic/event";
import Security from "@go-saas/go-saas-ui/src/packages/security/basic/security";

// scss
import './scss/app.scss'

// config
import configuration from './../../go-saas.json'

const config = new Config(configuration);
const router = new Router();
const http = new Axios({baseURL: config.getConfiguration().getHost()});
const i18n = new I18n(config.getConfiguration().getLocale());
const storage = new LocalStorage();
const event = new Event(config.getConfiguration().getHost());
const security = new Security(router, http, event, storage);

new Saas(config, router, http, i18n, event, security)
    .init()
    .then(saas => saas.run());
```

## Config

go-saas.json

```json
{
  "name": "Go SaaS",
  "logo": null,
  "locale": "en",
  "host": "http://localhost:3000",
  "tokens": true,
  "teams": {
    "tokens": false
  },
  "navigation": {
    "left": {
      "en": [
        {"label": "Dashboard","to": "dashboard"}
      ]
    },
    "right": {
      "en": [
        {"label": "Login","to": "login"}
      ]
    }
  }
}
```


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fgo-saas%2Fgo-saas-ui.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fgo-saas%2Fgo-saas-ui?ref=badge_large)