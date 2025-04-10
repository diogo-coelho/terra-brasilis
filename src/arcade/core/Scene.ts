import SceneManager from './SceneManager'

/**
 * Classe abstrata que representa uma cena do jogo
 * @abstract
 * @class Scene
 */
abstract class Scene {
  /**
   * Método que renderiza a cena
   * @abstract
   * @param canvas
   * @param context
   */
  abstract drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void

  /**
   * Método que lida com os eventos de teclado
   * @abstract
   * @param event
   * @param scene
   */
  abstract handleKeyboardEvent(event: KeyboardEvent, scene?: SceneManager): void

  /**
   * Método que lida com os eventos de clique
   * @abstract
   * @param event
   * @param scene
   */
  abstract handleClickEvent(event: MouseEvent, scene?: SceneManager): void
}

export default Scene
