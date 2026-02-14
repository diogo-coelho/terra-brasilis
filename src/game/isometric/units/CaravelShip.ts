import { Unit } from '@/arcade/core'
import UnitMobileState from '@/arcade/enums/UnitMobileState'
import { Image } from '@/arcade/images'

export default class CaravelShip extends Unit {
  constructor(image: string) {
    super(124, 128, 8, 0)
    this.unitSpeed = 200
    this.hasShadow = true
    this.mobileState = UnitMobileState.NAVIGATOR
    this.initializeSpritesheet(image)
  }

  private initializeSpritesheet(image: string): void {
    const spritesheetImage = new Image(image)
    this.setSpritesheet(spritesheetImage)
  }
}
