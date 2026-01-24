import { Arcade } from '@/arcade'
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
 * @param {string} font - A fonte do texto do botão.
 * @param {number} fontSize - O tamanho da fonte do texto do botão.
 * @param {CanvasTextAlign} textAlign - O alinhamento do texto do botão.
 * @param {CanvasTextBaseline} textBaseline - A linha de base do texto do botão.
 * @param {string} backgroundColor - A cor de fundo do botão.
 * @param {string} backgroundColorOnHover - A cor de fundo do botão ao passar o mouse.
 * @param {string} color - A cor do texto do botão.
 * @param {string} colorOnHover - A cor do texto do botão ao passar o mouse.
 *
 * @example
 * const continueButton = new ContinueGameButton(
 *  200,
 *  50,
 * 'Continue Game',
 * 'Arial',
 *  20,
 * 'center',
 * 'middle',
 * '#000000',
 * '#333333',
 * '#FFFFFF',
 * '#FFFF00'
 * );
 */
export default class ContinueGameButton
  extends Arcade.Components.ButtonStandard
{
  constructor(
    width: number,
    height: number,
    label: string,
    font: string,
    fontSize: number,
    textAlign: CanvasTextAlign,
    textBaseline: CanvasTextBaseline,
    backgroundColor: string,
    backgroundColorOnHover: string,
    color: string,
    colorOnHover: string
  ) {
    super(width, height, label, font, fontSize, textAlign, textBaseline)

    this.backgroundColor = backgroundColor
    this.backgroundColorOnHover = backgroundColorOnHover
    this.color = color
    this.colorOnHover = colorOnHover
  }

  public handleOnClick({ event, scene }: ButtonClickHandle): void {
    if (!event) return
    if (!this.isMouseOverButton(event.x as number, event.y as number)) return
    scene?.setCurrentScene(GameSceneState.INSERT_NAME)
  }
}
