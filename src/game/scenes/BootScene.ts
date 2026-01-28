import { SceneEvent } from '@/arcade/core'
import Scene from '@/arcade/interfaces/Scene'
import { SceneManager } from '@/arcade/types'
import EventListenerState from '@/arcade/enums/EventListenerState'
import KeyboardKey from '@/arcade/enums/KeyboardKey'
import { Sound } from '@/arcade/sounds'

import themeSound from '@/arcade/assets/sounds/intro_theme_inspiring.mp3'

import { GameSceneState } from '../enums'

/**
 * Cena inicial de boot que aguarda interação do usuário para iniciar o jogo.
 *
 * @class BootScene
 * @extends SceneEvent
 * @implements Scene
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A BootScene é a primeira cena apresentada ao jogador, sendo responsável por:
 * - Exibir mensagem inicial "Pressione qualquer tecla"
 * - Iniciar reprodução da música tema em loop
 * - Aguardar qualquer interação (tecla ou clique) para prosseguir
 * - Fazer transição para a IntroScene
 * - Renderizar fundo preto com texto centralizado
 * 
 * Esta cena atua como uma tela splash interativa, garantindo que o áudio
 * seja iniciado somente após interação do usuário (requisito de políticas
 * de autoplay dos navegadores modernos).
 * 
 * **Fluxo:**
 * 1. Jogador inicia o jogo
 * 2. BootScene exibida
 * 3. Música tema começa a tocar
 * 4. Jogador pressiona tecla/clica
 * 5. Transição para IntroScene
 * 6. Música é interrompida
 * 
 * @example
 * ```typescript
 * const bootScene = new BootScene();
 * sceneManager.setScenesMap([{
 *   name: GameSceneState.BOOT,
 *   scene: bootScene
 * }]);
 * sceneManager.setCurrentScene(GameSceneState.BOOT);
 * ```
 *
 * @see Scene
 * @see SceneEvent
 * @see GameSceneState
 */
export default class BootScene extends SceneEvent implements Scene {
  private _backgroundSound: Sound
  private _phrase: string

  constructor() {
    super()
    this._phrase = 'Pressione qualquer tecla'
    this._backgroundSound = new Sound(themeSound)
  }

  /**
   * Método chamado ao entrar na cena.
   * Inicia a reprodução do som de fundo.
   * @returns {void}
   */
  public onEnter(): void {
    this.startBackgroundSound()
  }

  /**
   * Método chamado ao sair da cena.
   * Para a reprodução do som de fundo.
   * @returns {void}
   */
  public onExit(): void {
    this._backgroundSound.stop()
  }

  /**
   * Desenha a cena no canvas.
   * @param {HTMLCanvasElement} canvas - O elemento HTMLCanvasElement onde a cena será desenhada.
   * @param {CanvasRenderingContext2D} context - O contexto de renderização 2D do canvas.
   */
  public drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    /** Pinta todo o background preto */
    context.fillStyle = '#000'
    context.fillRect(0, 0, canvas.width, canvas.height)

    /** Escreve a frase centralizada */
    context.fillStyle = '#ffffff'
    context.font = '20px "Jersey 15", sans-serif'

    let xCoord = canvas.width / 2
    const phraseSize = context.measureText(this._phrase)
    xCoord = canvas.width / 2 - phraseSize.width / 2

    context.fillText(this._phrase, xCoord, canvas.height / 2)
  }

  /**
   * Lida com eventos de teclado.
   * @param {KeyboardEvent} event - O evento de teclado a ser manipulado.
   * @param {SceneManager} sceneManager - O gerenciador de cenas.
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
   * Lida com eventos de mouse.
   * @param {MouseEvent} event - O evento de mouse a ser manipulado.
   * @param {SceneManager} sceneManager - O gerenciador de cenas.
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

  /**
   * Inicia a reprodução do som de fundo da cena de boot.
   * @private
   * @returns {void}
   */
  private startBackgroundSound(): void {
    this._backgroundSound.loop(true)
    this._backgroundSound.setVolume(0.5)
    this._backgroundSound.play()
  }
}
