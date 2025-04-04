import { Callback, SceneConfig } from '../types/types'

abstract class Scene {
  abstract drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void

  abstract handleKeyboardEvent(configs: SceneConfig): void
}

export default Scene
