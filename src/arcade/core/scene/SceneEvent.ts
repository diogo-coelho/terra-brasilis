import { EventListenerState, KeyboardKey } from '@/arcade/enums'
import { EventPayload } from '@/arcade/types'

/**
 * Gerenciador de eventos de cena.
 *
 * @class SceneEvent
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Classe responsável por processar e despachar eventos de teclado e mouse
 * dentro do contexto de uma cena, vinculando eventos DOM às ações do jogo.
 *
 * @example
 * ```typescript
 * const sceneEvent = new SceneEvent();
 * sceneEvent.onKeyboardEvent(event, {
 *   eventType: 'keydown',
 *   eventKey: 'Enter',
 *   action: () => console.log('Enter pressed')
 * });
 * ```
 */
export default class SceneEvent {
  /**
   * Processa eventos de teclado e executa a ação associada.
   *
   * @param {KeyboardEvent} event - Evento de teclado do navegador
   * @param {EventPayload} callback - Objeto contendo tipo de evento, tecla e ação a executar
   *
   * @returns {any} Resultado da execução da ação
   *
   * @remarks
   * Suporta eventos de keydown e keyup. Aceita teclas específicas ou KeyboardKey.ANY
   * para capturar qualquer tecla.
   *
   * @example
   * ```typescript
   * sceneEvent.onKeyboardEvent(event, {
   *   eventType: EventListenerState.KEY_DOWN,
   *   eventKey: 'ArrowUp',
   *   action: () => movePlayer()
   * });
   * ```
   */
  public onKeyboardEvent(event: KeyboardEvent, callback: EventPayload): any {
    switch (event.type) {
      case EventListenerState.KEY_DOWN:
        if (
          callback.eventType === EventListenerState.KEY_DOWN &&
          (event.key === callback.eventKey ||
            callback.eventKey === KeyboardKey.ANY)
        ) {
          this.dispatchAction(callback.action)
        }
        break
      case EventListenerState.KEY_UP:
        if (
          callback.eventType === EventListenerState.KEY_UP &&
          (event.key === callback.eventKey ||
            callback.eventKey === KeyboardKey.ANY)
        ) {
          this.dispatchAction(callback.action)
        }
        break
      default:
        console.warn(`Unhandled keyboard event type: ${event.type}`)
    }
  }

  /**
   * Processa eventos de mouse e executa a ação associada.
   *
   * @param {MouseEvent} event - Evento de mouse do navegador
   * @param {EventPayload} callback - Objeto contendo tipo de evento e ação a executar
   *
   * @returns {any} Resultado da execução da ação
   *
   * @example
   * ```typescript
   * sceneEvent.onMouseEvent(event, {
   *   eventType: EventListenerState.CLICK,
   *   action: () => handleClick()
   * });
   * ```
   */
  public onMouseEvent(event: MouseEvent, callback: EventPayload): any {
    switch (event.type) {
      case EventListenerState.CLICK:
        if (callback.eventType === EventListenerState.CLICK) {
          this.dispatchAction(callback.action)
        }
        break
      default:
        console.warn(`Unhandled mouse event type: ${event.type}`)
    }
  }
  private dispatchAction(callback: (...args: any[]) => any): any {
    return callback()
  }
}
