import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy :{
      '/api' : 'http://localhost:3000', //not only just appends but also this is the origin i.e same server
    },

  },
  plugins: [react()],
})
