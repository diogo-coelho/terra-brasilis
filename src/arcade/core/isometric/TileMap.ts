import Tile from '@/arcade/core/isometric/Tile'
import Image from '@/arcade/images/Image'

/**
 * Mapa de tiles isométricos para jogos 2D com perspectiva isométrica.
 *
 * @class TileMap
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * A classe TileMap gerencia uma grade (grid) de tiles isométricos,
 * permitindo a criação e renderização de mapas de jogos com perspectiva isométrica.
 * Cada tile no mapa é uma instância da classe Tile, que suporta
 * renderização em forma de diamante e animação.
 *
 * **Características Principais:**
 * - Armazena uma matriz 2D de tiles isométricos
 * - Permite renderização ordenada dos tiles para correta sobreposição
 * - Suporte a tiles animados (água, lava, etc.)
 * - Facilita o posicionamento baseado em coordenadas de grid
 * - Integração com sistemas de câmera e viewport
 *
 * @param {Tile[][]} tiles - Matriz 2D de tiles isométricos que compõem o mapa
 *
 * @example
 * ```typescript
 * // Criação de um mapa isométrico simples 2x2
 * const tile1 = new Tile(64, 32, 1, 0, 0, 0, grassSheet);
 * const tile2 = new Tile(64, 32, 1, 1, 0, 0, waterSheet);
 * const tile3 = new Tile(64, 32, 1, 0, 1, 0, sandSheet);
 *
 * const tileMap = new TileMap([
 *   [tile1, tile2],
 *   [tile3, tile1]
 * ]);
 *
 * // No loop de renderização:
 * tileMap.drawWorldMap(canvas, context, deltaTime);
 * ```
 */
export default class TileMap {
  protected _tileWidth: number = 64
  protected _tileHeight: number = 32
  protected _tiles: Tile[][]
  protected _frameDelay: number = 0

  constructor(
    tiles: Tile[][],
    tileWidth: number = 64,
    tileHeight: number = 32
  ) {
    this._tiles = tiles
    this._tileWidth = tileWidth
    this._tileHeight = tileHeight
  }

  public set tiles(value: Tile[][]) {
    this._tiles = value
  }

  public get tiles(): Tile[][] {
    return this._tiles
  }

  public set tileWidth(value: number) {
    this._tileWidth = value
  }

  public get tileWidth(): number {
    return this._tileWidth
  }

  public set tileHeight(value: number) {
    this._tileHeight = value
  }

  public get tileHeight(): number {
    return this._tileHeight
  }

  public set frameDelay(value: number) {
    this._frameDelay = value
  }

  public get frameDelay(): number {
    return this._frameDelay
  }

  /**
   * Desenha o mapa de tiles isométricos no contexto fornecido.
   * @param {HTMLCanvasElement} canvas - Elemento canvas onde o mapa será desenhado
   * @param {CanvasRenderingContext2D} context - Contexto de renderização do canvas
   */
  public drawWorldMap(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    for (var col = 0; col < this._tiles[0].length; col++) {
      for (var row = 0; row < this._tiles.length; row++) {
        let tilePositionX = (row - col) * this._tileHeight
        // Centraliza o grid de forma horizontal no canvas
        tilePositionX += canvas.width / 2 - this._tileWidth / 2
        const tilePositionY = (row + col) * (this._tileHeight / 2)
        this._tiles[row][col].setPosition(tilePositionX, tilePositionY)
        this._tiles[row][col].draw(context, false)
      }
    }
  }

  /**
   * Atualiza o mapa de tiles, animando tiles conforme necessário.
   * @param { HTMLCanvasElement } canvas - Elemento canvas onde o mapa será desenhado
   * @param { CanvasRenderingContext2D } context - Contexto de renderização do canvas
   * @param { number } deltaTime - Tempo decorrido desde a última atualização (em milissegundos)
   */
  public update(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    deltaTime: number
  ): void {
    // 1. Animar apenas um tile por tipo de spritesheet para sincronia
    const animatedBySource = new Map<string, Tile>()

    for (let row = 0; row < this._tiles.length; row++) {
      for (let col = 0; col < this._tiles[row].length; col++) {
        const tile = this._tiles[row][col]
        const src = tile.spritesheet?.image?.src

        if (!src) continue

        // Anima apenas um tile por tipo (baseado no src da imagem)
        if (!animatedBySource.has(src)) {
          tile.animate(deltaTime)
          animatedBySource.set(src, tile)
        } else {
          // Sincroniza o frame com o tile já animado do mesmo tipo
          const masterTile = animatedBySource.get(src)!
          tile.currentFrame = masterTile.currentFrame
          tile.accumulator = masterTile.accumulator
          // Atualiza o offsetX para refletir o frame correto visualmente
          tile.setOffset(masterTile.currentFrame * tile.width, 0)
        }
      }
    }

    // 2. Renderizar cada tile na posição correta
    this.drawWorldMap(canvas, context)
  }

  public getTileAtGridPosition(
    mouseX: number,
    mouseY: number,
    canvas: HTMLCanvasElement
  ): Tile | null {
    // Itera pelos tiles para encontrar qual contém o clique
    for (let row = 0; row < this._tiles.length; row++) {
      for (let col = 0; col < this._tiles[row].length; col++) {
        const tile = this._tiles[row][col]

        console.log(
          'tile positionX:',
          tile.positionX,
          'tile positionY:',
          tile.positionY
        )
        // Delega a verificação para o próprio tile
        if (tile.containsPoint(mouseX, mouseY)) {
          console.log('row:', row, 'col:', col)
          return tile
        }
      }
    }

    return null
  }
}
