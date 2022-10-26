import { domReady } from '@zero-dependency/dom'
import { allEmotes } from './api.js'
import { BetterTTV, FrankerFaceZ, SevenTV } from './providers/index.js'
import './style.scss'

async function loadProvider() {
  if (import.meta.env.DEV) {
    GM_setValue('API_TOKEN', 'xxx')
  }

  const emotes = await allEmotes()

  switch (location.hostname) {
    case '7tv.app':
      console.log('7tv provider loaded')
      break
    case 'betterttv.com':
      BetterTTV.init(emotes)
      break
    case 'www.frankerfacez.com':
      FrankerFaceZ.init(emotes)
      break
  }
}

domReady().then(() => loadProvider())
