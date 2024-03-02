import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

const packageJson = require('./package.json');

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    define: {
        __APP_VERSION__: JSON.stringify(`[${packageJson.name}] v${packageJson.version}`),
    },
})
