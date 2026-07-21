import { Tile } from '@/arcade/core'
import { Image } from '@/arcade/images'

export default class ShallowSeaWaterTile extends Tile {
  private _imagePath: string

  constructor(image: string) {
    super(128, 64, 4, 2500) // 2500ms = 2,5 segundos para ciclo completo (animação gradual)
    this._imagePath = image
    this.isWalkable = false
    this.isNavigable = true
    this.elevation = 0
    this.cost = 2 // Custo de movimento mais alto que o oceano profundo, mas ainda navegável
    this.initializeSpritesheet(image)
  }

  private initializeSpritesheet(image: string): void {
    const spritesheetImage = new Image(image)
    this.setSpritesheet(spritesheetImage)
    this.setOffset(0, 64) // Offset para a posição do tile de água rasa na spritesheet
  }

  protected createClone(): Tile {
    return new ShallowSeaWaterTile(this._imagePath)
  }
}
