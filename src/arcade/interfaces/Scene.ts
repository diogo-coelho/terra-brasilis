import { SceneManager } from '@/arcade/types'
export default interface Scene {
  onEnter?(): void

  onExit?(): void

  update?(
    canvas?: HTMLCanvasElement,
    context?: CanvasRenderingContext2D,
    deltaTime?: number
  ): void

  drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    deltaTime: number
  ): void

  handleKeyboardEvent?(event: KeyboardEvent, sceneManager: SceneManager): void

  handleMouseEvent?(event: MouseEvent, sceneManager: SceneManager): void
}
