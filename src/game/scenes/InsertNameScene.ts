import { SceneEvent } from '@/arcade/core'
import { Scene } from '@/arcade/interfaces'
import { SceneManager } from '@/arcade/types'

export default class InsertNameScene extends SceneEvent implements Scene {
  drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    deltaTime: number
  ): void {
    throw new Error('Method not implemented.')
  }

  handleKeyboardEvent?(event: KeyboardEvent, sceneManager: SceneManager): void {
    throw new Error('Method not implemented.')
  }

  handleMouseEvent?(event: MouseEvent, sceneManager: SceneManager): void {
    throw new Error('Method not implemented.')
  }
}
