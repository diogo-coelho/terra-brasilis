import ButtonStandard from './ButtonStandard'
import { EventListenerState, PositionState } from '../enums'
import { ButtonStandardGroupConfig, Callback, SceneManager } from '../types'

/**
 * Grupo de botões padrão com layout automático.
 *
 * @class ButtonStandardGroup
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Classe responsável por gerenciar um conjunto de botões com layout
 * automático (vertical ou horizontal), aplicando configurações
 * uniformes de estilo e espaçamento.
 *
 * @remarks
 * - Facilita a criação de menus com múltiplos botões
 * - Calcula automaticamente posições baseado no alinhamento
 * - Aplica configurações de estilo uniformemente a todos os botões
 *
 * @example
 * ```typescript
 * const menu = new ButtonStandardGroup(100, 200, 20);
 * menu.setButtonsConfigurations({
 *   width: 200, height: 50,
 *   backgroundColor: '#333',
 *   color: '#fff'
 * });
 * menu.addButton(new ButtonStandard(0, 0, 'Iniciar'));
 * menu.addButton(new ButtonStandard(0, 0, 'Opções'));
 * menu.renderButtons(canvas, context);
 * ```
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

  /**
   * Adiciona um botão ao grupo.
   *
   * @param {ButtonStandard} button - Botão a ser adicionado
   *
   * @remarks
   * Aplica automaticamente as configurações do grupo ao botão.
   */
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
   * Define as configurações visuais dos botões do grupo.
   *
   * @param {ButtonStandardGroupConfig} config - Configurações de estilo
   * @param {number} config.width - Largura dos botões
   * @param {number} config.height - Altura dos botões
   * @param {string} config.backgroundColor - Cor de fundo padrão
   * @param {string} config.color - Cor do texto padrão
   * @param {string} config.backgroundColorOnHover - Cor de fundo ao passar o mouse
   * @param {string} config.colorOnHover - Cor do texto ao passar o mouse
   *
   * @remarks
   * Deve ser chamado antes de addButton() para aplicar as configurações.
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
   * Renderiza todos os botões do grupo.
   *
   * @param {HTMLCanvasElement} canvas - Canvas de referência
   * @param {CanvasRenderingContext2D} context - Contexto de renderização
   *
   * @remarks
   * Posiciona e renderiza cada botão de acordo com o alinhamento configurado.
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
   * Calcula a posição X para centralizar o grupo horizontalmente.
   *
   * @param {HTMLCanvasElement} canvas - Canvas de referência
   * @returns {number} Posição X centralizada
   */
  public getCenteredPositionX(canvas: HTMLCanvasElement): number {
    const totalWidth = this._buttons[0].width * this._buttons.length
    const totalSpacing = this._spacing * (this._buttons.length - 1)
    return canvas.width / 2 - (totalWidth + totalSpacing) / 2
  }

  /**
   * Calcula a posição Y para centralizar o grupo verticalmente.
   *
   * @param {HTMLCanvasElement} canvas - Canvas de referência
   * @returns {number} Posição Y centralizada
   */
  public getCenteredPositionY(canvas: HTMLCanvasElement): number {
    const totalHeight = this._buttons[0].height * this._buttons.length
    const totalSpacing = this._spacing * (this._buttons.length - 1)
    return canvas.height / 2 - (totalHeight + totalSpacing) / 2
  }

  /**
   * Manipula eventos de mouse para todos os botões do grupo.
   *
   * @param {MouseEvent} event - Evento de mouse
   * @param {SceneManager} scene - Gerenciador de cenas
   * @param {Callback} [sceneCallback] - Callback opcional da cena
   *
   * @remarks
   * Propaga eventos de movimento e click para todos os botões.
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
