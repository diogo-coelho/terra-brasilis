import { Unit } from '@/arcade/core'
import { Image } from '@/arcade/images'
import UnitMobileState from '@/arcade/enums/UnitMobileState'
import UnitDirection from '@/arcade/enums/UnitDirection'

/**
 * Representa uma caravela no jogo.
 *
 * @class CaravelShip
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Unidade naval que representa uma caravela portuguesa.
 * Capaz de navegar pelos oceanos e possui animação direcional com 8 direções.
 *
 * @extends Unit
 *
 * @remarks
 * A caravela é uma unidade navegadora que só pode se mover em tiles navegáveis.
 * Possui sprites diferenciados para cada uma das 8 direções de movimento.
 *
 * @example
 * ```typescript
 * const caravel = new CaravelShip(caravelImage);
 * scenario.addUnit(caravel, 5, 5);
 * ```
 *
 * @see Unit
 * @see UnitMobileState
 * @see UnitDirection
 */
export default class CaravelShip extends Unit {
  constructor(image: string) {
    super(124, 128, 1, 16) // 16ms para ciclo completo de animação (4 frames)
    this.unitSpeed = 50
    this.hasShadow = true
    this.mobileState = UnitMobileState.NAVIGATOR
    this.initializeSpritesheet(image)
    this.setInitialDirection()
  }

  /**
   * Inicializa a spritesheet da caravela.
   *
   * @param {string} image - Caminho da imagem da spritesheet
   *
   * @remarks
   * Carrega a imagem e a define como spritesheet da unidade.
   */
  private initializeSpritesheet(image: string): void {
    const spritesheetImage = new Image(image)
    this.setSpritesheet(spritesheetImage)
  }

  /**
   * Define a direção inicial da caravela.
   *
   * @remarks
   * A caravela inicia voltada para sudoeste.
   */
  private setInitialDirection(): void {
    this._currentDirection = UnitDirection.SOUTHWEST
    this.updateSpriteDirection()
  }

  /**
   * Calcula o offset Y na spritesheet baseado na direção.
   *
   * @param {UnitDirection} direction - Direção da unidade
   *
   * @returns {number} Offset Y em pixels na spritesheet
   *
   * @remarks
   * Cada direção ocupa uma linha na spritesheet.
   * Ordem: N, NE, E, SE, S, SW, W, NW.
   */
  protected getOffsetYForDirection(direction: UnitDirection): number {
    // Cada direção ocupa uma linha no spritesheet
    // A ordem esperada é: N, NE, E, SE, S, SW, W, NW
    return direction * this.height
  }
}
