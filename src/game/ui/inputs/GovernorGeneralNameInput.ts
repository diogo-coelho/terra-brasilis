import { Arcade } from '@/arcade'

/**
 * Campo de entrada para o nome do Governador-Geral.
 *
 * @class GovernorGeneralNameInput
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Campo de input personalizado para capturar o nome do Governador-Geral
 * escolhido pelo jogador. Possui estilização específica para o tema
 * colonial do jogo.
 *
 * @extends Arcade.Components.InputStandard
 *
 * @remarks
 * Este input possui cores e fontes temáticas para combinar com
 * a estética visual do jogo Terra Brasilis.
 *
 * @example
 * ```typescript
 * const nameInput = new GovernorGeneralNameInput(400, 60);
 * nameInput.setPosition({canvas, align: PositionState.VERTICAL, y: 300});
 * ```
 *
 * @see InputStandard
 */
export default class GovernorGeneralNameInput
  extends Arcade.Components.InputStandard
{
  constructor(width: number, height: number) {
    super(width, height)
    this.backgroundColor = '#84310A'
    this.backgroundColorOnHover = '#692303'
    this.color = '#FFFFFF'
    this.colorOnHover = '#FFFFFF'
    this.borderColor = '#CAAD6C'
    this.borderWidth = 2
    this.initialize()
  }

  private initialize(): void {
    this.setFont({
      fontSize: 24,
      font: '"Jersey 15", sans-serif',
    })
  }

  private setFont({
    fontSize,
    font,
  }: {
    fontSize: number
    font: string
  }): void {
    this.font = font
    this.fontSize = fontSize
    this.textAlign = 'center'
    this.textBaseLine = 'middle'
  }
}
