import { Game, Scene, SceneManager, Sprite, Text, Timer } from './core'
import { Button, StandardButton } from './components'
import { IsometricTileMap } from './system'

import { EventListenerState, KeyCodeState } from './enums'

import { globalEvents } from './events'

import {
  Callback,
  NamedScene,
  ButtonColorOnHover,
  ButtonClickHandle,
} from './types/types'

const Arcade = {
  Game,
  Scene,
  SceneManager,
  Sprite,
  Text,
  Timer,
  /** system */
  IsometricTileMap,
  /** components */
  Button,
  StandardButton,
}

export { EventListenerState, KeyCodeState, globalEvents }

export type {
  Game,
  Scene,
  SceneManager,
  NamedScene,
  Callback,
  Sprite,
  Text,
  Timer,
  Button,
  StandardButton,
  ButtonColorOnHover,
  ButtonClickHandle,
}

export default Arcade
