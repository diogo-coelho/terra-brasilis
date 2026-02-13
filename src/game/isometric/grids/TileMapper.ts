import { Tile } from '@/arcade/core'
import { OceanTile } from '@/game/isometric/tiles'
import oceanTileSpritesheet from '@/arcade/assets/images/tb_ocean_stylesheet.png'

export default class TileMapper {
  private _mapper: Map<number, Tile> = new Map()

  constructor() {
    this.initializeTileMapper()
  }

  public get mapper(): Map<number, Tile> {
    return this._mapper
  }

  public set mapper(mapper: Map<number, Tile>) {
    this._mapper = mapper
  }

  public getTileByKey(key: number): Tile | undefined {
    return this._mapper.get(key)
  }

  private initializeTileMapper(): void {
    const oceanTile: Tile = new OceanTile(oceanTileSpritesheet)

    this._mapper.set(0, oceanTile)
  }
}
