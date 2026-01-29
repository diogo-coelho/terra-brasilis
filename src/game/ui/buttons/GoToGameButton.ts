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
  private _userName: string = ''

  constructor(label: string) {
    super(0, 0, label)
  }

  public set userName(name: string) {
    this._userName = name
  }

  public get userName(): string {
    return this._userName
  }

  /**
   * Método chamado ao clicar no botão.
   * @param {SceneManager} scene - Gerenciador de cenas
   */
  public onClick(scene: SceneManager): void {
    this.saveUserNameInDataBase().then(() => {
      scene?.setCurrentScene(GameSceneState.GAME)
    })
  }

  /**
   * Salva o nome de usuário no banco de dados.
   * @returns {Promise<void>} Promessa que resolve quando o nome é salvo
   */
  private saveUserNameInDataBase(): Promise<void> {
    return new Promise((resolve) => {
      fetch('/insert-username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: this._userName }),
      }).then(() => resolve())
    })
  }
}
