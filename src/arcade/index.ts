import { Game, Scene, SceneManager } from './core'
import { EventListenerState, KeyCodeState } from './enums'
import { globalEvents } from './events'
import { Callback, NamedScene } from './types/types'

const Arcade = {
  Game,
  Scene,
  SceneManager,
}

export { 
  EventListenerState, 
  KeyCodeState,
  globalEvents,
}

export type {
  Game,
  Scene,
  SceneManager,
  NamedScene,
  Callback,
}

export default Arcade
