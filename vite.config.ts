import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    proxy: {
      "^/products": {
        target: "https://dummyjson.com",
        ws: true,
        changeOrigin: true,
        secure: false,
      },
    },
    // proxy: {
    //   "^http://localhost:3000/": {
    //     target: "https://dummyjson.com",
    //     ws: true,
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },

})
