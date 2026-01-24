import { Arcade } from '@/arcade'
import ButtonEvent from '@/arcade/interfaces/ButtonEvent'
import { ButtonClickHandle } from '@/arcade/types'

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
 * @param {number} width - A largura do botão.
 * @param {number} height - A altura do botão.
 * @param {string} label - O rótulo do botão.
 * @param {string} backgroundColor - A cor de fundo do botão.
 * @param {string} backgroundColorOnHover - A cor de fundo do botão ao passar o mouse.
 * @param {string} color - A cor do texto do botão.
 * @param {string} colorOnHover - A cor do texto do botão ao passar o mouse.
 *
 * @example
 * const continueButton = new ContinueGameButton(
 * 'Continue Game',
 * );
 */
export default class ContinueGameButton
  extends Arcade.Components.ButtonStandard
  implements ButtonEvent
{
  constructor(label: string) {
    super(0, 0, label)
  }

  public handleOnClick({ event, scene }: ButtonClickHandle): void {
    if (!event) return
    if (!this.isMouseOverButton(event.x as number, event.y as number)) return
    scene?.setCurrentScene(GameSceneState.INSERT_NAME)
  }
}
