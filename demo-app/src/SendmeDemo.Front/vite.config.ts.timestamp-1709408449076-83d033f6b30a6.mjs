var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// package.json
var require_package = __commonJS({
  "package.json"(exports, module) {
    module.exports = {
      name: "sendme-demo-front",
      private: true,
      version: "0.0.1",
      type: "module",
      scripts: {
        dev: "vite",
        "dev:ts": "tsc -w",
        build: "tsc && vite build",
        lint: "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
        preview: "vite preview"
      },
      dependencies: {
        "@radix-ui/react-slot": "^1.0.2",
        "@tanstack/react-table": "^8.13.2",
        "@zajno/common": "^2.3.0",
        "@zajno/common-mobx": "^1.2.7",
        axios: "^1.6.7",
        "class-variance-authority": "^0.7.0",
        clsx: "^2.1.0",
        "lucide-react": "^0.344.0",
        mobx: "^6.12.0",
        "mobx-react-lite": "^4.0.5",
        react: "^18.2.0",
        "react-dom": "^18.2.0",
        "tailwind-merge": "^2.2.1",
        "tailwind-variants": "^0.2.0",
        "tailwindcss-animate": "^1.0.7",
        wouter: "^3.0.1",
        yup: "^1.3.3"
      },
      devDependencies: {
        "@types/node": "^20.11.24",
        "@types/react": "^18.2.61",
        "@types/react-dom": "^18.2.19",
        "@typescript-eslint/eslint-plugin": "^7.1.0",
        "@typescript-eslint/parser": "^7.1.0",
        "@vitejs/plugin-react-swc": "^3.6.0",
        "@zajno/eslint-config": "^3.0.1",
        autoprefixer: "^10.4.18",
        eslint: "^8.57.0",
        "eslint-plugin-react-hooks": "^4.6.0",
        "eslint-plugin-react-refresh": "^0.4.5",
        postcss: "^8.4.35",
        tailwindcss: "^3.4.1",
        typescript: "^5.3.3",
        vite: "^5.1.4"
      }
    };
  }
});

// vite.config.ts
import { defineConfig } from "file:///Users/idudinov/projects/spike/demo-app/src/SendmeDemo.Front/node_modules/vite/dist/node/index.js";
import react from "file:///Users/idudinov/projects/spike/demo-app/src/SendmeDemo.Front/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "/Users/idudinov/projects/spike/demo-app/src/SendmeDemo.Front";
var packageJson = require_package();
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  define: {
    __APP_VERSION__: JSON.stringify(`[${packageJson.name}] v${packageJson.version}`)
  },
  server: {
    proxy: {
      // I hate you Shkapo
      "/api": {
        target: "http://0.0.0.0:5276",
        changeOrigin: true,
        rewrite: (path2) => {
          console.log(path2);
          return path2.replace(/^\/api/, "");
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFja2FnZS5qc29uIiwgInZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJ7XG4gIFwibmFtZVwiOiBcInNlbmRtZS1kZW1vLWZyb250XCIsXG4gIFwicHJpdmF0ZVwiOiB0cnVlLFxuICBcInZlcnNpb25cIjogXCIwLjAuMVwiLFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcInZpdGVcIixcbiAgICBcImRldjp0c1wiOiBcInRzYyAtd1wiLFxuICAgIFwiYnVpbGRcIjogXCJ0c2MgJiYgdml0ZSBidWlsZFwiLFxuICAgIFwibGludFwiOiBcImVzbGludCAuIC0tZXh0IHRzLHRzeCAtLXJlcG9ydC11bnVzZWQtZGlzYWJsZS1kaXJlY3RpdmVzIC0tbWF4LXdhcm5pbmdzIDBcIixcbiAgICBcInByZXZpZXdcIjogXCJ2aXRlIHByZXZpZXdcIlxuICB9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAcmFkaXgtdWkvcmVhY3Qtc2xvdFwiOiBcIl4xLjAuMlwiLFxuICAgIFwiQHRhbnN0YWNrL3JlYWN0LXRhYmxlXCI6IFwiXjguMTMuMlwiLFxuICAgIFwiQHpham5vL2NvbW1vblwiOiBcIl4yLjMuMFwiLFxuICAgIFwiQHpham5vL2NvbW1vbi1tb2J4XCI6IFwiXjEuMi43XCIsXG4gICAgXCJheGlvc1wiOiBcIl4xLjYuN1wiLFxuICAgIFwiY2xhc3MtdmFyaWFuY2UtYXV0aG9yaXR5XCI6IFwiXjAuNy4wXCIsXG4gICAgXCJjbHN4XCI6IFwiXjIuMS4wXCIsXG4gICAgXCJsdWNpZGUtcmVhY3RcIjogXCJeMC4zNDQuMFwiLFxuICAgIFwibW9ieFwiOiBcIl42LjEyLjBcIixcbiAgICBcIm1vYngtcmVhY3QtbGl0ZVwiOiBcIl40LjAuNVwiLFxuICAgIFwicmVhY3RcIjogXCJeMTguMi4wXCIsXG4gICAgXCJyZWFjdC1kb21cIjogXCJeMTguMi4wXCIsXG4gICAgXCJ0YWlsd2luZC1tZXJnZVwiOiBcIl4yLjIuMVwiLFxuICAgIFwidGFpbHdpbmQtdmFyaWFudHNcIjogXCJeMC4yLjBcIixcbiAgICBcInRhaWx3aW5kY3NzLWFuaW1hdGVcIjogXCJeMS4wLjdcIixcbiAgICBcIndvdXRlclwiOiBcIl4zLjAuMVwiLFxuICAgIFwieXVwXCI6IFwiXjEuMy4zXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMjAuMTEuMjRcIixcbiAgICBcIkB0eXBlcy9yZWFjdFwiOiBcIl4xOC4yLjYxXCIsXG4gICAgXCJAdHlwZXMvcmVhY3QtZG9tXCI6IFwiXjE4LjIuMTlcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiXjcuMS4wXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjcuMS4wXCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjogXCJeMy42LjBcIixcbiAgICBcIkB6YWpuby9lc2xpbnQtY29uZmlnXCI6IFwiXjMuMC4xXCIsXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xOFwiLFxuICAgIFwiZXNsaW50XCI6IFwiXjguNTcuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdC1ob29rc1wiOiBcIl40LjYuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdC1yZWZyZXNoXCI6IFwiXjAuNC41XCIsXG4gICAgXCJwb3N0Y3NzXCI6IFwiXjguNC4zNVwiLFxuICAgIFwidGFpbHdpbmRjc3NcIjogXCJeMy40LjFcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS4zLjNcIixcbiAgICBcInZpdGVcIjogXCJeNS4xLjRcIlxuICB9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9pZHVkaW5vdi9wcm9qZWN0cy9zcGlrZS9kZW1vLWFwcC9zcmMvU2VuZG1lRGVtby5Gcm9udFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2lkdWRpbm92L3Byb2plY3RzL3NwaWtlL2RlbW8tYXBwL3NyYy9TZW5kbWVEZW1vLkZyb250L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9pZHVkaW5vdi9wcm9qZWN0cy9zcGlrZS9kZW1vLWFwcC9zcmMvU2VuZG1lRGVtby5Gcm9udC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJ1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIlxuXG5jb25zdCBwYWNrYWdlSnNvbiA9IHJlcXVpcmUoJy4vcGFja2FnZS5qc29uJyk7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGRlZmluZToge1xuICAgICAgICBfX0FQUF9WRVJTSU9OX186IEpTT04uc3RyaW5naWZ5KGBbJHtwYWNrYWdlSnNvbi5uYW1lfV0gdiR7cGFja2FnZUpzb24udmVyc2lvbn1gKSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgICBwcm94eToge1xuICAgICAgICAgICAgLy8gSSBoYXRlIHlvdSBTaGthcG9cbiAgICAgICAgICAgICcvYXBpJzoge1xuICAgICAgICAgICAgICAgIHRhcmdldDogJ2h0dHA6Ly8wLjAuMC4wOjUyNzYnLFxuICAgICAgICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFDRSxNQUFRO0FBQUEsTUFDUixTQUFXO0FBQUEsTUFDWCxTQUFXO0FBQUEsTUFDWCxNQUFRO0FBQUEsTUFDUixTQUFXO0FBQUEsUUFDVCxLQUFPO0FBQUEsUUFDUCxVQUFVO0FBQUEsUUFDVixPQUFTO0FBQUEsUUFDVCxNQUFRO0FBQUEsUUFDUixTQUFXO0FBQUEsTUFDYjtBQUFBLE1BQ0EsY0FBZ0I7QUFBQSxRQUNkLHdCQUF3QjtBQUFBLFFBQ3hCLHlCQUF5QjtBQUFBLFFBQ3pCLGlCQUFpQjtBQUFBLFFBQ2pCLHNCQUFzQjtBQUFBLFFBQ3RCLE9BQVM7QUFBQSxRQUNULDRCQUE0QjtBQUFBLFFBQzVCLE1BQVE7QUFBQSxRQUNSLGdCQUFnQjtBQUFBLFFBQ2hCLE1BQVE7QUFBQSxRQUNSLG1CQUFtQjtBQUFBLFFBQ25CLE9BQVM7QUFBQSxRQUNULGFBQWE7QUFBQSxRQUNiLGtCQUFrQjtBQUFBLFFBQ2xCLHFCQUFxQjtBQUFBLFFBQ3JCLHVCQUF1QjtBQUFBLFFBQ3ZCLFFBQVU7QUFBQSxRQUNWLEtBQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxpQkFBbUI7QUFBQSxRQUNqQixlQUFlO0FBQUEsUUFDZixnQkFBZ0I7QUFBQSxRQUNoQixvQkFBb0I7QUFBQSxRQUNwQixvQ0FBb0M7QUFBQSxRQUNwQyw2QkFBNkI7QUFBQSxRQUM3Qiw0QkFBNEI7QUFBQSxRQUM1Qix3QkFBd0I7QUFBQSxRQUN4QixjQUFnQjtBQUFBLFFBQ2hCLFFBQVU7QUFBQSxRQUNWLDZCQUE2QjtBQUFBLFFBQzdCLCtCQUErQjtBQUFBLFFBQy9CLFNBQVc7QUFBQSxRQUNYLGFBQWU7QUFBQSxRQUNmLFlBQWM7QUFBQSxRQUNkLE1BQVE7QUFBQSxNQUNWO0FBQUEsSUFDRjtBQUFBO0FBQUE7OztBQ2hEc1csU0FBUyxvQkFBb0I7QUFDblksT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUZqQixJQUFNLG1DQUFtQztBQUl6QyxJQUFNLGNBQWM7QUFHcEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNILEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN4QztBQUFBLEVBQ0o7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNKLGlCQUFpQixLQUFLLFVBQVUsSUFBSSxZQUFZLElBQUksTUFBTSxZQUFZLE9BQU8sRUFBRTtBQUFBLEVBQ25GO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDSixPQUFPO0FBQUE7QUFBQSxNQUVILFFBQVE7QUFBQSxRQUNKLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQ0EsVUFBUztBQUNmLGtCQUFRLElBQUlBLEtBQUk7QUFDaEIsaUJBQU9BLE1BQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxRQUNwQztBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiXQp9Cg==
