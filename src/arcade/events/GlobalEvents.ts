import { EventListenerState } from '@/arcade/enums'
import { Game, SceneManager } from '@/arcade/core'

/**
 * Gerenciador global de eventos do jogo.
 *
 * @class GlobalEvents
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Classe responsável por configurar e gerenciar eventos globais de teclado,
 * mouse e redimensionamento de janela. Despacha eventos para a cena atual
 * através do SceneManager.
 *
 * @remarks
 * Utiliza métodos estáticos para centralizar o gerenciamento de eventos.
 * Garante que eventos sejam direcionados à cena ativa.
 *
 * @example
 * ```typescript
 * const globalEvents = new GlobalEvents(sceneManager);
 * GlobalEvents.resize(gameEngine, sceneManager);
 * ```
 */
export default class GlobalEvents {
  constructor(sceneManager: SceneManager) {
    GlobalEvents.initialize(sceneManager)
  }

  /**
   * Inicializa os ouvintes de eventos globais.
   *
   * @param {SceneManager} sceneManager - Gerenciador de cenas
   *
   * @remarks
   * Configura handlers para eventos de teclado e mouse.
   */
  public static initialize(sceneManager: SceneManager): void {
    this.handleKeyboardEvent(sceneManager)
    this.handleMouseEvent(sceneManager)
  }

  /**
   * Configura o evento de redimensionamento de janela.
   *
   * @param {Game} gameEngine - Instância do motor do jogo
   * @param {SceneManager} sceneManager - Gerenciador de cenas
   *
   * @remarks
   * Quando a janela é redimensionada, ajusta o canvas e renderiza novamente
   * a cena atual.
   */
  public static resize(gameEngine: Game, sceneManager: SceneManager): void {
    window.addEventListener(EventListenerState.RESIZE, (event: UIEvent) => {
      gameEngine.resizeScreen()
      gameEngine.main(sceneManager.currentScene)
    })
  }

  /**
   * Configura ouvintes de eventos de teclado.
   *
   * @param {SceneManager} sceneManager - Gerenciador de cenas
   *
   * @remarks
   * Registra handlers para key_up e key_down, despachando para a cena atual.
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
   * Configura ouvintes de eventos de mouse.
   *
   * @param {SceneManager} sceneManager - Gerenciador de cenas
   *
   * @remarks
   * Registra handlers para click e mousemove, despachando para a cena atual.
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
