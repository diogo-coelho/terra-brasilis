import {
  Game,
  GameObject,
  GameSession,
  SceneManager,
  Sprite,
  Tile,
  TileMap,
  Timer,
  Scenario,
  ScenarioMap,
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

/**
 * Módulo principal do Arcade, que agrupa as principais classes do motor de jogo.
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * O módulo Arcade é o ponto de entrada para o motor de jogo,
 * fornecendo acesso às classes principais, como Game e SceneManager.
 *
 */
export * as core from './core'
export * as types from './types'
export * as interfaces from './interfaces'
export * as ui from './ui'
export * as enums from './enums'
export * as events from './events'
export * as sounds from './sounds'
export * as images from './images'

export const Arcade = {
  /** core */
  Game: Game,
  GameObject: GameObject,
  GameSession: GameSession,
  SceneManager: SceneManager,
  Sprite: Sprite,
  Tile: Tile,
  TileMap: TileMap,
  Timer: Timer,
  Scenario: Scenario,
  ScenarioMap: ScenarioMap,
  /** events */
  GlobalEvents: GlobalEvents,
  /** sounds */
  Sound: Sound,
  /** images */
  Image: Image,
  /** components ui */
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
