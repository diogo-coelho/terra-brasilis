import { SceneEvent } from '@/arcade/core'
import Scene from '@/arcade/interfaces/Scene'

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

  constructor() {
    super()
    this._title = 'Menu Principal'
  }

  public drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    context.fillStyle = '#000000'
    context.font = 'bold 40px Arial, sans-serif'

    const titleSize = context.measureText(this._title)
    let xCoord = canvas.width / 2 - titleSize.width / 2

    context.fillText(this._title, xCoord, canvas.height / 2)

    context.fillStyle = '#FF0000'
    context.font = '20px Arial, sans-serif'
  }
}
