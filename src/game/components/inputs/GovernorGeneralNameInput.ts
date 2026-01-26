import { Arcade } from '@/arcade'

/**
 * Componente de entrada de texto para o nome do Governador-Geral.
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * A classe GovernorGeneralNameInput é uma extensão
 * da classe InputStandard, especializada para
 * a entrada do nome do Governador-Geral no jogo.
 * Ela define estilos específicos
 * para o campo de entrada, como cores de fundo,
 * cores do texto e bordas.
 *
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
