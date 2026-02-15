import { Tile } from '@/arcade/core'
import { OceanTile } from '@/game/isometric/tiles'
import oceanTileSpritesheet from '@/arcade/assets/images/tb_ocean_stylesheet.png'

/**
 * Mapeador de tiles do jogo.
 *
 * @class TileMapper
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Gerencia o mapeamento entre identificadores numéricos e instâncias de tiles.
 * Responsável por criar e fornecer acesso aos diferentes tipos de tiles
 * utilizados no jogo, como oceano, terra, montanhas, etc.
 *
 * @remarks
 * O mapeamento utiliza um Map onde a chave é um número identificador
 * e o valor é uma instância do tile correspondente.
 *
 * @example
 * ```typescript
 * const mapper = new TileMapper();
 * const oceanTile = mapper.getTileByKey(0);
 * ```
 *
 * @see Tile
 * @see OceanTile
 */
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

  /**
   * Obtém um tile específico pelo seu identificador.
   *
   * @param {number} key - Identificador numérico do tile
   *
   * @returns {Tile | undefined} Instância do tile ou undefined se não encontrado
   *
   * @example
   * ```typescript
   * const tile = mapper.getTileByKey(0); // Retorna OceanTile
   * ```
   */
  public getTileByKey(key: number): Tile | undefined {
    return this._mapper.get(key)
  }

  private initializeTileMapper(): void {
    const oceanTile: Tile = new OceanTile(oceanTileSpritesheet)

    this._mapper.set(0, oceanTile)
  }
}
