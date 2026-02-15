import { Arcade } from '@/arcade'
import { SceneManager } from '@/arcade/types'

import { GameSceneState } from '@/game/enums'

/**
 * Botão para continuar jogo salvo.
 *
 * @class ContinueGameButton
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Botão que permite ao jogador continuar uma partida salva anteriormente.
 *
 * @extends Arcade.Components.ButtonStandard
 *
 * @example
 * ```typescript
 * const continueButton = new ContinueGameButton('Continuar');
 * ```
 *
 * @see ButtonStandard
 * @see GameSceneState
 */
export default class ContinueGameButton
  extends Arcade.Components.ButtonStandard
{
  constructor(label: string) {
    super(0, 0, label)
  }

  /**
   * Ação executada ao clicar no botão.
   *
   * @param {SceneManager} scene - Gerenciador de cenas
   *
   * @remarks
   * Carrega a cena de jogo salvo.
   */
  public onClick(scene: SceneManager): void {
    scene?.setCurrentScene(GameSceneState.LOADED_GAME)
  }
}
