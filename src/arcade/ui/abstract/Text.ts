import { Game } from '@/arcade/core'
import GameObject from '../../core/game/GameObject'

/**
 * Classe abstrata base para elementos de texto.
 *
 * @class Text
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Define a estrutura base para renderização de texto no jogo,
 * gerenciando conteúdo, fonte, tamanho e cor.
 *
 * @remarks
 * Classes concretas devem implementar o método drawText para renderização.
 *
 * @see TextStandard
 */
export default abstract class Text {
  protected _text: string = ''
  protected _fontSize: number = 16
  protected _fontFamily: string = 'Arial'
  protected _color: string = '#000000'

  constructor(text: string) {
    this._text = text
  }

  public get text(): string {
    return this._text
  }

  public set text(value: string) {
    this._text = value
  }

  public get fontSize(): number {
    return this._fontSize
  }

  public set fontSize(value: number) {
    this._fontSize = value
  }

  public get fontFamily(): string {
    return this._fontFamily
  }

  public set fontFamily(value: string) {
    this._fontFamily = value
  }

  public get color(): string {
    return this._color
  }

  public set color(value: string) {
    this._color = value
  }

  abstract drawText(
    context: CanvasRenderingContext2D,
    x: number,
    y: number
  ): void
}
