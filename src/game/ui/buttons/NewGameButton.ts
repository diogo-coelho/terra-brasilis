import { Arcade } from '@/arcade'
import { SceneManager } from '@/arcade/core'

import GameSceneState from '@/game/enums/GameSceneState'

/**
 * Botão para iniciar novo jogo.
 *
 * @class NewGameButton
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Botão que inicia uma nova partida, levando o jogador à tela
 * de inserção de nome do Governador-Geral.
 *
 * @extends Arcade.Components.ButtonStandard
 *
 * @example
 * ```typescript
 * const newGameBtn = new NewGameButton('Novo Jogo');
 * ```
 *
 * @see ButtonStandard
 * @see GameSceneState
 */
export default class NewGameButton extends Arcade.Components.ButtonStandard {
  constructor(label: string) {
    super(0, 0, label)
  }

  /**
   * Ação executada ao clicar no botão.
   *
   * @param {SceneManager} scene - Gerenciador de cenas
   *
   * @remarks
   * Redireciona para a cena de inserção de nome.
   */
  public onClick(scene: SceneManager): void {
    scene?.setCurrentScene(GameSceneState.INSERT_NAME)
  }
}
