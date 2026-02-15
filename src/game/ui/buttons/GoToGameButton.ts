import { Arcade } from '@/arcade'
import { SceneManager } from '@/arcade/core'

import GameSceneState from '@/game/enums/GameSceneState'

/**
 * Botão para iniciar o jogo após inserir nome.
 *
 * @class GoToGameButton
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Botão que salva o nome do jogador no banco de dados e inicia o jogo.
 * Responsável por fazer a transição da tela de inserção de nome
 * para a cena principal do jogo.
 *
 * @extends Arcade.Components.ButtonStandard
 *
 * @remarks
 * Realiza uma requisição HTTP POST para salvar o nome do usuário
 * antes de iniciar o jogo.
 *
 * @example
 * ```typescript
 * const goButton = new GoToGameButton('Iniciar Jogo');
 * goButton.userName = 'Dom Pedro II';
 * ```
 *
 * @see ButtonStandard
 * @see GameSceneState
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
   * Ação executada ao clicar no botão.
   *
   * @param {SceneManager} scene - Gerenciador de cenas
   *
   * @remarks
   * Salva o nome do usuário no banco de dados antes de iniciar o jogo.
   */
  public onClick(scene: SceneManager): void {
    this.saveUserNameInDataBase().then(() => {
      scene?.setCurrentScene(GameSceneState.GAME)
    })
  }

  /**
   * Salva o nome do usuário no banco de dados.
   *
   * @returns {Promise<void>} Promise que resolve quando o nome é salvo
   *
   * @remarks
   * Realiza uma requisição POST para o endpoint /insert-username.
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
