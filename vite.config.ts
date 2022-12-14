import { defineConfig } from 'vite'
import Redom from 'vite-redom-jsx'
import Userscript from 'vite-userscript-plugin'
import { name, version, homepage, license } from './package.json'

export default defineConfig((config) => {
  return {
    plugins: [
      Redom(),
      Userscript({
        entry: 'src/index.ts',
        header: {
          name,
          version,
          license,
          homepage,
          match: [
            '*://7tv.app/*',
            '*://betterttv.com/*',
            '*://www.frankerfacez.com/*'
          ]
        },
        server: {
          port: 3000
        }
      })
    ]
  }
})
