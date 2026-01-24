import { SceneManager } from '@/arcade/types'

/**
 * Interface que define a estrutura de uma cena no jogo.
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A interface Scene define o contrato para
 * qualquer cena que será desenhada no jogo,
 * garantindo que todas as cenas implementem
 * o método drawScene.
 *
 */
export default interface Scene {
  drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    deltaTime: number
  ): void

  handleKeyboardEvent?(event: KeyboardEvent, sceneManager: SceneManager): void

  handleMouseEvent?(event: MouseEvent, sceneManager: SceneManager): void
}
