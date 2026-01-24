import { Arcade } from '@/arcade'
import ButtonEvent from '@/arcade/interfaces/ButtonEvent'
import { ButtonClickHandle } from '@/arcade/types'

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
 * @param {number} width - A largura do botão.
 * @param {number} height - A altura do botão.
 * @param {string} label - O rótulo do botão.
 * @param {string} backgroundColor - A cor de fundo do botão.
 * @param {string} backgroundColorOnHover - A cor de fundo do botão ao passar o mouse.
 * @param {string} color - A cor do texto do botão.
 * @param {string} colorOnHover - A cor do texto do botão ao passar o mouse.
 *
 * @example
 * const newGameButton = new NewGameButton(
 * 'New Game',
 * );
 */
export default class NewGameButton
  extends Arcade.Components.ButtonStandard
  implements ButtonEvent
{
  constructor(
    label: string,
  ) {
    super(0, 0, label)
  }

  public handleOnClick({ event, scene }: ButtonClickHandle): void {
    if (!this.isMouseOverButton(event?.x as number, event?.y as number)) return
    scene?.setCurrentScene(GameSceneState.INSERT_NAME)
  }
}
