import { SceneEvent } from '@/arcade/core'
import { Scene } from '@/arcade/interfaces'
import { SceneManager } from '@/arcade/types'

/**
 * Cena de jogo principal (em desenvolvimento).
 *
 * @class NewGameScene
 * @extends SceneEvent
 * @implements Scene
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A NewGameScene representa a cena onde o gameplay efetivo acontecerá.
 * Atualmente em estágio inicial de desenvolvimento, esta cena:
 * - Exibe título "New Game Scene" centralizado
 * - Processa eventos de teclado e mouse (logging para debug)
 * - Serve como placeholder para futura implementação do jogo
 * 
 * **Estado Atual:**
 * - Renderização básica de texto
 * - Handlers de eventos para desenvolvimento
 * - Estrutura preparada para expansão
 * 
 * **Desenvolvimento Futuro:**
 * Esta cena será expandida para incluir:
 * - Mecânicas de gameplay de Terra Brasilis
 * - Interface de usuário do jogo
 * - Gerenciamento de recursos e economia
 * - Sistema de turnos ou tempo real
 * - Interações com NPCs e eventos
 * 
 * @example
 * ```typescript
 * const gameScene = new GameScene();
 * sceneManager.setScenesMap([{
 *   name: GameSceneState.NEW_GAME,
 *   scene: gameScene
 * }]);
 * ```
 *
 * @see Scene
 * @see SceneEvent
 */
export default class GameScene extends SceneEvent implements Scene {
  private _title: string

  constructor() {
    super()
    this._title = 'Game Scene'
  }

  public drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    deltaTime: number
  ): void {
    /** Escreve a frase centralizada */
    context.fillStyle = '#ffffff'
    context.font = '30px "Jersey 15", sans-serif'
    context.lineWidth = 3
    context.strokeStyle = '#000000'
    context.textAlign = 'center'

    let xCoord = canvas.width / 2

    context.strokeText(this._title, xCoord, canvas.height / 2 + 100)
    context.fillText(this._title, xCoord, canvas.height / 2 + 100)
  }

  public handleKeyboardEvent?(
    event: KeyboardEvent,
    sceneManager: SceneManager
  ): void {
    console.log('Key pressed in GameScene:', event.key)
  }

  public handleMouseEvent?(
    event: MouseEvent,
    sceneManager: SceneManager
  ): void {
    console.log('Mouse event in GameScene:', event.type)
  }
}
