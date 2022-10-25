import { Fetcher } from '@zero-dependency/dom'
import type { Emote } from './types'

// https://vchcode-emotes.satont.dev/api/
const fetcher = new Fetcher('http://localhost:5050/api/', {
  headers: {
    'Content-Type': 'application/json',
    Authorization: GM_getValue('API_TOKEN')
  }
})

export async function allEmotes(): Promise<Emote[]> {
  return await fetcher.get<Emote[]>('emotes')
}

export async function addEmote(name: string, url: string): Promise<unknown> {
  return await fetcher.put('emote', {
    body: JSON.stringify({ name, url })
  })
}

export async function deleteEmote(name: string): Promise<unknown> {
  return await fetcher.delete(`emote/${name}`)
}

export async function renameEmote(
  currentName: string,
  newName: string
): Promise<void> {
  return await fetcher.post(`emote/${currentName}`, {
    body: JSON.stringify({ name: newName })
  })
}
