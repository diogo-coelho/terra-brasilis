import { Game, SceneManager } from './core'
import { GlobalEvents } from './events'

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

export const Arcade = {
  Game: Game,
  SceneManager: SceneManager,
  /** events */
  GlobalEvents: GlobalEvents,
}
