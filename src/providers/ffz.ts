import { el } from 'redom-jsx'
import { addEmote, deleteEmote } from '../api.js'
import { API_BASE } from '../constants.js'
import type { Emote, FFZEmoticon } from '../types.js'

export class FrankerFaceZ {
  private emote: FFZEmoticon
  private emoteNames: string[]
  private isAdded = false
  private readonly pathnames = [
    'submissions',
    'emoticons',
    'channel',
    'emoticon'
  ]

  // emoticon buttons
  private addEmoteButton: HTMLAnchorElement
  private delEmoteButton: HTMLAnchorElement

  // emoticon preview
  private emoticonThead: HTMLTableRowElement
  private emoticonTbodyLight: HTMLTableRowElement
  private emoticonTbodyDark: HTMLTableRowElement
  private emoticonPreview: {
    th: HTMLTableCellElement
    dark: HTMLTableCellElement
    light: HTMLTableCellElement
  }

  constructor(private readonly emotes: Emote[]) {
    this.emoteNames = this.emotes.map((emote) => emote.name)
    this.render()
  }

  static init(emotes: Emote[]): FrankerFaceZ {
    return new FrankerFaceZ(emotes)
  }

  private render(): void {
    const currentPatchnames = location.pathname.split('/').filter(Boolean)
    const availablePath = this.pathnames.find((pathname) =>
      currentPatchnames.includes(pathname)
    )

    if (availablePath) {
      switch (availablePath) {
        case 'submissions':
        case 'emoticons':
        case 'channel':
          this.renderPanel()
          break
        case 'emoticon':
          this.parseEmoteInfo()
          this.renderEmoteButtons()
          this.renderEmotePreview()
      }
    }
  }

  private toggleAdded(): void {
    this.isAdded = !this.isAdded
  }

  private toggleEmoticonUI(): void {
    this.toggleAdded()
    this.toggleButtons()
    this.renderEmotePreview()
  }

  private toggleButtons(): void {
    this.addEmoteButton.style.display = this.isAdded ? 'none' : 'initial'
    this.delEmoteButton.style.display = this.isAdded ? 'initial' : 'none'
  }

  private renderEmoteButtons(): void {
    this.addEmoteButton = el('a', {
      textContent: '[ChatEmotes] Add',
      className: 'btn btn-large btn-success ffz-button',
      href: '#',
      onclick: (event: Event) => {
        event.preventDefault()

        addEmote(this.emote.name, this.emote.url)
          .then(() => this.toggleEmoticonUI())
          .catch(console.error)
      }
    })

    this.delEmoteButton = el('a', {
      textContent: '[ChatEmotes] Delete',
      className: 'btn btn-large btn-danger ffz-button',
      href: '#',
      onclick: (event: Event) => {
        event.preventDefault()

        deleteEmote(this.emote.name)
          .then(() => this.toggleEmoticonUI())
          .catch(console.error)
      }
    })

    const targetEl =
      document.querySelector('.btn-success') ??
      document.querySelector('.btn-danger')

    if (targetEl) {
      this.toggleButtons()
      targetEl.after(this.addEmoteButton, this.delEmoteButton)
    }
  }

  private renderEmotePreview(): void {
    const emoticonTable = document.querySelector('.emoticon-grid')
    if (!emoticonTable) return

    if (!this.isAdded) {
      if (!this.emoticonPreview) return
      Object.values(this.emoticonPreview).forEach((el) => el.remove())
      return
    }

    this.emoticonThead =
      emoticonTable.querySelector<HTMLTableRowElement>('thead > tr')!
    this.emoticonTbodyLight =
      emoticonTable.querySelector<HTMLTableRowElement>('tbody > .light')!
    this.emoticonTbodyDark =
      emoticonTable.querySelector<HTMLTableRowElement>('tbody > .dark')!

    const emoticonTd = el(
      'td',
      el('img', {
        className: 'emoticon hover-pixelated',
        src: `${API_BASE}emote/${this.emote.name}`
      })
    )

    this.emoticonPreview = {
      th: el('th', 'ChatEmotes'),
      dark: emoticonTd,
      light: emoticonTd.cloneNode(true) as HTMLTableCellElement
    }

    this.emoticonThead.prepend(this.emoticonPreview.th)
    this.emoticonTbodyDark.prepend(this.emoticonPreview.dark)
    this.emoticonTbodyLight.prepend(this.emoticonPreview.light)
  }

  private parseEmoteInfo(): void {
    const name = document
      .querySelector('#emoticon')!
      .textContent!.split(' ')[0]!

    const exist = this.emotes.find((emote) => emote.name === name)

    if (exist) {
      this.toggleAdded()
    }

    this.emote = {
      name,
      url: location.href
    }
  }

  private renderPanel() {
    const emoteCheckboxes = document.querySelectorAll('td > input')
    for (const checkbox of emoteCheckboxes) {
      const emoteName = checkbox.getAttribute('data-name')!
      if (this.emoteNames.includes(emoteName)) {
        checkbox.parentElement!.classList.add('ffz-added')
      }
    }

    const sidebar = document.querySelector('.sidebar-offcanvas')
    const panel = el(
      'div',
      {
        className: 'panel panel-default'
      },
      el('div', {
        textContent: 'ChatEmotes',
        className: 'panel-heading'
      }),
      el(
        'div',
        {
          className: 'list-group'
        },
        el('a', {
          textContent: 'Add Selected',
          className: 'list-group-item',
          href: '#',
          onclick: async (event: Event) => {
            event.preventDefault()

            const selectedEmotes = document.querySelectorAll(
              '.selectable.active > td > input'
            )

            for (const emote of selectedEmotes) {
              try {
                const emoteName = emote.getAttribute('data-name')!
                const emoteId = emote.getAttribute('data-id')!
                const emoteUrl = `https://cdn.frankerfacez.com/emoticon/${emoteId}/2`
                await addEmote(emoteName, emoteUrl)
                emote.parentElement!.classList.add('ffz-added')
              } catch (err) {
                console.error(err)
              } finally {
                ;(emote as HTMLElement).click()
              }
            }
          }
        }),
        el('a', {
          textContent: 'Delete Selected',
          className: 'list-group-item',
          href: '#',
          onclick: async (event: Event) => {
            event.preventDefault()

            const selectedEmotes = document.querySelectorAll(
              '.selectable.active > td > input'
            )

            for (const emote of selectedEmotes) {
              try {
                const emoteName = emote.getAttribute('data-name')!
                await deleteEmote(emoteName)
                emote.parentElement!.classList.remove('ffz-added')
              } catch (err) {
                console.error(err)
              } finally {
                ;(emote as HTMLElement).click()
              }
            }
          }
        })
      )
    )

    sidebar?.appendChild(panel)
  }
}
