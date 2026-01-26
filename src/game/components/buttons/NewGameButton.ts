import { Arcade } from '@/arcade'
import { SceneManager } from '@/arcade/core'

import GameSceneState from '@/game/enums/GameSceneState'

/**
 * Classe que representa o botão de novo jogo.
 * Estende a classe ButtonStandard e implementa o método de clique específico.
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe NewGameButton é uma implementação concreta
 * da classe ButtonStandard, representando o botão
 * de novo jogo. Ela define o comportamento
 * específico ao clicar no botão, que é
 * navegar para a cena de inserção de nome.
 *
 * @constructor
 * @param {string} label - O rótulo do botão.
 *
 * @example
 * const newGameButton = new NewGameButton(
 * 'New Game',
 * );
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
