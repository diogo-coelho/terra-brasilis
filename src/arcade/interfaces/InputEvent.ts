import { Callback } from '../types'

export default interface InputEvent {
  handleMouseMove(
    event: MouseEvent,
    canvas: HTMLCanvasElement,
    callback?: Callback
  ): void

  handleMouseClick(
    event: MouseEvent,
    canvas: HTMLCanvasElement,
    callback?: Callback
  ): void

  handleKeyboardEvent(event: KeyboardEvent, callback?: Callback): void
}
