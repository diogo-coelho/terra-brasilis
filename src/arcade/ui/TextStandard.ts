import Text from '@/arcade/ui/abstract/Text'

/**
 * Implementação padrão de renderização de texto.
 *
 * @class TextStandard
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Classe concreta que implementa renderização de texto no canvas
 * com suporte a customização de fonte, tamanho e cor.
 *
 * @extends Text
 *
 * @remarks
 * Utiliza a API nativa do Canvas 2D para desenhar texto.
 *
 * @example
 * ```typescript
 * const title = new TextStandard('Terra Brasilis', 32, 'Arial', '#fff');
 * title.drawText(context, 400, 100);
 * ```
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
