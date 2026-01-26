import { Arcade } from '@/arcade'
import { SceneManager } from '@/arcade/core'

import GameSceneState from '@/game/enums/GameSceneState'

/**
 * Classe que representa o botão de ir para o jogo.
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe GoToGameButton é uma implementação concreta
 * da classe ButtonStandard, representando o botão
 * de ir para o jogo. Ela define o comportamento
 * específico ao clicar no botão, que é
 * navegar para a cena de novo jogo.
 *
 * @constructor
 * @param {string} label - O rótulo do botão.
 *
 * @example
 * const goToGameButton = new GoToGameButton(
 * 'Go to Game',
 * );
 */
export default class GoToGameButton extends Arcade.Components.ButtonStandard {
  constructor(label: string) {
    super(0, 0, label)
  }

  public onClick(scene: SceneManager): void {
    scene?.setCurrentScene(GameSceneState.NEW_GAME)
  }
}
