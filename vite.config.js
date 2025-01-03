import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:[
      {
        find:"@",replacement:"/src",
      }
    ]
  },
  server:{
    proxy:{
      '/api':{
        target:'http://192.168.170.131:8080',
        changeOrigin:true,
        rewrite:(path) => path.replace(/^\/api/,'')
      }
    }
  }
})
