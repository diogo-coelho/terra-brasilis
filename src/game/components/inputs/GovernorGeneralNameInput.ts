import { Arcade } from '@/arcade'

/**
 * Campo de entrada especializado para o nome do Governador-Geral com estilização temática.
 *
 * @class GovernorGeneralNameInput
 * @extends InputStandard
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * A classe GovernorGeneralNameInput é uma especialização de InputStandard
 * com estilização pré-configurada para o tema de Terra Brasilis:
 * 
 * **Estilo Visual:**
 * - Background: #84310A (marrom terra)
 * - Background Hover: #692303 (marrom escuro)
 * - Texto: #FFFFFF (branco)
 * - Borda: #CAAD6C (dourado)
 * - Fonte: Jersey 15, 24px
 * 
 * **Características:**
 * - Estilização automática no construtor
 * - Configurações de fonte personalizadas
 * - Alinhamento centralizado de texto
 * - Integração perfeita com tema colonial
 * 
 * Este componente é usado especificamente na InsertNameScene para
 * capturar o nome que o jogador escolhe para seu Governador-Geral.
 * 
 * @example
 * ```typescript
 * const nameInput = new GovernorGeneralNameInput(450, 40);
 * nameInput.setPosition({
 *   canvas: myCanvas,
 *   align: PositionState.VERTICAL,
 *   y: 200
 * });
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
