import { Game, SceneManager } from '../core'
import { EventListenerState } from '../enums'

const globalEvents = {
  resize: (engine: Game, scenes: SceneManager): void => {
    window.addEventListener(
      EventListenerState.RESIZE,
      () => {
        engine.resize()
        engine.main(scenes.currentScene)
      },
      false
    )
  },
  keyboard: (sceneManager: SceneManager): void => {
    window.addEventListener(
      EventListenerState.KEY_UP,
      (event: KeyboardEvent) => {
        sceneManager.handleKeyboardEvent(event)
      },
      false
    )
  },
}

export default globalEvents
