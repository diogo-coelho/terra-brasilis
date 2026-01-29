import Text from '@/arcade/ui/abstract/Text'

/**
 * Classe concreta que implementa a renderização de texto padrão.
 *
 * @class TextStandard
 * @extends Text
 * @param {string} text - O conteúdo do texto a ser exibido.
 * @param {number} fontSize - O tamanho da fonte do texto.
 * @param {string} fontFamily - A família da fonte do texto.
 * @param {string} color - A cor do texto.
 *
 * @description
 * A classe TextStandard estende a classe abstrata Text,
 * fornecendo uma implementação concreta para renderização de texto
 * em um contexto de canvas 2D. Ela define o método drawText,
 * que desenha o texto na posição especificada com as propriedades
 * de fonte, tamanho e cor definidas.
 *
 * @example
 * ```typescript
 * const myText = new TextStandard("Hello, Arcade!", 20, "Verdana", "#FF0000");
 * myText.drawText(context, 100, 50);
 * ```
 *
 */
export default class TextStandard extends Text {
  constructor(
    text: string,
    fontSize: number,
    fontFamily: string,
    color: string
  ) {
    super(text)
    this.fontSize = fontSize
    this.fontFamily = fontFamily
    this.color = color
  }

  public drawText(
    context: CanvasRenderingContext2D,
    x: number,
    y: number
  ): void {
    context.font = `${this.fontSize}px ${this.fontFamily}`
    context.fillStyle = this.color
    context.fillText(this.text, x, y)
  }
}
