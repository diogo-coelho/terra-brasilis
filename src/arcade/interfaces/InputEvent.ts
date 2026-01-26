import { Callback } from '../types'

export default interface InputEvent {
  handleMouseMove(
    event: MouseEvent,
    callback?: Callback
  ): void

  handleMouseClick(
    event: MouseEvent,
    callback?: Callback
  ): void

  handleKeyboardEvent(event: KeyboardEvent, callback?: Callback): void
}
