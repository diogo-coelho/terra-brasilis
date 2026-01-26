import { Arcade } from '@/arcade'
import { SceneManager } from '@/arcade/types'

import { GameSceneState } from '@/game/enums'

/**
 * Classe que representa o botão de continuar jogo.
 * Estende a classe ButtonStandard e implementa o método de clique específico.
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe ContinueGameButton é uma implementação concreta
 * da classe ButtonStandard, representando o botão
 * de continuar jogo. Ela define o comportamento
 * específico ao clicar no botão, que é
 * navegar para a cena de inserção de nome.
 *
 * @constructor
 * @param {string} label - O rótulo do botão.
 *
 * @example
 * const continueButton = new ContinueGameButton(
 * 'Continue Game',
 * );
 */
export default class ContinueGameButton
  extends Arcade.Components.ButtonStandard
{
  constructor(label: string) {
    super(0, 0, label)
  }

  /**
   * Método chamado ao clicar no botão.
   * @param {SceneManager} scene - O gerenciador de cenas.
   */
  public onClick(scene: SceneManager): void {
    scene?.setCurrentScene(GameSceneState.LOADED_GAME)
  }
}
