import ButtonStandard from './ButtonStandard'
import { EventListenerState, PositionState } from '../enums'
import { ButtonStandardGroupConfig, Callback, SceneManager } from '../types'

/**
 * A classe ButtonStandardGroup gerencia um grupo de botões padrão (ButtonStandard).
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * A classe ButtonStandardGroup é responsável por gerenciar um grupo de botões padrão (ButtonStandard).
 * Ela permite adicionar botões ao grupo, renderizá-los em um canvas HTML e manipular eventos de mouse,
 * como movimento do mouse e cliques, para interagir com os botões.
 *
 * @class ButtonStandardGroup
 *
 * @example
 * const buttonGroup = new ButtonStandardGroup(200, 20);
 *
 * @see ButtonStandard
 * @see EventListenerState
 *
 *
 */
export default class ButtonStandardGroup {
  private _buttons: ButtonStandard[] = []
  private _spacing: number
  private _alignement: PositionState = PositionState.VERTICAL
  private _canvas!: HTMLCanvasElement
  private _buttonsHeight!: number
  private _buttonsWidth!: number
  private _backgroundColor!: string
  private _color!: string
  private _backgroundColorOnHover!: string
  private _colorOnHover!: string
  private _positionX: number = 0
  private _positionY: number = 0

  constructor(positionX: number, positionY: number, spacing: number = 20) {
    this._positionX = positionX
    this._positionY = positionY
    this._spacing = spacing
    this._canvas = window.document.querySelector('canvas') as HTMLCanvasElement
  }

  public get buttons(): ButtonStandard[] {
    return this._buttons
  }

  public addButton(button: ButtonStandard): void {
    button.width = this._buttonsWidth
    button.height = this._buttonsHeight
    button.backgroundColor = this._backgroundColor
    button.color = this._color
    button.backgroundColorOnHover = this._backgroundColorOnHover
    button.colorOnHover = this._colorOnHover

    this._buttons.push(button)
  }

  public clearButtons(): void {
    this._buttons = []
  }

  public set positionX(value: number) {
    this._positionX = value
  }

  public set positionY(value: number) {
    this._positionY = value
  }

  public set alignement(value: PositionState) {
    this._alignement = value
  }

  public get alignement(): PositionState {
    return this._alignement
  }

  public get spacing(): number {
    return this._spacing
  }

  /**
   * Define as configurações padrão para todos os botões do grupo.
   * @param {ButtonStandardGroupConfig} config - As configurações padrão para os botões.
   * @returns {void}
   */
  public setButtonsConfigurations({
    width,
    height,
    backgroundColor,
    color,
    backgroundColorOnHover,
    colorOnHover,
  }: ButtonStandardGroupConfig): void {
    this._buttonsWidth = width
    this._buttonsHeight = height
    this._backgroundColor = backgroundColor
    this._color = color
    this._backgroundColorOnHover = backgroundColorOnHover
    this._colorOnHover = colorOnHover
  }

  /**
   * Renderiza os botões no canvas.
   * @param {HTMLCanvasElement} canvas - O elemento canvas onde os botões serão desenhados.
   * @param {CanvasRenderingContext2D} context - O contexto de renderização do canvas.
   */
  public renderButtons(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    this._buttons.forEach((button, i) => {
      const margin = i === 0 ? 0 : this._spacing

      button.setPosition({
        canvas,
        align: this._alignement,
        y:
          this._alignement === PositionState.VERTICAL
            ? i * button.height + margin + this._positionY
            : this._positionY,
        x:
          this._alignement === PositionState.HORIZONTAL
            ? i * button.width + margin + this._positionX
            : this._positionX,
      })
      button.renderButton(context)
    })
  }

  /**
   * Calcula a posição X para centralizar os botões no canvas.
   * @param {HTMLCanvasElement} canvas - O elemento canvas onde os botões estão desenhados.
   * @returns {number} - A posição X centralizada.
   */
  public getCenteredPositionX(canvas: HTMLCanvasElement): number {
    const totalWidth = this._buttons[0].width * this._buttons.length
    const totalSpacing = this._spacing * (this._buttons.length - 1)
    return canvas.width / 2 - (totalWidth + totalSpacing) / 2
  }

  /**
   * Calcula a posição Y para centralizar os botões no canvas.
   * @param {HTMLCanvasElement} canvas - O elemento canvas onde os botões estão desenhados.
   * @returns {number} - A posição Y centralizada.
   */
  public getCenteredPositionY(canvas: HTMLCanvasElement): number {
    const totalHeight = this._buttons[0].height * this._buttons.length
    const totalSpacing = this._spacing * (this._buttons.length - 1)
    return canvas.height / 2 - (totalHeight + totalSpacing) / 2
  }

  /**
   * Manipula eventos de mouse para os botões.
   * @param {MouseEvent} event - O evento de mouse a ser manipulado.
   * @param {Callback} [sceneCallback] - Callback opcional para a cena.
   * @returns {void}
   */
  public handleMouseEvent(
    event: MouseEvent,
    scene: SceneManager,
    sceneCallback?: Callback
  ): void {
    switch (event.type) {
      case EventListenerState.MOUSE_MOVE:
        this._buttons.forEach((btn) => {
          btn.handleMouseMove(event, sceneCallback)
        })
        break
      case EventListenerState.CLICK:
        this._buttons.forEach((btn) => {
          btn.handleOnClick({
            event,
            scene,
            callback: () => btn.onClick(scene),
          })
        })
    }
  }
}
