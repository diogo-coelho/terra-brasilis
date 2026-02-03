import { Game } from '@/arcade/core'
import GameObject from '../../core/game/GameObject'

/**
 * Classe representando um objeto de texto renderizável.
 *
 * @class Text
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe Text encapsula funcionalidades básicas para criação e renderização de texto
 * em um contexto de canvas 2D. Permite definir o conteúdo do texto, estilo de fonte,
 * tamanho e cor, e fornece um método para desenhar o texto na tela.
 *
 * @param {string} text - O conteúdo do texto a ser exibido.
 *
 * @example
 * // Criação e renderização de texto
 * const myText = new Text("Hello, Arcade!");
 * myText.drawText(context, 100, 50);
 *
 * @remarks
 * Esta classe pode ser expandida para incluir mais funcionalidades,
 * como alinhamento de texto, múltiplas linhas, sombras, etc.
 *
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
