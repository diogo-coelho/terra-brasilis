import { Scene } from '@/arcade/interfaces'
import { SceneEvent, SceneManager } from '@/arcade/core'
import { EventPayload } from '@/arcade/types'
import { EventListenerState, KeyboardKey } from '@/arcade/enums'
import { Sound } from '@/arcade/sounds'
import { Image } from '@/arcade/images'

import themeSound from '@/arcade/assets/sounds/intro_theme_inspiring.mp3'
import backgroundImage from '@/arcade/assets/images/tb_intro_background.png'
import logoImage from '@/arcade/assets/images/tb_logo.png'

import { GameSceneState } from '@/game/enums'

/**
 * Cena de introdução do jogo.
 *
 * @class IntroScene
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Cena de introdução que exibe o logo do jogo com animação de entrada,
 * imagem de fundo e música temática. Aguarda Enter para prosseguir.
 *
 * @extends SceneEvent
 * @implements Scene
 *
 * @remarks
 * - Logo desce suavemente do topo da tela
 * - Música de fundo em loop
 * - Transita para MainMenuScene ao pressionar Enter
 *
 * @example
 * ```typescript
 * const introScene = new IntroScene();
 * sceneManager.addScene(GameSceneState.INTRO, introScene);
 * ```
 */
export default class IntroScene extends SceneEvent implements Scene {
  private _phrase: string
  private _backgroundSound: Sound
  private _initializedSoundSetup: boolean = false
  private _backgroundImage!: Image
  private _logoImage!: Image
  private _initializedLogoSetup: boolean = false

  constructor() {
    super()
    this._phrase = 'Pressione Enter para iniciar'
    this._backgroundSound = new Sound(themeSound)
    this._backgroundImage = new Image(backgroundImage)
    this._logoImage = new Image(logoImage)
  }

  public onEnter(): void {
    this.startBackgroundSound()
  }

  public onExit(): void {
    this._backgroundSound.stop()
  }

  /**
   * Renderiza a cena de introdução.
   *
   * @param {HTMLCanvasElement} canvas - Canvas do jogo
   * @param {CanvasRenderingContext2D} context - Contexto de renderização
   * @param {number} deltaTime - Tempo decorrido desde o último frame
   *
   * @remarks
   * Desenha fundo semitransparente, logo animado e texto de instrução.
   */
  public drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    deltaTime: number
  ): void {
    if (!this._backgroundImage.isLoaded()) return
    this._backgroundImage.setImageAsCover(canvas)
    context.save()
    context.globalAlpha = 0.6
    context.drawImage(
      this._backgroundImage.image as CanvasImageSource,
      0,
      0,
      canvas.width,
      canvas.height
    )
    context.restore()

    if (!this._logoImage.isLoaded()) return
    this.setImageLogoSetup(canvas)
    this._logoImage.updatePosition(deltaTime)
    context.drawImage(
      this._logoImage.image as CanvasImageSource,
      this._logoImage.positionX,
      this._logoImage.positionY,
      this._logoImage.image!.width,
      this._logoImage.image!.height
    )

    context.fillStyle = '#ffffff'
    context.font = '30px "Jersey 15", sans-serif'
    context.lineWidth = 3
    context.strokeStyle = '#000000'

    let xCoord = canvas.width / 2 - this._logoImage.image!.width / 2
    const phraseSize = context.measureText(this._phrase)
    xCoord = canvas.width / 2 - phraseSize.width / 2

    context.strokeText(this._phrase, xCoord, canvas.height / 2 + 100)
    context.fillText(this._phrase, xCoord, canvas.height / 2 + 100)
  }

  /**
   * Manipula eventos de teclado na cena de introdução.
   *
   * @param {KeyboardEvent} event - Evento de teclado
   * @param {SceneManager} sceneManager - Gerenciador de cenas
   *
   * @remarks
   * Pressionar Enter inicia a transição para MainMenuScene.
   */
  public handleKeyboardEvent(
    event: KeyboardEvent,
    sceneManager: SceneManager
  ): void {
    var payload = () => {
      sceneManager.setCurrentScene(GameSceneState.MAIN_MENU)
    }
    this.onKeyboardEvent(event, this.getEventPayload(payload))
  }

  private getEventPayload(payload: (...args: any[]) => any): EventPayload {
    return {
      eventType: EventListenerState.KEY_DOWN,
      eventKey: KeyboardKey.ENTER,
      action: payload,
    }
  }

  private startBackgroundSound(): void {
    if (this._initializedSoundSetup) return
    this._backgroundSound.loop(true)
    this._backgroundSound.setVolume(0.5)
    this._backgroundSound.play()
    this._initializedSoundSetup = true
  }

  private setImageLogoSetup(canvas: HTMLCanvasElement): void {
    if (!this._initializedLogoSetup) {
      this._logoImage.resizeProportionally({ targetWidth: 500 })

      const logoX = canvas.width / 2 - this._logoImage.image!.width / 2
      const logoY = -this._logoImage.image!.height

      const targetLogoX = canvas.width / 2 - this._logoImage.image!.width / 2
      const targetLogoY =
        canvas.height / 2 - this._logoImage.image!.height / 2 - 100

      this._logoImage.initialPosition(logoX, logoY)
      this._logoImage.setTargetPosition(targetLogoX, targetLogoY)
      this._logoImage.speed = 100
      this._initializedLogoSetup = true
    }
  }
}
