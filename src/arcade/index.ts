import { Game, Scene, SceneManager, Sprite, Text, Timer } from './core'
import { Button, StandardButton, InputBox, StandardInputBox } from './components'
import { IsometricTileMap } from './system'

import { EventListenerState, KeyCodeState } from './enums'

import { globalEvents } from './events'

import {
  Callback,
  NamedScene,
  ColorOnHover,
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
  InputBox,
  StandardInputBox,
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
  ColorOnHover,
  ButtonClickHandle,
  InputBox,
  StandardInputBox,
}

export default Arcade
