import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd());

  console.log('VITE_API_BASE:', env.VITE_API_BASE);


  return {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    server: {
      port: 2024,  // Ubah port di sini
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    preview: {
      allowedHosts: ['localhost', 'admin.chemicfest9.site']
    }
  };
});
