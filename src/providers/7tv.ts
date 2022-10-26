import { el, observeElement } from '@zero-dependency/dom'
import { wait } from '@zero-dependency/utils'
import { addEmote, deleteEmote } from '../api.js'
import type { Emote } from '../types.js'

export class SevenTV {
  private emotesName: string[]

  constructor(private readonly emotes: Emote[]) {
    this.emotesName = emotes.map((emote) => emote.name)
    this.render()
  }

  static init(emotes: Emote[]): SevenTV {
    return new SevenTV(emotes)
  }

  private async render() {
    observeElement('.emote-card-list', async (el) => {
      if (el.matches('.seven-tv')) return
      el.classList.add('seven-tv')

      await wait()
      const emotes = document.querySelectorAll('[emote-id] > .emote-card')
      for (const emote of emotes) {
        const emoteName = emote.querySelector('.title-banner')!.textContent!
        if (this.emotesName.includes(emoteName)) {
          ;(emote as HTMLElement).style.filter =
            'drop-shadow(rgb(23, 227, 53) 0.03em 0.03em 0.075em) drop-shadow(black 1px 1px 1px)'
        }
      }
    })

    observeElement<HTMLElement>('.actions-wrapper', (el) => {
      if (el.matches('.seven-tv')) return
      el.classList.add('seven-tv')
      this.renderAddButton(el)
    })
  }

  private renderAddButton(target: HTMLElement): void {
    SevenTVButton.init(target, this.emotes)
  }
}

class SevenTVButton {
  private isAdded: boolean
  private emoteName: string
  private button: HTMLElement

  constructor(
    private readonly target: HTMLElement,
    private readonly emotes: Emote[]
  ) {
    this.emoteName = document.querySelector('.emote-name')!.textContent!
    const existEmote = this.emotes.find(
      (emote) => emote.name === this.emoteName
    )

    this.isAdded = Boolean(existEmote)
    this.render()
  }

  static init(target: HTMLElement, emotes: Emote[]): SevenTVButton {
    return new SevenTVButton(target, emotes)
  }

  private toggleButton(): void {
    this.isAdded = !this.isAdded
    this.button.querySelector('span')!.textContent = `[ChatEmotes] ${
      this.isAdded ? 'Delete' : 'Add'
    }`
  }

  private render(): void {
    this.button = this.target
      .querySelectorAll('.action-group')[1]!
      .cloneNode(true) as HTMLElement

    this.button.querySelector('.action-icon')!.remove()
    this.button.querySelector('span')!.textContent = '[ChatEmotes] Add'
    this.button.addEventListener('click', async () => {
      try {
        if (this.isAdded) {
          await deleteEmote(this.emoteName)
        } else {
          await addEmote(this.emoteName, location.href)
        }

        this.toggleButton()
      } catch (err) {
        console.error(err)
      }
    })

    this.target.appendChild(this.button)
  }
}
