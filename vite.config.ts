import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(), // jika fungsi ini dipakai, hapus tanda komen // di depan
    react(),
    tailwindcss(),
  ],
  // 👇 INI BAGIAN YANG KITA TAMBAHKAN 👇
  //server: {
    //host: '0.0.0.0',
    //port: 5173,
    //allowedHosts: true
 // },
  // 👆 ============================== 👆
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
