import { Tile } from '@/arcade/core'
import { Image } from '@/arcade/images'

/**
 * Tile de água animado para mapas isométricos.
 *
 * @class OceanTile
 * @extends Tile
 * @author Diogo Coelho
 * @version 1.0.1
 * @since 2026-02-15
 *
 * @description
 * A classe OceanTile representa um tile de água animado, utilizado em mapas isométricos do Terra Brasilis.
 * Características principais:
 * - Não é caminhável (isWalkable = false)
 * - É navegável (isNavigable = true)
 * - Elevação zero (elevation = 0)
 * - Utiliza spritesheet animada (3 frames, 50ms por frame)
 * - Inicializa a textura via caminho de imagem
 *
 * @param {string} image Caminho para a imagem do spritesheet de água
 *
 * @example
 * // Criação de um tile de oceano
 * const oceanTile = new OceanTile('assets/tiles/ocean.png');
 * gameScene.addTile(oceanTile);
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

  private initializeSpritesheet(image: string): void {
    const spritesheetImage = new Image(image)
    this.setSpritesheet(spritesheetImage)
  }
}
