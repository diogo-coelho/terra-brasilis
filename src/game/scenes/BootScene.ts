import { SceneEvent } from '@/arcade/core'
import { Sound } from '@/arcade/sounds'
import { SceneManager } from '@/arcade/types'
import Scene from '@/arcade/interfaces/Scene'
import EventListenerState from '@/arcade/enums/EventListenerState'
import KeyboardKey from '@/arcade/enums/KeyboardKey'

import themeSound from '@/arcade/assets/sounds/intro_theme_inspiring.mp3'

import { GameSceneState } from '@/game/enums'

/**
 * Cena inicial de boot do jogo.
 *
 * @class BootScene
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Primeira cena exibida ao iniciar o jogo. Mostra mensagem "Pressione qualquer tecla"
 * e reproduz música de fundo. Aguarda interação do usuário para prosseguir.
 *
 * @extends SceneEvent
 * @implements Scene
 *
 * @remarks
 * - Responde a qualquer tecla ou click do mouse
 * - Transita automaticamente para IntroScene após interação
 * - Música de fundo em loop com volume ajustado
 *
 * @example
 * ```typescript
 * const bootScene = new BootScene();
 * sceneManager.addScene(GameSceneState.BOOT, bootScene);
 * ```
 */
export default class BootScene extends SceneEvent implements Scene {
  private _backgroundSound: Sound
  private _phrase: string

  constructor() {
    super()
    this._phrase = 'Pressione qualquer tecla'
    this._backgroundSound = new Sound(themeSound)
  }

  public onEnter(): void {
    this.startBackgroundSound()
  }

  public onExit(): void {
    this._backgroundSound.stop()
  }

  /**
   * Renderiza a cena de boot.
   *
   * @param {HTMLCanvasElement} canvas - Canvas do jogo
   * @param {CanvasRenderingContext2D} context - Contexto de renderização
   *
   * @remarks
   * Desenha um fundo preto com mensagem centralizada em branco.
   */
  public drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    context.fillStyle = '#000'
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.fillStyle = '#ffffff'
    context.font = '20px "Jersey 15", sans-serif'

    let xCoord = canvas.width / 2
    const phraseSize = context.measureText(this._phrase)
    xCoord = canvas.width / 2 - phraseSize.width / 2

    context.fillText(this._phrase, xCoord, canvas.height / 2)
  }

  /**
   * Manipula eventos de teclado na cena de boot.
   *
   * @param {KeyboardEvent} event - Evento de teclado
   * @param {SceneManager} sceneManager - Gerenciador de cenas
   *
   * @remarks
   * Qualquer tecla pressionada inicia a transição para IntroScene.
   */
  public handleKeyboardEvent?(
    event: KeyboardEvent,
    sceneManager: SceneManager
  ): void {
    var action = () => {
      sceneManager.setCurrentScene(GameSceneState.INTRO)
    }
    this.onKeyboardEvent(event, {
      eventType: EventListenerState.KEY_DOWN,
      eventKey: KeyboardKey.ANY,
      action,
    })
  }

  /**
   * Manipula eventos de mouse na cena de boot.
   *
   * @param {MouseEvent} event - Evento de mouse
   * @param {SceneManager} sceneManager - Gerenciador de cenas
   *
   * @remarks
   * Qualquer click inicia a transição para IntroScene.
   */
  public handleMouseEvent?(
    event: MouseEvent,
    sceneManager: SceneManager
  ): void {
    var action = () => {
      sceneManager.setCurrentScene(GameSceneState.INTRO)
    }
    this.onMouseEvent(event, {
      eventType: EventListenerState.CLICK,
      eventKey: KeyboardKey.ANY,
      action,
    })
  }

  private startBackgroundSound(): void {
    this._backgroundSound.loop(true)
    this._backgroundSound.setVolume(0.5)
    this._backgroundSound.play()
  }
}
