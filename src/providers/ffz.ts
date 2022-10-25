import { el } from 'redom-jsx'
import { addEmote, deleteEmote } from '../api.js'
import type { Emote } from '../types.js'

export function FrankerFaceZ(emotes: Emote[]) {
  const ffzEmoticon = /^https:\/\/www.frankerfacez.com\/emoticon\/(\d+)/

  if (ffzEmoticon.test(location.href)) {
    const emoteName = document
      .querySelector('#emoticon')!
      .textContent!.split(' ')[0]!
    const existEmote = emotes.find((emote) => emote.name === emoteName)

    const addEmoteButton = el('a', {
      textContent: '[ChatEmotes] Add Emote',
      className: 'btn btn-large btn-success',
      style: {
        marginLeft: '1rem',
        display: existEmote ? 'none' : 'initial'
      },
      href: '#',
      onclick: (event: Event) => {
        event.preventDefault()

        addEmote(emoteName, location.href)
          .then(() => {
            addEmoteButton.style.display = 'none'
            deleteEmoteButton.style.display = 'initial'
          })
          .catch(console.error)
      }
    })

    const deleteEmoteButton = el('a', {
      textContent: '[ChatEmotes] Delete Emote',
      className: 'btn btn-large btn-danger',
      style: {
        marginLeft: '1rem',
        display: existEmote ? 'initial' : 'none'
      },
      href: '#',
      onclick: (event: Event) => {
        event.preventDefault()

        deleteEmote(emoteName)
          .then(() => {
            deleteEmoteButton.style.display = 'none'
            addEmoteButton.style.display = 'initial'
          })
          .catch(console.error)
      }
    })

    const targetEl =
      document.querySelector('.btn-success') ??
      document.querySelector('.btn-danger')

    if (targetEl) {
      targetEl.after(addEmoteButton, deleteEmoteButton)
    }
  }
}
