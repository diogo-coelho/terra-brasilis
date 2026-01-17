import { Scene } from '@/arcade/interfaces'
import { SceneEvent, SceneManager } from '@/arcade/core'
import { EventPayload } from '@/arcade/types'
import { EventListenerState, KeyboardKey } from '@/arcade/enums'

import { GameSceneState } from '@/game/enums'

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
 *
 */
export default class IntroScene extends SceneEvent implements Scene {
  private _title: string
  private _phrase: string

  constructor() {
    super()
    this._title = 'Terra Brasilis'
    this._phrase = 'Pressione Enter para iniciar'
  }

  public drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    const gradient = context.createLinearGradient(
      0,
      canvas.width,
      canvas.height,
      0
    )
    gradient.addColorStop(0, '#CCEFFF')
    gradient.addColorStop(0, '#52bcff')

    context.fillStyle = gradient
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.fillStyle = '#000000'
    context.font = 'bold 40px Arial, sans-serif'

    const titleSize = context.measureText(this._title)
    let xCoord = canvas.width / 2 - titleSize.width / 2

    context.fillText(this._title, xCoord, canvas.height / 2)

    context.fillStyle = '#FF0000'
    context.font = '20px Arial, sans-serif'

    const phraseSize = context.measureText(this._phrase)
    xCoord = canvas.width / 2 - phraseSize.width / 2
    context.fillText(this._phrase, xCoord, canvas.height / 2 + 50)
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
    var payload = () => sceneManager.setCurrentScene(GameSceneState.MENU)
    this.onKeyboardEvent(event, this.getEventPayload(payload))
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
}
