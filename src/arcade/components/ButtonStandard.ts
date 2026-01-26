import Button from './abstract/Button'
import { ButtonEvent } from '../interfaces'
import { Sound } from '../sounds'
import { ButtonClickHandle, AlignedPosition, Callback } from '../types'
import { SoundError, ButtonError } from '../errors'
import { ErrorState, PositionState } from '../enums'

import hoverSound from '../assets/sounds/sfx/btn_hover.ogg'
import clickSound from '../assets/sounds/sfx/btn_click.wav'

/**
 * Classe que representa um botão padrão no jogo.
 * Estende a classe Button e implementa métodos específicos para renderização e posicionamento.
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe ButtonStandard é uma implementação concreta
 * da classe abstrata Button, representando um botão
 * padrão no jogo. Ela define propriedades como fonte,
 * tamanho da fonte, alinhamento do texto e métodos para
 * renderização e posicionamento do botão na tela.
 *
 * @constructor
 * @param {number} x - A largura inicial do botão.
 * @param {number} y - A altura inicial do botão.
 * @param {string} label - O rótulo do botão.
 * @param {string} font - A fonte do texto do botão.
 * @param {number} fontSize - O tamanho da fonte do texto do botão.
 * @param {CanvasTextAlign} textAlign - O alinhamento do texto do botão.
 * @param {CanvasTextBaseline} textBaseline - A linha de base do texto do botão.
 *
 * @example
 * const startButton = new ButtonStandard(
 *  100,
 *  50,
 *  'Start Game',
 *  'Arial',
 *  20,
 *  'center',
 *  'middle'
 * );
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

  public isMouseOverButton(xCoord: number, yCoord: number): boolean {
    return (
      xCoord >= this.positionX &&
      xCoord <= this.positionX + this.width &&
      yCoord >= this.positionY &&
      yCoord <= this.positionY + this.height
    )
  }

  public applyHoverOnButton(
    event: MouseEvent,
    canvas: HTMLCanvasElement
  ): void {
    const hovering = this.isMouseOverButton(event.x, event.y)
    if (hovering) {
      if (!this._isHovered) this.playSound(this._hoverSound as Sound)
      canvas.style.cursor = 'pointer'
      this.backgroundColor = this.backgroundColorOnHover.hover
      this.color = this.colorOnHover.hover
      this._isHovered = true
    } else {
      canvas.style.cursor = 'default'
      this.backgroundColor = this.backgroundColorOnHover.default
      this.color = this.colorOnHover.default
      this._isHovered = false
    }
  }

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

  public handleMouseMove(
    event: MouseEvent,
    canvas: HTMLCanvasElement,
    callback?: Callback
  ): void {
    this.applyHoverOnButton(event, canvas)
    callback?.()
  }

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
