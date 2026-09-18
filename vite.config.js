import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Nome do repositório no GitHub — usado como subcaminho quando publicado no
// GitHub Pages (usuario.github.io/<repo>/). Ajuste se o repositório mudar de nome.
const REPO_NAME = 'manobrax-ux'

export default defineConfig({
  base: process.env.GITHUB_PAGES ? `/${REPO_NAME}/` : '/',
  plugins: [react(), tailwindcss()],
})
