import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port:5173,
    cors:false,
    proxy: {
      
      '/api': {
        target: "http://127.0.0.1:3000/",
        changeOrigin:true,
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            
            console.log(
              "Sending Request:",
              proxyReq.path,
              JSON.stringify(proxyReq.getHeaders()),
            );
            console.log('\n \n \n ')
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log(
              "Received Response from the Target:",
              proxyRes.statusCode,
              req.url,
              JSON.stringify(proxyRes.headers),
            );
          });
        }
    }
  }
},
  plugins: [react(),tailwindcss()],
})
