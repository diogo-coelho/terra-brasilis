import ButtonStandard from './ButtonStandard'
import { EventListenerState, PositionState } from '../enums'
import { ButtonStandardGroupConfig, Callback, SceneManager } from '../types'

/**
 * Gerenciador de grupo de botões com renderização e posicionamento automáticos.
 *
 * @class ButtonStandardGroup
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * A classe ButtonStandardGroup implementa o padrão Composite para gerenciar
 * múltiplos botões como uma única unidade, oferecendo:
 * - Gerenciamento centralizado de configurações visuais (cores, tamanhos)
 * - Posicionamento automático com espaçamento configurvel
 * - Alinhamento vertical ou horizontal
 * - Propagação de eventos de mouse para todos os botões
 * - Cálculos automáticos de centralização
 *
 * Todos os botões adicionados ao grupo herdam automaticamente as configurações
 * definidas via setButtonsConfigurations(), garantindo consistência visual.
 *
 * O grupo calcula automaticamente o posicionamento de cada botão baseado em:
 * - Alinhamento configurado (vertical/horizontal)
 * - Espaçamento entre botões
 * - Posição inicial do grupo
 *
 * @remarks
 * Ideal para menus, listas de opções e qualquer interface que necessite
 * múltiplos botões organizados de forma consistente.
 *
 * @example
 * ```typescript
 * const buttonGroup = new ButtonStandardGroup(0, 150, 20);
 *
 * buttonGroup.setButtonsConfigurations({
 *   width: 200,
 *   height: 50,
 *   backgroundColor: '#4CAF50',
 *   backgroundColorOnHover: '#45a049',
 *   color: '#FFFFFF',
 *   colorOnHover: '#E0E0E0'
 * });
 *
 * buttonGroup.addButton(new StartButton('Iniciar'));
 * buttonGroup.addButton(new ExitButton('Sair'));
 *
 * buttonGroup.alignement = PositionState.VERTICAL;
 * buttonGroup.renderButtons(canvas, context);
 * ```
 *
 * @see ButtonStandard
 * @see PositionState
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
   * Adiciona um botão ao grupo aplicando automaticamente as configurações visuais.
   *
   * @param {ButtonStandard} button - Botão a ser adicionado ao grupo
   *
   * @returns {void}
   *
   * @remarks
   * Ao adicionar um botão, suas propriedades visuais são automaticamente sobrescritas
   * pelas configurações do grupo:
   * - width e height
   * - backgroundColor e backgroundColorOnHover
   * - color e colorOnHover
   *
   * Isso garante consistência visual entre todos os botões do grupo.
   *
   * @example
   * ```typescript
   * const button = new NewGameButton('Novo Jogo');
   * buttonGroup.addButton(button);
   * ```
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
   * Renderiza todos os botões do grupo com posicionamento automático.
   *
   * @param {HTMLCanvasElement} canvas - Canvas onde os botões serão desenhados
   * @param {CanvasRenderingContext2D} context - Contexto de renderização 2D
   *
   * @returns {void}
   *
   * @remarks
   * Para cada botão no grupo:
   * 1. Calcula a posição baseada no alinhamento (vertical/horizontal)
   * 2. Aplica espaçamento entre botões (exceto o primeiro)
   * 3. Define a posição do botão
   * 4. Renderiza o botão
   *
   * **Alinhamento Vertical:**
   * - X: Posição inicial do grupo
   * - Y: Índice * altura + espaçamento + posição inicial
   *
   * **Alinhamento Horizontal:**
   * - X: Índice * largura + espaçamento + posição inicial
   * - Y: Posição inicial do grupo
   *
   * @example
   * ```typescript
   * buttonGroup.renderButtons(canvas, context);
   * ```
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
   * Propaga eventos de mouse para todos os botões do grupo.
   *
   * @param {MouseEvent} event - Evento de mouse a ser processado
   * @param {SceneManager} scene - Gerenciador de cenas para navegação
   * @param {Callback} [sceneCallback] - Callback opcional executado após evento
   *
   * @returns {void}
   *
   * @remarks
   * Distribui eventos de mouse para cada botão do grupo baseado no tipo:
   *
   * **MOUSE_MOVE:**
   * - Chama handleMouseMove de cada botão
   * - Atualiza estados de hover
   *
   * **CLICK:**
   * - Chama handleOnClick de cada botão
   * - Executa onClick se o botão foi clicado
   *
   * Todos os botões recebem o evento, mas apenas aqueles sob o cursor
   * responderão efetivamente.
   *
   * @example
   * ```typescript
   * buttonGroup.handleMouseEvent(event, sceneManager);
   * ```
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
