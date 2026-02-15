import Input from './abstract/Input'
import { InputEvent } from '../interfaces'
import { AlignedPosition, Callback } from '../types'
import InputError from '../errors/InputError'
import { ErrorState, KeyCodeState, PositionState } from '../enums'
import { Sound } from '../sounds'
import { SoundError } from '../errors'

import inputScribbleSound from '../assets/sounds/sfx/input_scribble.wav'

/**
 * Implementação padrão de campo de entrada de texto.
 *
 * @class InputStandard
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Classe que implementa um campo de entrada de texto interativo com
 * cursor piscante, som de digitação, efeitos de hover e validação
 * de tamanho máximo.
 *
 * @extends Input
 *
 * @remarks
 * - Suporta limitação automática de caracteres baseada na largura
 * - Cursor piscante quando o campo está ativo
 * - Feedback sonoro ao digitar
 * - Alinhamento automático vertical ou horizontal
 *
 * @example
 * ```typescript
 * const nameInput = new InputStandard(300, 50);
 * nameInput.setPosition({ canvas, y: 200, align: PositionState.VERTICAL });
 * nameInput.renderInputBox(context);
 * nameInput.handleKeyboardEvent(event);
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
   * Renderiza o campo de entrada no canvas.
   *
   * @param {CanvasRenderingContext2D} context - Contexto de renderização
   *
   * @remarks
   * Desenha o retângulo de fundo, borda, texto e cursor piscante quando ativo.
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
   * Define a posição do campo de entrada.
   *
   * @param {AlignedPosition} options - Configuração de posicionamento
   * @param {HTMLCanvasElement} options.canvas - Canvas de referência
   * @param {number} [options.x] - Coordenada X
   * @param {number} [options.y] - Coordenada Y
   * @param {PositionState} [options.align] - Tipo de alinhamento
   *
   * @throws {InputError} Quando nenhuma coordenada é fornecida sem alinhamento
   * @throws {InputError} Quando alinhamento vertical é usado sem Y
   * @throws {InputError} Quando alinhamento horizontal é usado sem X
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

  public isMouseOverInput(xCoords: number, yCoords: number): boolean {
    return (
      xCoords >= this.positionX &&
      xCoords <= this.positionX + this.width &&
      yCoords >= this.positionY &&
      yCoords <= this.positionY + this.height
    )
  }
  /**
   * Manipula eventos de click no campo de entrada.
   *
   * @param {MouseEvent} event - Evento de click
   * @param {Callback} [callback] - Função opcional a executar
   *
   * @remarks
   * Ativa/desativa o modo de digitação e cursor piscante conforme o click.
   */  public handleMouseMove(event: MouseEvent, callback?: Callback): void {
    this.applyHoverOnInput(event)
    callback?.()
  }

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
   * @param {Callback} [callback] - Função a executar ao pressionar Enter
   *
   * @remarks
   * - Backspace: remove último caractere
   * - Caracteres normais: adicionados ao texto (até o limite)
   * - Enter: desativa digitação e executa callback
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

  private setVerticalAlign(canvas: HTMLCanvasElement, y: number): void {
    this.positionX = canvas.width / 2 - this.width / 2
    this.positionY = y
  }

  private setHorizontalAlign(canvas: HTMLCanvasElement, x: number): void {
    this.positionY = canvas.height / 2 - this.height / 2
    this.positionX = x
  }

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

  private blinkingCursor(): void {
    this.blinkingTimer = setInterval(() => {
      this.cursorVisible = !this.cursorVisible
    }, 500)
  }

  private disableBlinkingCursor(): void {
    clearInterval(this.blinkingTimer)
  }

  private playSound(sound: Sound): void {
    if (!sound.isPlaying()) {
      sound.play().catch((error) => {
        throw new SoundError(ErrorState.AUDIO_FAILED_TO_LOAD, error)
      })
    }
  }
}
