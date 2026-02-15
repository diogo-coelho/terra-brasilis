import { Arcade } from '@/arcade'
import { SceneManager } from '@/arcade/core'

import { GameSceneState } from '@/game/enums'

/**
 * Botão para retornar ao menu principal.
 *
 * @class BackToMenuButton
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Botão que permite ao jogador voltar ao menu principal do jogo
 * a partir de outras telas.
 *
 * @extends Arcade.Components.ButtonStandard
 *
 * @example
 * ```typescript
 * const backButton = new BackToMenuButton('Voltar');
 * ```
 *
 * @see ButtonStandard
 * @see GameSceneState
 */
export default class BackToMenuButton extends Arcade.Components.ButtonStandard {
  constructor(label: string) {
    super(0, 0, label)
  }

  /**
   * Ação executada ao clicar no botão.
   *
   * @param {SceneManager} scene - Gerenciador de cenas
   *
   * @remarks
   * Redireciona o jogador para a cena do menu principal.
   */
  public onClick(scene: SceneManager): void {
    scene?.setCurrentScene(GameSceneState.MAIN_MENU)
  }
}
