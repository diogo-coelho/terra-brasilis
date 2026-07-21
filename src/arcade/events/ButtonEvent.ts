import { ButtonClickHandle, Callback } from '../types'
export default interface ButtonEvent {
  isMouseOverButton(xCoord: number, yCoord: number): boolean

  handleMouseMove(event: MouseEvent, callback?: Callback): void

  applyHoverOnButton(event: MouseEvent, context: HTMLCanvasElement): void
}
