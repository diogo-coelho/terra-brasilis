import { EventListenerState } from '@/arcade/enums'
import { Game, SceneManager } from '@/arcade/core'

/**
 * Gerenciador centralizado de eventos globais do navegador para o sistema de jogo.
 *
 * @class GlobalEvents
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe GlobalEvents implementa o padrão Observer/Mediator para gerenciar eventos
 * globais do navegador e distribuí-los para a cena ativa. Responsabilidades:
 * - Configurar listeners globais de eventos (teclado, mouse, resize)
 * - Despachar eventos para métodos handleKeyboardEvent e handleMouseEvent da cena atual
 * - Gerenciar evento de redimensionamento da janela
 * - Centralizar toda a lógica de captura de eventos em um único ponto
 *
 * Esta classe evita que cada cena precise configurar seus próprios listeners,
 * reduzindo duplicação de código e garantindo que eventos sejam sempre
 * direcionados à cena correta.
 *
 * Os eventos capturados incluem:
 * - **Teclado**: KEY_UP, KEY_DOWN
 * - **Mouse**: CLICK, MOUSE_MOVE
 * - **Janela**: RESIZE
 *
 * @remarks
 * Esta classe usa métodos estáticos, não requer múltiplas instâncias.
 * Os listeners são configurados uma única vez durante a inicialização do jogo.
 *
 * @example
 * ```typescript
 * // Inicializar eventos globais
 * const globalEvents = new GlobalEvents(sceneManager);
 *
 * // Ou usar método estático diretamente
 * GlobalEvents.initialize(sceneManager);
 * GlobalEvents.resize(gameEngine, sceneManager);
 * ```
 *
 * @see SceneManager
 * @see EventListenerState
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
