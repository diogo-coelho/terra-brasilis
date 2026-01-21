import { EventListenerState } from '@/arcade/enums'
import { EventPayload } from '@/arcade/types'

/**
 * A classe SceneEvent fornece uma implementação padrão para o
 * manuseio de eventos de cena, incluindo eventos de teclado e mouse.
 * Esta classe pode ser estendida por outras classes de cena para
 * herdar a funcionalidade de gerenciamento de eventos.
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe SceneEvent implementa métodos para lidar com eventos
 * de teclado e mouse, permitindo que as cenas respondam a esses eventos
 * de maneira consistente.
 *
 * @example
 * class MyScene extends SceneEvent {
 *   constructor() {
 *     super();
 *   }
 *
 *   public handleKeyboardEvent(event: KeyboardEvent): void {
 *    this.onKeyboardEvent(event, {
 *      eventType: EventListenerState.KEY_DOWN,
 *      eventKey: 'Enter',
 *      action: () => { console.log('Enter key pressed'); }
 *     });
 *   }
 * }
 *
 * @see EventPayload
 *
 */
export default class SceneEvent {
  /**
   * Método para manipular eventos de teclado.
   * @param {KeyboardEvent} event - O evento de teclado a ser manipulado.
   * @param {EventPayload} callback - O callback associado ao evento de teclado.
   * @return {any} O resultado da ação despachada.
   */
  public onKeyboardEvent(event: KeyboardEvent, callback: EventPayload): any {
    switch (event.type) {
      case EventListenerState.KEY_DOWN:
        if (
          callback.eventType === EventListenerState.KEY_DOWN &&
          event.key === callback.eventKey
        ) {
          this.dispatchAction(callback.action)
        }
        break
      case EventListenerState.KEY_UP:
        if (
          callback.eventType === EventListenerState.KEY_UP &&
          event.key === callback.eventKey
        ) {
          this.dispatchAction(callback.action)
        }
        break
      default:
        console.warn(`Unhandled keyboard event type: ${event.type}`)
    }
  }

  /**
   * Método para manipular eventos de mouse.
   * @param {MouseEvent} event - O evento de mouse a ser manipulado.
   * @param {EventPayload} callback - O callback associado ao evento de mouse.
   * @return {any} O resultado da ação despachada.
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

  /**
   * Despacha a ação associada ao evento.
   * @param {(...args: any[]) => any} callback - A função callback a ser executada.
   * @returns {any} O resultado da execução do callback.
   */
  private dispatchAction(callback: (...args: any[]) => any): any {
    return callback()
  }
}
