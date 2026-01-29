import { Frame, Game, SceneManager, Sprite, Tile, Timer } from './core'
import { GlobalEvents } from './events'
import { Sound } from './sounds'
import {
  GameObject,
  ButtonStandard,
  ButtonStandardGroup,
  InputStandard,
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
  SceneManager: SceneManager,
  Sprite: Sprite,
  Tile: Tile,
  Timer: Timer,
  Frame: Frame,
  /** events */
  GlobalEvents: GlobalEvents,
  /** sounds */
  Sound: Sound,
  /** images */
  Image: Image,
  /** components */
  Components: {
    GameObject: GameObject,
    ButtonStandard: ButtonStandard,
    ButtonStandardGroup: ButtonStandardGroup,
    InputStandard: InputStandard,
  },
}
