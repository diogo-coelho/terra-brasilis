import Tile from '@/arcade/core/isometric/Tile'
import Image from '@/arcade/images/Image'

/**
 * Mapa de tiles isométricos.
 *
 * @class TileMap
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Gerencia uma matriz bidimensional de tiles isométricos, incluindo renderização,
 * animação sincronizada e detecção de cliques. Responsável por converter coordenadas
 * cartesianas em coordenadas isométricas e vice-versa.
 *
 * @remarks
 * O mapa utiliza projeção isométrica 2:1, onde tiles de 64x64 pixels são
 * renderizados com altura aparente de 32 pixels. A animação de tiles do mesmo
 * tipo é sincronizada para criar um efeito visual coeso.
 *
 * @example
 * ```typescript
 * const tiles = [[oceanTile1, oceanTile2], [oceanTile3, oceanTile4]];
 * const tileMap = new TileMap(tiles, 64, 32);
 * tileMap.drawWorldMap(canvas, context);
 * ```
 *
 * @see Tile
 * @see Scenario
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
   * Renderiza o mapa de tiles isométrico no canvas.
   *
   * @param {HTMLCanvasElement} canvas - Elemento canvas onde o mapa será desenhado
   * @param {CanvasRenderingContext2D} context - Contexto de renderização 2D
   *
   * @remarks
   * Converte coordenadas da matriz (row, col) em coordenadas isométricas (x, y).
   * O mapa é centralizado horizontalmente no canvas. A fórmula de conversão:
   * - X = (row - col) * tileHeight + offset de centralização
   * - Y = (row + col) * (tileHeight / 2)
   *
   * @example
   * ```typescript
   * tileMap.drawWorldMap(canvas, context);
   * ```
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
   * Atualiza e renderiza o mapa com animações sincronizadas.
   *
   * @param {HTMLCanvasElement} canvas - Elemento canvas
   * @param {CanvasRenderingContext2D} context - Contexto de renderização 2D
   * @param {number} deltaTime - Tempo decorrido desde o último frame em segundos
   *
   * @remarks
   * Este método implementa sincronização de animação para tiles do mesmo tipo.
   * Apenas um tile por tipo de spritesheet é animado, e os demais copiam seu frame.
   * Isso garante que todos os tiles oceânicos, por exemplo, exibam ondas sincronizadas.
   *
   * Processo:
   * 1. Identifica tiles únicos por spritesheet source
   * 2. Anima apenas um tile de cada tipo
   * 3. Sincroniza os demais tiles copiando currentFrame e accumulator
   * 4. Renderiza todos os tiles com drawWorldMap
   *
   * @example
   * ```typescript
   * // No loop de jogo
   * tileMap.update(canvas, context, deltaTime);
   * ```
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

  /**
   * Retorna o tile na posição do clique do mouse.
   *
   * @param {number} mouseX - Coordenada X do mouse no canvas
   * @param {number} mouseY - Coordenada Y do mouse no canvas
   * @param {HTMLCanvasElement} canvas - Elemento canvas
   *
   * @returns {Tile | null} Tile clicado ou null se nenhum tile foi encontrado
   *
   * @remarks
   * Itera por todos os tiles e delega a verificação de contenção de ponto
   * para o método containsPoint de cada tile. Retorna o primeiro tile encontrado.
   *
   * @example
   * ```typescript
   * const clickedTile = tileMap.getTileAtGridPosition(event.x, event.y, canvas);
   * if (clickedTile) {
   *   console.log('Tile clicado:', clickedTile);
   * }
   * ```
   *
   * @see Tile.containsPoint
   */
  public getTileAtGridPosition(
    mouseX: number,
    mouseY: number,
    canvas: HTMLCanvasElement
  ): Tile | null {
    // Itera pelos tiles para encontrar qual contém o clique
    for (let row = 0; row < this._tiles.length; row++) {
      for (let col = 0; col < this._tiles[row].length; col++) {
        const tile = this._tiles[row][col]
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
