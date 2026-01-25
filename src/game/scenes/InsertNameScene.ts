import { SceneEvent } from '@/arcade/core'
import { Image } from '@/arcade/images'
import { Scene } from '@/arcade/interfaces'
import { SceneManager } from '@/arcade/types'

import backgroundImage from '@/arcade/assets/images/tb_insert_name_background.png'
import { InputStandard } from '@/arcade/components'
import { EventListenerState } from '@/arcade/enums'
import { GovernorGeneralNameInput } from '../components/inputs'

/**
 * Cena para inserção do nome do Governador-Geral.
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * A cena InsertNameScene é responsável por exibir a interface
 * para o jogador inserir o nome do Governador-Geral.
 * Ela apresenta um campo de entrada de texto
 * e uma imagem de fundo temática.
 *
 * @implements {Scene}
 *
 * @example
 * const insertNameScene = new InsertNameScene();
 * sceneManager.changeScene(insertNameScene);
 *
 */
export default class InsertNameScene extends SceneEvent implements Scene {
  private _title: string
  private _backgroundImage: Image
  private _input: InputStandard
  private _canvas: HTMLCanvasElement

  constructor() {
    super()
    this._title = 'Insira o nome do Governador-Geral:'
    this._input = new GovernorGeneralNameInput(450, 40)
    this._backgroundImage = new Image(backgroundImage)
    this._canvas = window.document.querySelector('canvas') as HTMLCanvasElement
  }

  public onEnter(): void {
    throw new Error('Method not implemented.')
  }

  public onExit(): void {
    throw new Error('Method not implemented.')
  }

  /**
   * Desenha a cena de inserção de nome.
   * @param {HTMLCanvasElement} canvas - O canvas onde a cena será desenhada.
   * @param {CanvasRenderingContext2D} context - O contexto de renderização do canvas.
   * @param {number} deltaTime - O tempo decorrido desde o último frame.
   * @returns {void}
   */
  public drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    deltaTime: number
  ): void {
    /** Ajusta a imagem de fundo para cobrir todo o canvas */
    if (!this._backgroundImage.isLoaded()) return
    this._backgroundImage.setImageAsCover(canvas)
    context.save()
    context.globalAlpha = 0.8
    /** Desenhando a imagem de fundo */
    context.drawImage(
      this._backgroundImage.image as CanvasImageSource,
      0,
      0,
      canvas.width,
      canvas.height
    )
    context.restore()

    /** Escreve a frase centralizada */
    context.fillStyle = '#FFFFFF'
    context.font = '30px "Jersey 15", sans-serif'
    context.textAlign = 'center'
    context.textBaseline = 'top'
    context.lineWidth = 3
    context.strokeStyle = '#2c0f0b'

    context.strokeText(this._title, canvas.width / 2, 130)
    context.fillText(this._title, canvas.width / 2, 130)

    /** Ajusta a posição do campo de entrada */
    this._input.setPosition({
      canvas,
      align: 'vertical',
      y: this._input.height + 150,
    })
    /** Renderiza o campo de entrada */
    this._input.renderInputBox(context)
  }

  /**
   * Manipula eventos de teclado.
   * @param event - O evento de teclado.
   * @param sceneManager - O gerenciador de cenas.
   */
  public handleKeyboardEvent?(
    event: KeyboardEvent,
    sceneManager: SceneManager
  ): void {
    switch (event.type) {
      case EventListenerState.KEY_DOWN:
        this._input.handleKeyboardEvent(event)
        break
    }
  }

  /**
   * Manipula eventos de mouse.
   * @param { MouseEvent } event - O evento de mouse.
   * @param { SceneManager } scene - O gerenciador de cenas.
   */
  public handleMouseEvent?(event: MouseEvent, scene: SceneManager): void {
    const canvas = this._canvas
    if (!canvas) return

    switch (event.type) {
      case EventListenerState.MOUSE_MOVE:
        this._input.handleMouseMove(event, canvas, () => {
          scene?.currentScene.drawScene(
            canvas,
            canvas.getContext('2d') as CanvasRenderingContext2D,
            0
          )
        })
        break
      case EventListenerState.CLICK:
        this._input.handleMouseClick(event, canvas)
        break
    }
  }
}
