import { SceneEvent } from '@/arcade/core'
import Scene from '@/arcade/interfaces/Scene'
import { SceneManager } from '@/arcade/types'

/**
 * Cena para carregar jogos salvos.
 *
 * @class LoadGame
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Cena responsável por exibir e carregar partidas salvas anteriormente.
 * Ainda não implementada completamente.
 *
 * @extends SceneEvent
 * @implements Scene
 *
 * @remarks
 * Esta cena será utilizada para permitir que o jogador continue
 * partidas salvas. Atualmente em desenvolvimento.
 *
 * @see SceneEvent
 * @see Scene
 */
export default class LoadGame extends SceneEvent implements Scene {
  public drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    deltaTime: number
  ): void {
    throw new Error('Method not implemented.')
  }

  public handleKeyboardEvent?(
    event: KeyboardEvent,
    sceneManager: SceneManager
  ): void {
    throw new Error('Method not implemented.')
  }

  public handleMouseEvent?(
    event: MouseEvent,
    sceneManager: SceneManager
  ): void {
    throw new Error('Method not implemented.')
  }
}
