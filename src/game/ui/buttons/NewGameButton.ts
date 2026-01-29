import { Arcade } from '@/arcade'
import { SceneManager } from '@/arcade/core'

import GameSceneState from '@/game/enums/GameSceneState'

/**
 * Botão especializado para iniciar um novo jogo navegando para cena de inserção de nome.
 *
 * @class NewGameButton
 * @extends ButtonStandard
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe NewGameButton é uma especialização de ButtonStandard que implementa
 * o comportamento específico de navegação para iniciar um novo jogo:
 * - Exibe label "Novo Jogo" (ou personalizado)
 * - Ao ser clicado, navega para InsertNameScene
 * - Herda todas as funcionalidades visuais de ButtonStandard
 * - Integra-se com o sistema de cenas do jogo
 * 
 * Este botão é tipicamente usado no menu principal e representa
 * o ponto de entrada para uma nova partida do jogo.
 * 
 * @example
 * ```typescript
 * const newGameBtn = new NewGameButton('Novo Jogo');
 * newGameBtn.backgroundColor = '#84310a';
 * newGameBtn.backgroundColorOnHover = '#692303';
 * buttonGroup.addButton(newGameBtn);
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
   * Método chamado ao clicar no botão.
   * @param {SceneManager} scene - O gerenciador de cenas.
   */
  public onClick(scene: SceneManager): void {
    scene?.setCurrentScene(GameSceneState.INSERT_NAME)
  }
}
