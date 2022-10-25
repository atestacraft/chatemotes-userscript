import { domReady } from '@zero-dependency/dom'
import { addEmote, allEmotes } from './api.js'
import { BetterTTV, FrankerFaceZ, SevenTV } from './providers/index.js'

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
      console.log('bttv provider loaded')
      break
    case 'www.frankerfacez.com':
      console.log('ffz provider loaded')
      FrankerFaceZ(emotes)
      break
  }
}

domReady().then(() => loadProvider())
