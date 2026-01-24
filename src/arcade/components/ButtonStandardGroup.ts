import ButtonStandard from './ButtonStandard'
import { EventListenerState } from '../enums'
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
  private _initialPosition: number
  private _spacing: number
  private _alignement: 'horizontal' | 'vertical' = 'vertical'
  private _canvas!: HTMLCanvasElement
  private _buttonsHeight!: number
  private _buttonsWidth!: number
  private _backgroundColor!: string
  private _color!: string
  private _backgroundColorOnHover!: string
  private _colorOnHover!: string

  constructor(initialPosition: number = 200, spacing: number = 20) {
    this._initialPosition = initialPosition
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

  public set alignement(value: 'horizontal' | 'vertical') {
    this._alignement = value
  }

  public get alignement(): 'horizontal' | 'vertical' {
    return this._alignement
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
        y: i * button.height + margin + this._initialPosition,
      })
      button.renderButton(context)
    })
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
    const canvas = this._canvas
    if (!canvas) return

    switch (event.type) {
      case EventListenerState.MOUSE_MOVE:
        this._buttons.forEach((btn) => {
          btn.handleMouseMove(event, canvas, sceneCallback)
        })
        this.setCursorWhenAnyButtonIsHovered(event, canvas)
        break
      case EventListenerState.CLICK:
        this._buttons.forEach((btn) => {
          btn.handleOnClick({ event, scene, callback: sceneCallback })
        })
    }
  }

  /**
   * Define o cursor do mouse quando algum botão está sendo hover.
   * @private
   * @param {HTMLCanvasElement} canvas - O elemento canvas onde os botões estão desenhados.
   */
  private setCursorWhenAnyButtonIsHovered(
    event: MouseEvent,
    canvas: HTMLCanvasElement
  ): void {
    const anyButtonIsHovered = this._buttons.some((btn) =>
      btn.isMouseOverButton(event.x, event.y)
    )
    if (anyButtonIsHovered) {
      canvas.style.cursor = 'pointer'
    } else {
      canvas.style.cursor = 'default'
    }
  }
}
