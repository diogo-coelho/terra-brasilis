import Input from './abstract/Input'
import { InputEvent } from '../interfaces'
import { AlignedPosition, Callback } from '../types'
import InputError from '../errors/InputError'
import { ErrorState, KeyCodeState, PositionState } from '../enums'
import { Sound } from '../sounds'
import { SoundError } from '../errors'

import inputScribbleSound from '../assets/sounds/sfx/input_scribble.wav'

/**
 * Implementação concreta de campo de entrada de texto com cursor piscante e validação.
 *
 * @class InputStandard
 * @extends Input
 * @implements InputEvent
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * A classe InputStandard fornece uma implementação completa de campo de entrada de texto com:
 * - Cursor piscante animado quando em foco
 * - Limitação automática de caracteres baseada na largura
 * - Feedback sonoro ao digitar
 * - Suporte a teclas especiais (Backspace, Enter)
 * - Estados visuais (hover, foco)
 * - Renderização com fonte e estilo personalizados
 * - Bordas estilizadas
 * 
 * O campo calcula automaticamente o número máximo de caracteres que cabem
 * baseado na largura fornecida (aprox. 11.25 pixels por caractere).
 * 
 * Possui som padrão de digitação pré-carregado que toca a cada tecla pressionada.
 * 
 * @remarks
 * O cursor pisca a cada 500ms quando o campo está em foco.
 * Pressionar Enter desativa o campo e executa callback opcional.
 *
 * @example
 * ```typescript
 * const input = new InputStandard(300, 40);
 * input.backgroundColor = '#1a1a1a';
 * input.backgroundColorOnHover = '#2a2a2a';
 * input.color = '#FFFFFF';
 * input.borderColor = '#555';
 * input.fontSize = 18;
 * input.font = 'Arial';
 * 
 * input.setPosition({
 *   canvas: myCanvas,
 *   align: PositionState.VERTICAL,
 *   y: 200
 * });
 * ```
 */
export default class InputStandard extends Input implements InputEvent {
  private _font: string
  private _fontSize: number
  private _textAlign: CanvasTextAlign
  private _textBaseLine: CanvasTextBaseline
  private _blinkingTimer: NodeJS.Timeout | undefined
  private _keyDownSound: Sound | null = null
  private _maxCharInput = 0

  constructor(width: number, height: number) {
    super(width, height)
    this._font = 'Arial'
    this._fontSize = 16
    this._textAlign = 'center'
    this._textBaseLine = 'middle'
    this._blinkingTimer = undefined
    this._keyDownSound = new Sound(inputScribbleSound)
    this._maxCharInput = Math.floor(width / 11.25)
  }

  public get font(): string {
    return this._font
  }

  public set font(font: string) {
    this._font = font
  }

  public get fontSize(): number {
    return this._fontSize
  }

  public set fontSize(fontSize: number) {
    this._fontSize = fontSize
  }

  public get textAlign(): CanvasTextAlign {
    return this._textAlign
  }

  public set textAlign(textAlign: CanvasTextAlign) {
    this._textAlign = textAlign
  }

  public set textBaseLine(textBaseLine: CanvasTextBaseline) {
    this._textBaseLine = textBaseLine
  }

  public get textBaseLine(): CanvasTextBaseline {
    return this._textBaseLine
  }

  public set blinkingTimer(blinkingTimer: NodeJS.Timeout) {
    this._blinkingTimer = blinkingTimer
  }

  public get blinkingTimer(): NodeJS.Timeout {
    return this._blinkingTimer as NodeJS.Timeout
  }

  /**
   * Renderiza o campo de entrada na tela.
   * @param {CanvasRenderingContext2D} context - O contexto de renderização 2D do canvas.
   */
  public renderInputBox(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.backgroundColor || '#000'
    context.fillRect(this.positionX, this.positionY, this.width, this.height)
    context.strokeStyle = this.borderColor || '#ccc'
    context.strokeRect(this.positionX, this.positionY, this.width, this.height)

    context.fillStyle = this.color || 'white'
    context.font = `${this.fontSize}px ${this.font}`
    context.textAlign = this.textAlign
    context.textBaseline = this.textBaseLine
    context.fillText(
      this.inputText,
      this.positionX + this.width / 2,
      this.positionY + this.height / 2
    )

    if (this.isTyping && this.cursorVisible) {
      const textWidth = context.measureText(this.inputText).width
      const cursorX = this.positionX + this.width / 2 + textWidth / 2
      context.beginPath()
      context.moveTo(cursorX, this.positionY + 12)
      context.lineTo(cursorX, this.positionY + this.height - 12)
      context.strokeStyle = this.color
      context.stroke()
    }
  }

  /**
   * Define a posição do campo de entrada na tela.
   * @param {AlignedPosition} param0 - Objeto contendo as propriedades para posicionamento alinhado.
   * @returns {void}
   */
  public setPosition({ canvas, x, y, align }: AlignedPosition): void {
    if (align) {
      switch (align) {
        case PositionState.VERTICAL:
          if (!y)
            throw new InputError(`É necessário informar o valor da variável y`)
          this.setVerticalAlign(canvas, y)
          break
        case PositionState.HORIZONTAL:
          if (!x)
            throw new InputError(`É necessário informar o valor da variável x`)
          this.setHorizontalAlign(canvas, x)
          break
      }
      return
    } else {
      if (!x && !y)
        throw new InputError(
          `Botões sem alinhamento precisam das variáveis x e y para serem posicionados em tela`
        )
      this.positionX = x as number
      this.positionY = y as number
    }
  }

  /**
   * Verifica se o mouse está sobre o campo de entrada.
   * @param {number} xCoords - Coordenada X do mouse.
   * @param {number} yCoords - Coordenada Y do mouse.
   * @returns {boolean} - Retorna true se o mouse estiver sobre o campo de entrada, caso contrário, false.
   */
  public isMouseOverInput(xCoords: number, yCoords: number): boolean {
    return (
      xCoords >= this.positionX &&
      xCoords <= this.positionX + this.width &&
      yCoords >= this.positionY &&
      yCoords <= this.positionY + this.height
    )
  }

  /**
   * Manipula o evento de movimento do mouse.
   * @param {MouseEvent} event - O evento de movimento do mouse.
   * @param {HTMLCanvasElement} canvas - O elemento canvas onde o evento ocorreu.
   * @param {Callback} [callback] - Função de retorno de chamada opcional a ser executada após o tratamento do evento.
   */
  public handleMouseMove(event: MouseEvent, callback?: Callback): void {
    this.applyHoverOnInput(event)
    callback?.()
  }

  /**
   * Manipula evento de clique do mouse para ativar/desativar o campo de entrada.
   *
   * @param {MouseEvent} event - Evento de clique do mouse
   * @param {Callback} [callback] - Função executada ao ativar o campo
   * 
   * @returns {void}
   * 
   * @remarks
   * Comportamento baseado na posição do clique:
   * 
   * **Clique DENTRO do campo:**
   * - Ativa o estado de digitação (isTyping = true)
   * - Torna o cursor visível (cursorVisible = true)
   * - Inicia animação de cursor piscante
   * - Executa callback opcional
   * 
   * **Clique FORA do campo:**
   * - Desativa o estado de digitação (isTyping = false)
   * - Oculta o cursor (cursorVisible = false)
   * - Para animação de cursor piscante
   * 
   * @example
   * ```typescript
   * input.handleMouseClick(event, () => {
   *   console.log('Campo ativado para digitação');
   * });
   * ```
   */
  public handleMouseClick(event: MouseEvent, callback?: Callback): void {
    this.applyHoverOnInput(event)
    const isOnHover = this.isMouseOverInput(event.x, event.y)
    if (isOnHover && !this.cursorVisible) {
      this.isTyping = true
      this.cursorVisible = true
      this.blinkingCursor()
      callback?.()
    } else {
      this.isTyping = false
      this.cursorVisible = false
      this.disableBlinkingCursor()
    }
  }

  /**
   * Manipula eventos de teclado para entrada de texto.
   *
   * @param {KeyboardEvent} event - Evento de teclado
   * @param {Callback} [callback] - Função opcional executada ao pressionar Enter
   * 
   * @returns {void}
   * 
   * @remarks
   * Este método processa diferentes tipos de teclas:
   * 
   * **Backspace**: Remove o último caractere do texto
   * **Enter**: Desativa o campo e executa callback
   * **Caracteres (length === 1)**: 
   * - Adiciona ao texto se não exceder máximo de caracteres
   * - Toca som de digitação
   * 
   * Só processa eventos se o campo estiver ativo (isTyping = true).
   * O limite de caracteres é calculado automaticamente baseado na largura.
   * 
   * @example
   * ```typescript
   * input.handleKeyboardEvent(event, () => {
   *   console.log('Enter pressionado com texto:', input.inputText);
   * });
   * ```
   */
  public handleKeyboardEvent(event: KeyboardEvent, callback?: Callback): void {
    if (!this.isTyping) return
    if (event?.key === KeyCodeState.BACKSPACE) {
      this.inputText = this.inputText.slice(0, -1)
    } else if (event?.key.length === 1) {
      if (this.inputText.length >= this._maxCharInput) return
      this.inputText += event?.key
      this.playSound(this._keyDownSound as Sound)
    } else if (event?.key === KeyCodeState.ENTER) {
      this.isTyping = false
      this.disableBlinkingCursor()
      callback?.()
    }
  }

  /**
   * Define o alinhamento vertical do campo de entrada.
   * @param {HTMLCanvasElement} canvas - O elemento canvas onde o campo de entrada está sendo posicionado.
   * @param {number} y - A coordenada Y para o alinhamento vertical.
   */
  private setVerticalAlign(canvas: HTMLCanvasElement, y: number): void {
    this.positionX = canvas.width / 2 - this.width / 2
    this.positionY = y
  }

  /**
   * Define o alinhamento horizontal do campo de entrada.
   * @param {HTMLCanvasElement} canvas - O elemento canvas onde o campo de entrada está sendo posicionado.
   * @param {number} x - A coordenada X para o alinhamento horizontal.
   */
  private setHorizontalAlign(canvas: HTMLCanvasElement, x: number): void {
    this.positionY = canvas.height / 2 - this.height / 2
    this.positionX = x
  }

  /**
   * Aplica o efeito de hover no campo de entrada.
   * @param {MouseEvent} event - O evento de mouse.
   *
   */
  private applyHoverOnInput(event: MouseEvent): void {
    const hovering = this.isMouseOverInput(event.x, event.y)
    if (hovering) {
      this.shouldUsePointerCursor = true
      this.backgroundColor = this.backgroundColorOnHover.hover
      this.color = this.colorOnHover.hover
    } else {
      this.shouldUsePointerCursor = false
      this.backgroundColor = this.backgroundColorOnHover.default
      this.color = this.colorOnHover.default
    }
  }

  /**
   * Inicia a animação de cursor piscante.
   *
   * @private
   * @returns {void}
   * 
   * @remarks
   * Cria um intervalo que alterna a visibilidade do cursor a cada 500ms,
   * criando o efeito visual de piscar. O intervalo é armazenado em blinkingTimer
   * para poder ser cancelado posteriormente.
   */
  private blinkingCursor(): void {
    this.blinkingTimer = setInterval(() => {
      this.cursorVisible = !this.cursorVisible
    }, 500)
  }

  /**
   * Para a animação de cursor piscante.
   *
   * @private
   * @returns {void}
   * 
   * @remarks
   * Limpa o intervalo criado por blinkingCursor(), interrompendo a animação.
   * Deve ser chamado quando o campo perde o foco ou é desativado.
   */
  private disableBlinkingCursor(): void {
    clearInterval(this.blinkingTimer)
  }

  /**
   * Toca um som, se não estiver já tocando.
   * @param {Sound} sound - O objeto de som a ser reproduzido.
   */
  private playSound(sound: Sound): void {
    if (!sound.isPlaying()) {
      sound.play().catch((error) => {
        throw new SoundError(ErrorState.AUDIO_FAILED_TO_LOAD, error)
      })
    }
  }
}
