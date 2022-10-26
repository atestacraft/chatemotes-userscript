import { el, observeElement } from '@zero-dependency/dom'
import { addEmote, deleteEmote } from '../api.js'
import type { Emote } from '../types.js'

export class BetterTTV {
  private readonly addToChannelSelector =
    '#root > div > div.chakra-container > div > div > div:nth-child(1) > div:nth-child(5) > div > button'

  private readonly emotesPreviewXPath =
    '/html/body/div[1]/div/div[2]/div/div/div[1]/div[2]'

  constructor(private readonly emotes: Emote[]) {
    this.render()
  }

  static init(emotes: Emote[]): BetterTTV {
    return new BetterTTV(emotes)
  }

  private async render(): Promise<void> {
    observeElement(this.addToChannelSelector, (el) => {
      this.renderAddButton(el)
    })
  }

  private renderAddButton(target: Element): void {
    if (target.matches('.bttv-button')) return
    target.classList.add('bttv-button')
    BTTVButton.init(target, this.emotes)
  }
}

class BTTVButton {
  private isAdded: boolean
  private button: HTMLButtonElement
  private emoteName: string

  constructor(
    private readonly target: Element,
    private readonly emotes: Emote[]
  ) {
    const emoteHeader = document.querySelectorAll('.chakra-heading')[2]!
    this.emoteName = emoteHeader.textContent!

    const existEmote = this.emotes.find(
      (emote) => emote.name === this.emoteName
    )

    this.isAdded = Boolean(existEmote)
    this.render()
  }

  static init(target: Element, emotes: Emote[]): BTTVButton {
    return new BTTVButton(target, emotes)
  }

  private toggleButton(): void {
    this.isAdded = !this.isAdded
    Object.assign(this.button, this.getButtonAttributes())
  }

  private getButtonAttributes() {
    return {
      textContent: `[ChatEmotes] ${this.isAdded ? 'Delete' : 'Add'}`,
      className: `${this.target.className} bttv-${
        this.isAdded ? 'del' : 'add'
      }-button`
    }
  }

  private render(): void {
    this.button = el('button', {
      ...this.getButtonAttributes(),
      type: 'button',
      onclick: async () => {
        try {
          this.button.setAttribute('disabled', 'true')

          if (this.isAdded) {
            await deleteEmote(this.emoteName)
          } else {
            await addEmote(this.emoteName, location.href)
          }

          this.toggleButton()
        } catch (err) {
          console.error(err)
        } finally {
          this.button.removeAttribute('disabled')
        }
      }
    })

    this.target.after(this.button)
  }
}
