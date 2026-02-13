import { EventListenerState, KeyboardKey } from '@/arcade/enums'
import { EventPayload } from '@/arcade/types'

/**
 * Classe base que fornece implementação padrão para gerenciamento de eventos de cena.
 *
 * @class SceneEvent
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe SceneEvent implementa o padrão Template Method para processamento de eventos,
 * oferecendo uma camada de abstração para:
 * - Gerenciar eventos de teclado (KEY_DOWN, KEY_UP)
 * - Gerenciar eventos de mouse (CLICK, MOUSE_MOVE)
 * - Despachar ações associadas aos eventos de forma consistente
 * - Validar tipos de eventos e teclas pressionadas
 *
 * Esta classe deve ser estendida por todas as cenas que precisam responder a interações
 * do usuário. Ela encapsula a lógica de validação e despacho, permitindo que as
 * subclasses foquem apenas na lógica específica de cada cena.
 *
 * @remarks
 * Utiliza o padrão Command para associar eventos a ações específicas através
 * do tipo EventPayload.
 *
 * @example
 * ```typescript
 * class MyScene extends SceneEvent implements Scene {
 *   public handleKeyboardEvent(event: KeyboardEvent, scene: SceneManager): void {
 *     this.onKeyboardEvent(event, {
 *       eventType: EventListenerState.KEY_DOWN,
 *       eventKey: KeyboardKey.ENTER,
 *       action: () => scene.setCurrentScene('nextScene')
 *     });
 *   }
 * }
 * ```
 *
 * @see EventPayload
 * @see EventListenerState
 * @see KeyboardKey
 */
export default class SceneEvent {
  /**
   * Processa eventos de teclado e despacha a ação correspondente quando as condições são atendidas.
   *
   * @param {KeyboardEvent} event - Evento nativo de teclado do navegador
   * @param {EventPayload} callback - Objeto contendo tipo de evento, tecla esperada e ação a executar
   *
   * @returns {any} Resultado da execução da ação, se disparada
   *
   * @remarks
   * Este método valida:
   * - Se o tipo do evento (KEY_DOWN ou KEY_UP) corresponde ao esperado no callback
   * - Se a tecla pressionada corresponde à tecla especificada ou se aceita qualquer tecla (KeyboardKey.ANY)
   *
   * Quando ambas as condições são satisfeitas, a ação é despachada imediatamente.
   * Eventos não reconhecidos geram um aviso no console.
   *
   * @example
   * ```typescript
   * this.onKeyboardEvent(event, {
   *   eventType: EventListenerState.KEY_DOWN,
   *   eventKey: KeyboardKey.ENTER,
   *   action: () => console.log('Enter pressionado')
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
   * Processa eventos de mouse e despacha a ação correspondente quando as condições são atendidas.
   *
   * @param {MouseEvent} event - Evento nativo de mouse do navegador
   * @param {EventPayload} callback - Objeto contendo tipo de evento e ação a executar
   *
   * @returns {any} Resultado da execução da ação, se disparada
   *
   * @remarks
   * Atualmente suporta apenas eventos do tipo CLICK. Valida se o tipo do evento
   * corresponde ao esperado no callback e, em caso positivo, despacha a ação associada.
   *
   * Eventos não reconhecidos geram um aviso no console para facilitar o debug.
   *
   * @example
   * ```typescript
   * this.onMouseEvent(event, {
   *   eventType: EventListenerState.CLICK,
   *   eventKey: KeyboardKey.ANY, // Não usado para mouse
   *   action: () => this.handleClick()
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

  /**
   * Executa a função callback associada a um evento validado.
   *
   * @private
   * @param {(...args: any[]) => any} callback - Função a ser executada
   *
   * @returns {any} Valor retornado pela execução do callback
   *
   * @remarks
   * Método privado responsável por invocar as ações associadas aos eventos.
   * Atua como ponto central de execução, facilitando extensões futuras como
   * logging, tratamento de erros ou middleware de eventos.
   */
  private dispatchAction(callback: (...args: any[]) => any): any {
    return callback()
  }
}
