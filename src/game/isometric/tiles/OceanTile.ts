import { Tile } from '@/arcade/core'
import { Image } from '@/arcade/images'

/**
 * Representa um tile de oceano.
 *
 * @class OceanTile
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Tile que representa água/oceano no mapa isométrico.
 * Não é caminhvel mas é navegável, permitindo que navios se movam sobre ele.
 * Possui animação de ondas.
 *
 * @extends Tile
 *
 * @remarks
 * Este tile possui animação de 4 frames com duração de 2,5 segundos
 * para criar um efeito suave de ondas.
 *
 * @example
 * ```typescript
 * const oceanTile = new OceanTile(oceanImage);
 * tileMap.setTile(0, 0, oceanTile);
 * ```
 *
 * @see Tile
 */
export default class OceanTile extends Tile {
  constructor(image: string) {
    super(128, 64, 4, 2500) // 2500ms = 2,5 segundos para ciclo completo (animação gradual)
    this.isWalkable = false
    this.isNavigable = true
    this.elevation = 0
    this.initializeSpritesheet(image)
  }

  /**
   * Inicializa a spritesheet do tile de oceano.
   *
   * @param {string} image - Caminho da imagem da spritesheet
   *
   * @remarks
   * Carrega a imagem e a define como spritesheet do tile.
   */
  private initializeSpritesheet(image: string): void {
    const spritesheetImage = new Image(image)
    this.setSpritesheet(spritesheetImage)
  }
}
