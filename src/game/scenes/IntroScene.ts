import { Scene } from '@/arcade/interfaces'
import { SceneEvent, SceneManager } from '@/arcade/core'
import { EventPayload } from '@/arcade/types'
import { EventListenerState, KeyboardKey } from '@/arcade/enums'
import { Sound } from '@/arcade/sounds'
import { Image } from '@/arcade/images'

import { GameSceneState } from '@/game/enums'
import themeSound from '@/arcade/assets/sounds/intro_theme.wav'
import backgroundImage from '@/arcade/assets/images/terra_brasilis_intro_background.png'
import logoImage from '@/arcade/assets/images/terra_brasilis_logo.png'

/**
 * A classe IntroScene representa a cena de introdução do jogo.
 * Ela implementa a interface Scene e estende a classe SceneEvent.
 * Esta cena lida com eventos de teclado, especificamente o evento de pressionar a tecla "Enter",
 * que faz a transição para a cena do menu principal do jogo.
 *
 * @class IntroScene
 * @extends SceneEvent
 * @implements Scene
 *
 * @example
 * const introScene = new IntroScene();
 *
 * @see Scene
 * @see SceneEvent
 * @see SceneManager
 * @see GameSceneState
 * @see Sound
 *
 */
export default class IntroScene extends SceneEvent implements Scene {
  private _phrase: string
  private _backgroundSound: Sound
  private _backgroundImage!: Image
  private _logoImage!: Image

  constructor() {
    super()
    this._phrase = 'Pressione Enter para iniciar'
    this._backgroundSound = new Sound(themeSound)
    this._backgroundImage = new Image(backgroundImage)
    this._logoImage = new Image(logoImage)
  }

  /**
   * Desenha a cena de introdução no canvas.
   * @param {HTMLCanvasElement} canvas - O elemento HTMLCanvasElement onde a cena será desenhada.
   * @param {CanvasRenderingContext2D} context - O contexto de renderização 2D do canvas.
   */
  public drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    /** Setando o tamanho da imagem de fundo */
    if (!this._backgroundImage.isLoaded()) return
    this._backgroundImage.width = canvas.width
    this._backgroundImage.height = canvas.height
    context.save()
    context.globalAlpha = 0.6
    /** Desenhando a imagem de fundo */
    context.drawImage(
      this._backgroundImage.image as CanvasImageSource,
      0,
      0,
      canvas.width,
      canvas.height
    )
    context.restore()

    /** Setando o tamanho da imagem do logo */
    if (!this._logoImage.isLoaded()) return
    this._logoImage.width = 636
    this._logoImage.height = 274
    const logoX = canvas.width / 2 - this._logoImage.width / 2
    const logoY = canvas.height / 2 - this._logoImage.height / 2 - 100
    /** Desenhando a imagem do logo */
    context.drawImage(
      this._logoImage.image as CanvasImageSource,
      logoX,
      logoY,
      this._logoImage.width,
      this._logoImage.height
    )

    let xCoord = canvas.width / 2 - this._logoImage.width / 2
    const phraseSize = context.measureText(this._phrase)
    xCoord = canvas.width / 2 - phraseSize.width / 2

    context.fillStyle = '#ffffff'
    context.font = '30px "Jersey 15", sans-serif'
    context.lineWidth = 4
    context.strokeStyle = '#000000'
    context.fillStyle = '#ffffff'

    context.strokeText(this._phrase, xCoord, canvas.height / 2 + 100)
    context.fillText(this._phrase, xCoord, canvas.height / 2 + 100)
  }

  /**
   * Lida com eventos de teclado na cena de introdução.
   * @param {KeyboardEvent} event - Evento de teclado capturado.
   * @param {SceneManager} sceneManager - Gerenciador de cenas.
   */
  public handleKeyboardEvent(
    event: KeyboardEvent,
    sceneManager: SceneManager
  ): void {
    var payload = () => {
      sceneManager.setCurrentScene(GameSceneState.MENU)
      this._backgroundSound.stop()
    }
    this.onKeyboardEvent(event, this.getEventPayload(payload))
    this.startBackgroundSound()
  }

  /**
   * Lida com eventos de mouse na cena de introdução.
   * @param {(...args: any[]) => any} payload - Função callback a ser associada à ação nomeada.
   * @returns {EventPayload} Mapa contendo a ação nomeada associada ao payload.
   */
  private getEventPayload(payload: (...args: any[]) => any): EventPayload {
    return {
      eventType: EventListenerState.KEY_DOWN,
      eventKey: KeyboardKey.ENTER,
      action: payload,
    }
  }

  /**
   * Inicia a reprodução do som de fundo da cena de introdução.
   * @private
   * @returns {void}
   */
  private startBackgroundSound(): void {
    this._backgroundSound.play()
    this._backgroundSound.loop(true)
    this._backgroundSound.setVolume(0.5)
  }
}
