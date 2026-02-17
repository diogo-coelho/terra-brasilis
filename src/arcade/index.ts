import {
  Game,
  GameObject,
  GameSession,
  SceneManager,
  Sprite,
  Tile,
  TileMap,
  Timer,
  GameCalendar,
  Scenario,
  ScenarioMap,
  Unit,
  Camera,
} from './core'
import { GlobalEvents } from './events'
import { Sound } from './sounds'
import {
  Button,
  Input,
  Text,
  ButtonStandard,
  ButtonStandardGroup,
  InputStandard,
  TextStandard,
} from './ui'
export * as core from './core'
export * as types from './types'
export * as interfaces from './interfaces'
export * as ui from './ui'
export * as enums from './enums'
export * as events from './events'
export * as sounds from './sounds'
export * as images from './images'

export const Arcade = {
  Game: Game,
  GameObject: GameObject,
  GameSession: GameSession,
  SceneManager: SceneManager,
  Sprite: Sprite,
  Timer: Timer,
  GameCalendar: GameCalendar,
  Scenario: Scenario,
  ScenarioMap: ScenarioMap,
  Tile: Tile,
  TileMap: TileMap,
  Unit: Unit,
  GlobalEvents: GlobalEvents,
  Sound: Sound,
  Image: Image,
  Camera: Camera,
  Components: {
    Button: Button,
    Input: Input,
    Text: Text,
    ButtonStandard: ButtonStandard,
    ButtonStandardGroup: ButtonStandardGroup,
    InputStandard: InputStandard,
    TextStandard: TextStandard,
  },
}
