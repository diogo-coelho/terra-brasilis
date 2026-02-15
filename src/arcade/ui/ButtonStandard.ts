import Button from './abstract/Button'
import { ButtonEvent } from '../interfaces'
import { Sound } from '../sounds'
import { ButtonClickHandle, AlignedPosition, Callback } from '../types'
import { SoundError, ButtonError } from '../errors'
import { ErrorState, PositionState } from '../enums'

import hoverSound from '../assets/sounds/sfx/btn_hover.ogg'
import clickSound from '../assets/sounds/sfx/btn_click.wav'

/**
 * Implementação padrão de botão para o jogo.
 *
 * @class ButtonStandard
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Classe que implementa um botão interativo com efeitos visuais de hover,
 * sons de feedback e configuração completa de tipografia e posicionamento.
 *
 * @extends Button
 *
 * @remarks
 * - Fornece efeitos sonoros automáticos ao passar o mouse e clicar
 * - Suporta alinhamento vertical e horizontal automático
 * - Permite customização total de aparência e comportamento
 *
 * @example
 * ```typescript
 * const btn = new ButtonStandard(100, 200, 'Iniciar Jogo');
 * btn.fontSize = 20;
 * btn.setPosition({ canvas, y: 300, align: PositionState.VERTICAL });
 * btn.renderButton(context);
 * ```
 */
export default class ButtonStandard extends Button implements ButtonEvent {
  private _font: string
  private _fontSize: number
  private _textAlign: CanvasTextAlign
  private _textBaseline: CanvasTextBaseline
  private _isHovered: boolean = false
  private _hoverSound: Sound | null = null
  private _clickSound: Sound | null = null

  constructor(x: number = 0, y: number = 0, label: string = '') {
    super(x, y, label)
    this._font = 'Arial'
    this._fontSize = 16
    this._textAlign = 'center'
    this._textBaseline = 'middle'
    this._hoverSound = new Sound(hoverSound)
    this._clickSound = new Sound(clickSound)
  }

  public get font(): string {
    return this._font
  }

  public get fontSize(): number {
    return this._fontSize
  }

  public get textAlign(): CanvasTextAlign {
    return this._textAlign
  }

  public get textBaseline(): CanvasTextBaseline {
    return this._textBaseline
  }

  public set font(font: string) {
    this._font = font
  }

  public set fontSize(fontSize: number) {
    this._fontSize = fontSize
  }

  public set textAlign(textAlign: CanvasTextAlign) {
    this._textAlign = textAlign
  }

  public set textBaseline(textBaseline: CanvasTextBaseline) {
    this._textBaseline = textBaseline
  }

  public set hoverSound(sound: Sound) {
    this._hoverSound = sound
  }

  public get hoverSound(): Sound | null {
    return this._hoverSound
  }

  public set clickSound(sound: Sound) {
    this._clickSound = sound
  }

  public get clickSound(): Sound | null {
    return this._clickSound
  }

  /**
   * Define a posição do botão no canvas.
   *
   * @param {AlignedPosition} options - Configuração de posicionamento
   * @param {HTMLCanvasElement} options.canvas - Canvas de referência
   * @param {number} [options.x] - Coordenada X
   * @param {number} [options.y] - Coordenada Y
   * @param {PositionState} [options.align] - Tipo de alinhamento automático
   *
   * @throws {ButtonError} Quando nenhuma coordenada é fornecida sem alinhamento
   * @throws {ButtonError} Quando alinhamento vertical é usado sem Y
   * @throws {ButtonError} Quando alinhamento horizontal é usado sem X
   *
   * @remarks
   * - Sem align: posiciona em (x, y) especificado
   * - VERTICAL: centraliza horizontalmente, usa Y fornecido
   * - HORIZONTAL: centraliza verticalmente, usa X fornecido
   *
   * @example
   * ```typescript
   * btn.setPosition({ canvas, y: 400, align: PositionState.VERTICAL });
   * ```
   */
  public setPosition({ canvas, x, y, align }: AlignedPosition): void {
    if (!align) {
      if (!x && !y)
        throw new ButtonError(
          'É necessário fornecer pelo menos uma coordenada (x ou y) para posicionar o botão.'
        )
      this.positionX = x as number
      this.positionY = y as number
    } else {
      switch (align) {
        case PositionState.VERTICAL:
          if (!y)
            throw new ButtonError(`É necessário informar o valor da variável y`)
          this.setVerticalAlign(canvas, y)
          break
        case PositionState.HORIZONTAL:
          if (!x)
            throw new ButtonError(`É necessário informar o valor da variável x`)
          this.setHorizontalAlign(canvas, x)
          break
      }
      return
    }
  }

  /**
   * Verifica se o mouse está sobre o botão.
   *
   * @param {number} xCoord - Coordenada X do mouse
   * @param {number} yCoord - Coordenada Y do mouse
   * @returns {boolean} true se o mouse estiver sobre o botão
   *
   * @remarks
   * Utilizado para detectar interações de hover e click.
   */
  public isMouseOverButton(xCoord: number, yCoord: number): boolean {
    return (
      xCoord >= this.positionX &&
      xCoord <= this.positionX + this.width &&
      yCoord >= this.positionY &&
      yCoord <= this.positionY + this.height
    )
  }

  /**
   * Aplica efeito visual e sonoro de hover no botão.
   *
   * @param {MouseEvent} event - Evento de mouse
   *
   * @remarks
   * - Altera cores de fundo e texto quando o mouse está sobre o botão
   * - Reproduz som de hover apenas na primeira vez
   * - Ativa cursor pointer quando em hover
   */
  public applyHoverOnButton(event: MouseEvent): void {
    const hovering = this.isMouseOverButton(event.x, event.y)
    if (hovering) {
      if (!this._isHovered) this.playSound(this._hoverSound as Sound)
      this.shouldUsePointerCursor = true
      this.backgroundColor = this.backgroundColorOnHover.hover
      this.color = this.colorOnHover.hover
      this._isHovered = true
    } else {
      this.shouldUsePointerCursor = false
      this.backgroundColor = this.backgroundColorOnHover.default
      this.color = this.colorOnHover.default
      this._isHovered = false
    }
  }

  /**
   * Renderiza o botão no canvas.
   *
   * @param {CanvasRenderingContext2D} context - Contexto de renderização 2D
   *
   * @remarks
   * Desenha o retângulo de fundo e o texto centralizado com as
   * configurações de tipografia aplicadas.
   */
  public renderButton(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.backgroundColor || '#ccc'
    context.fillRect(this.positionX, this.positionY, this.width, this.height)

    context.fillStyle = this.color || 'white'
    context.font = `${this.fontSize} ${this.font}`
    context.textAlign = this.textAlign
    context.textBaseline = this.textBaseline
    context.fillText(
      this.label,
      this.positionX + this.width / 2,
      this.positionY + this.height / 2
    )
  }

  /**
   * Manipula eventos de movimento do mouse.
   *
   * @param {MouseEvent} event - Evento de movimento do mouse
   * @param {Callback} [callback] - Função opcional a executar
   *
   * @remarks
   * Aplica automaticamente efeitos de hover e executa callback se fornecido.
   */
  public handleMouseMove(event: MouseEvent, callback?: Callback): void {
    this.applyHoverOnButton(event)
    callback?.()
  }

  /**
   * Manipula eventos de click no botão.
   *
   * @param {ButtonClickHandle} options - Configuração do click
   * @param {MouseEvent} options.event - Evento de click
   * @param {Callback} [options.callback] - Função a executar no click
   *
   * @remarks
   * Verifica se o click foi dentro do botão, reproduz som de click
   * e executa callback se fornecido.
   */
  public handleOnClick({ event, callback }: ButtonClickHandle): void {
    const hovering = this.isMouseOverButton(event.x, event.y)
    if (hovering) {
      this.playSound(this._clickSound as Sound)
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

  private playSound(sound: Sound): void {
    if (!sound.isPlaying()) {
      sound.play().catch((error) => {
        throw new SoundError(ErrorState.AUDIO_FAILED_TO_LOAD, error)
      })
    }
  }
}
