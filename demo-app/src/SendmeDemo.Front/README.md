# SendMe Web App

## Pre-requisites

- Node.js 20+ ([nvm](https://github.com/nvm-sh/nvm) is recommended)

### Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

For TypeScript:

  ```bash
  npm run dev:ts
  ```

Currently client makes API requests to `/api`. To redirect to another endpoint:

 - Change `axios.defaults.baseURL` in [`src/services/api/index.ts`](./src/services/api/index.ts)
 - OR use `proxy` settings in dev mode, see [vite.config.ts](./vite.config.ts) `server.proxy` field

## Production Build

```bash
npm run build
```

Output contains index.html and all the assets at:

```
./dist
```
