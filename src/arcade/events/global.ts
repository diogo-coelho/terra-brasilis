import { Game, SceneManager } from "../core"
import { EventListenerState, KeyCodeState } from "../enums"
import { Callback } from "../types/types"

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
  keyboardEvents: (callback: Callback): void => {
    window.addEventListener(
      EventListenerState.KEY_UP,
      () => callback()
    )
  }
}

export default globalEvents