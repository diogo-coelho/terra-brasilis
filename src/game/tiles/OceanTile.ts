import { Tile } from '@/arcade/core'
import { Image } from '@/arcade/images'

/**
 * Representa um tile de água no jogo, com propriedades específicas de navegação e animação.
 *
 * @class WaterTile
 * @extends Tile
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2026-02-15
 *
 * @description
 * A classe WaterTile estende a classe base Tile para representar tiles de água no ambiente do jogo.
 * Esses tiles possuem características específicas:
 * - Não são caminháveis (isWalkable = false)
 * - Não são navegáveis (isNavigable = false)
 * - Possuem elevação zero (elevation = 0)
 * - Utilizam uma spritesheet animada para simular o movimento da água
 * - Definem uma cor padrão azul para representação visual
 * - A animação é configurada para 4 frames com duração total de 300ms
 *
 * @example
 * // Criação de um tile de água na posição (100, 150) com tamanho 32x32
 * const waterTile = new WaterTile(100, 150, 32, 32);
 * gameScene.addTile(waterTile);
 *
 */
export default class OceanTile extends Tile {

  constructor(image: string) {
    super(128, 64, 4, 10)
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
