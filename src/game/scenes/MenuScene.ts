import { SceneEvent } from '@/arcade/core'
import Scene from '@/arcade/interfaces/Scene'
import { ButtonStandard } from '@/arcade/components'

import { ContinueGameButton, NewGameButton } from '../components/buttons'

/**
 * A classe MenuScene representa a cena do menu principal do jogo.
 * Ela implementa a interface Scene e estende a classe SceneEvent.
 * Esta cena é responsável por exibir o título do jogo e pode ser expandida
 * no futuro para incluir opções de menu, configurações e outras funcionalidades relacionadas
 * ao menu principal.
 *
 * @class MenuScene
 * @extends SceneEvent
 * @implements Scene
 *
 * @example
 * const menuScene = new MenuScene();
 *
 * @see Scene
 *
 */
export default class MenuScene extends SceneEvent implements Scene {
  private _title: string
  private _buttons: ButtonStandard[] = []

  constructor() {
    super()
    this._title = 'Menu'
    this.initializeButtons()
  }

  public drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    context.fillStyle = '#CCCCCC'
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.fillStyle = '#000000'
    context.font = 'bold 16px Arial, sans-serif'

    const titleSize = context.measureText(this._title)
    const xCoord = canvas.width / 2 - titleSize.width / 2

    context.fillText(this._title, xCoord, 50)

    const initialPosition = 80

    this._buttons.forEach((btn, i) => {
      const margin = i === 0 ? 0 : 20
      btn.setPosition({
        canvas,
        align: 'vertical',
        y: i * btn.height + margin + initialPosition,
      })
      btn.renderButton(context)
    })
  }

  private initializeButtons() {
    this._buttons = []
    const newGameButton = new NewGameButton(
      150,
      80,
      'Novo jogo',
      '"Jersey 15"',
      20,
      'center',
      'middle',
      '#008000',
      '#016501',
      'white',
      'white'
    )
    this._buttons.push(newGameButton)
    const continueGameButton = new ContinueGameButton(
      150,
      80,
      'Continuar jogo',
      '"Jersey 15"',
      20,
      'center',
      'middle',
      '#008000',
      '#016501',
      'white',
      'white'
    )
    this._buttons.push(continueGameButton)
  }
}
