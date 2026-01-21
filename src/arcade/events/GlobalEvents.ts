import { EventListenerState } from '@/arcade/enums'
import { Game, SceneManager } from '@/arcade/core'

/**
 * Classe responsável por gerenciar os eventos globais do jogo,
 * como eventos de teclado e mouse.
 *
 * @class GlobalEvents
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe GlobalEvents é responsável por configurar
 * os listeners globais para eventos de teclado e mouse,
 * e despachar esses eventos para a cena atual gerenciada
 * pelo SceneManager.
 *
 * @example
 * const globalEvents = new GlobalEvents(sceneManager);
 *
 * @see SceneManager
 *
 */
export default class GlobalEvents {
  constructor(sceneManager: SceneManager) {
    GlobalEvents.initialize(sceneManager)
  }

  public static initialize(sceneManager: SceneManager): void {
    this.handleKeyboardEvent(sceneManager)
    this.handleMouseEvent(sceneManager)
  }

  public static resize(gameEngine: Game, sceneManager: SceneManager): void {
    window.addEventListener(EventListenerState.RESIZE, (event: UIEvent) => {
      gameEngine.resizeScreen()
      gameEngine.main(sceneManager.currentScene)
    })
  }

  /**
   * Método para configurar os listeners de eventos de teclado.
   * @param {SceneManager} sceneManager - Instância do gerenciador de cenas.
   */
  private static handleKeyboardEvent(sceneManager: SceneManager): void {
    window.addEventListener(
      EventListenerState.KEY_UP,
      (event: KeyboardEvent) => {
        this.dispatchKeyUpEvent(event, sceneManager)
      }
    )

    window.addEventListener(
      EventListenerState.KEY_DOWN,
      (event: KeyboardEvent) => {
        this.dispatchKeyDownEvent(event, sceneManager)
      }
    )
  }

  /**
   * Método para configurar os listeners de eventos de mouse.
   * @param {SceneManager} sceneManager - Instância do gerenciador de cenas.
   */
  private static handleMouseEvent(sceneManager: SceneManager): void {
    window.addEventListener(EventListenerState.CLICK, (event: MouseEvent) => {
      this.dispatchClickEvent(event, sceneManager)
    })

    window.addEventListener(
      EventListenerState.MOUSE_MOVE,
      (event: MouseEvent) => {
        this.dispatchMouseMoveEvent(event, sceneManager)
      }
    )
  }

  private static dispatchMouseMoveEvent(
    event: MouseEvent,
    sceneManager: SceneManager
  ) {
    if (!sceneManager.currentScene.handleMouseEvent) return
    sceneManager.currentScene.handleMouseEvent(event, sceneManager)
  }

  private static dispatchClickEvent(
    event: MouseEvent,
    sceneManager: SceneManager
  ) {
    if (!sceneManager.currentScene.handleMouseEvent) return
    sceneManager.currentScene.handleMouseEvent(event, sceneManager)
  }

  private static dispatchKeyUpEvent(
    event: KeyboardEvent,
    sceneManager: SceneManager
  ): void {
    if (!sceneManager.currentScene.handleKeyboardEvent) return
    sceneManager.currentScene.handleKeyboardEvent(event, sceneManager)
  }

  private static dispatchKeyDownEvent(
    event: KeyboardEvent,
    sceneManager: SceneManager
  ): void {
    if (!sceneManager.currentScene.handleKeyboardEvent) return
    sceneManager.currentScene.handleKeyboardEvent(event, sceneManager)
  }
}
