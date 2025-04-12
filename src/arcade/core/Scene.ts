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
   * @param event - Evento de teclado
   * @param scene - Gerenciador de cenas
   */
  public handleKeyboardEvent(
    event: KeyboardEvent,
    scene?: SceneManager
  ): void {}

  /**
   * Método que lida com os eventos de clique
   * @param event - Evento do mouse
   * @param scene - Gerenciador de cenas
   */
  public handleMouseEvent(event: MouseEvent, scene?: SceneManager): void {}
}

export default Scene
