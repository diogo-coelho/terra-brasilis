import { ButtonClickHandle, Callback } from '../types'

/**
 * Interface que define os eventos de um botão no jogo.
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A interface ButtonEvent define o contrato para
 * qualquer botão que será utilizado no jogo,
 * garantindo que todos os botões implementem
 * os métodos de interação com o mouse.
 *
 */
export default interface ButtonEvent {
  isMouseOverButton(xCoord: number, yCoord: number): boolean

  handleMouseMove(
    event: MouseEvent,
    callback?: Callback
  ): void

  applyHoverOnButton(event: MouseEvent, context: HTMLCanvasElement): void
}
