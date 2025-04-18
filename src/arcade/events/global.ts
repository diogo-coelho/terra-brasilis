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
  keyboard: {
    keyUp: (sceneManager: SceneManager): void => {
      window.addEventListener(
        EventListenerState.KEY_UP,
        (event: KeyboardEvent) => {
          sceneManager.handleKeyboardEvent(event)
        },
        false
      )
    },
    keydown: (sceneManager: SceneManager): void => {
      window.addEventListener(
        EventListenerState.KEY_DOWN,
        (event: KeyboardEvent) => {
          sceneManager.handleKeyboardEvent(event)
        },
        false
      )
    }
  },
  mouse: {
    mouseMove: (sceneManager: SceneManager): void => {
      window.addEventListener(
        EventListenerState.MOUSE_MOVE,
        (event: MouseEvent) => {
          sceneManager.handleMouseEvent(event)
        },
        false
      )
    },
    click: (sceneManager: SceneManager): void => {
      window.addEventListener(
        EventListenerState.CLICK,
        (event: MouseEvent) => {
          sceneManager.handleMouseEvent(event)
        },
        false
      )
    },
  },
}

export default globalEvents
