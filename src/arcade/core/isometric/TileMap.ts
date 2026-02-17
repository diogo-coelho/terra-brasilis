import Tile from '@/arcade/core/isometric/Tile'
import Camera from '@/arcade/core/Camera'

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
  protected _camera: Camera | null = null
  protected _renderOnlyInnerSquare: boolean = false

  constructor(
    tiles: Tile[][],
    tileWidth: number = 64,
    tileHeight: number = 32
  ) {
    this._tiles = tiles
    this._tileWidth = tileWidth
    this._tileHeight = tileHeight
  }

  public set camera(value: Camera | null) {
    this._camera = value
  }

  public get camera(): Camera | null {
    return this._camera
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

  public set renderOnlyInnerSquare(value: boolean) {
    this._renderOnlyInnerSquare = value
  }

  public get renderOnlyInnerSquare(): boolean {
    return this._renderOnlyInnerSquare
  }

  /**
   * Verifica se um tile está dentro do quadrado interno do grid isométrico.
   * 
   * @param {number} row - Linha do tile
   * @param {number} col - Coluna do tile
   * 
   * @returns {boolean} True se o tile está dentro do quadrado interno
   * 
   * @remarks
   * Em um grid isométrico em formato de diamante, os triângulos nas bordas
   * são formados pelos tiles nos cantos. Este método exclui esses triângulos,
   * mantendo apenas o quadrado interno.
   */
  protected isInInnerSquare(row: number, col: number): boolean {
    if (!this._renderOnlyInnerSquare) return true

    const rows = this._tiles.length
    const cols = this._tiles[0].length
    
    // Para formar um quadrado interno em um diamante isométrico,
    // excluímos tiles onde a soma row+col está fora de um intervalo
    // que representa os triângulos superiores e inferiores
    const sum = row + col
    const diff = row - col
    
    // Dimensão mínima determina o tamanho do quadrado interno
    const minDim = Math.min(rows, cols)    
    const cutSize = Math.floor(minDim / 2)
    
    // Limites para o quadrado interno  
    const minSum = cutSize
    const maxSum = rows + cols - cutSize - 1
    
    // Para grids retangulares, também limitar pela diferença
    const maxDiff = Math.abs(rows - cols) / 2 + minDim / 2
    
    return sum >= minSum && sum <= maxSum && Math.abs(diff) <= maxDiff
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
   * Se uma câmera estiver configurada, aplica culling para renderizar apenas
   * tiles visíveis, melhorando a performance.
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
    // Salva o estado do contexto
    if (this._camera) {
      context.save()
      this._camera.applyTransform(context)
    }

    for (var col = 0; col < this._tiles[0].length; col++) {
      for (var row = 0; row < this._tiles.length; row++) {
        // Verifica se o tile está no quadrado interno (se habilitado)
        if (!this.isInInnerSquare(row, col)) continue

        let tilePositionX = (row - col) * this._tileHeight
        // Centraliza o grid de forma horizontal no canvas
        tilePositionX += canvas.width / 2 - this._tileWidth / 2
        const tilePositionY = (row + col) * (this._tileHeight / 2)

        // Culling: verifica se o tile está visível pela câmera
        if (this._camera) {
          const isVisible = this._camera.isVisible(
            tilePositionX,
            tilePositionY,
            this._tileWidth,
            this._tileHeight
          )
          if (!isVisible) continue
        }

        this._tiles[row][col].setPosition(tilePositionX, tilePositionY)
        this._tiles[row][col].draw(context, false)
      }
    }

    // Restaura o estado do contexto
    if (this._camera) {
      context.restore()
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
        // Verifica se o tile está no quadrado interno (se habilitado)
        if (!this.isInInnerSquare(row, col)) continue

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
   * Se uma câmera estiver configurada, converte as coordenadas do mouse para
   * coordenadas do mundo antes de verificar.
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
    // Converte coordenadas de tela para coordenadas do mundo se a câmera existir
    let worldX = mouseX
    let worldY = mouseY
    
    if (this._camera) {
      const worldCoords = this._camera.screenToWorld(mouseX, mouseY)
      worldX = worldCoords.x
      worldY = worldCoords.y
    }

    console.log(`Mouse coordinates: mouseX: ${mouseX}, mouseY: ${mouseY}`)
    console.log(`World coordinates for mouse click: worldX: ${worldX}, worldY: ${worldY}`)

    // Itera pelos tiles na ordem inversa de renderização (front-to-back)
    // para pegar o tile visual mais próximo (desenhado por último)
    for (let col = this._tiles[0].length - 1; col >= 0; col--) {
      for (let row = this._tiles.length - 1; row >= 0; row--) {
        // Verifica se o tile está no quadrado interno (se habilitado)
        if (!this.isInInnerSquare(row, col)) continue
        
        const tile = this._tiles[row][col]
        
        // Calcula a posição do tile (mesma fórmula do drawWorldMap)
        let tilePositionX = (row - col) * this._tileHeight
        tilePositionX += canvas.width / 2 - this._tileWidth / 2
        const tilePositionY = (row + col) * (this._tileHeight / 2)
        
        // Atualiza a posição do tile para garantir que containsPoint funcione corretamente
        tile.setPosition(tilePositionX, tilePositionY)
        
        // Delega a verificação para o próprio tile
        if (tile.containsPoint(mouseX, mouseY)) {
          return tile
        }
      }
    }

    return null
  }

  /**
   * Calcula os limites do mundo baseado nos tiles das extremidades do grid isométrico
   * e configura os limites na câmera.
   * 
   * @param {HTMLCanvasElement} canvas - Elemento canvas para calcular a centralização
   * 
   * @remarks
   * Em um grid isométrico em formato de diamante, os triângulos nas pontas são formados por:
   * - Triângulo superior (topo): row=0, col=0 (menor Y)
   * - Triângulo esquerdo: row=0, col=cols-1 (menor X)
   * - Triângulo direito: row=rows-1, col=0 (maior X)
   * - Triângulo inferior (base): row=rows-1, col=cols-1 (maior Y)
   * 
   * Este método percorre todos os tiles, identifica os extremos do diamante
   * e configura esses limites na câmera usando setWorldBounds.
   * 
   * @example
   * ```typescript
   * tileMap.camera = new Camera(800, 600);
   * tileMap.setMinAndMaxWorldXAndY(canvas);
   * ```
   */
  public setMinAndMaxWorldXAndY(canvas: HTMLCanvasElement): void {
    if (!this._camera) {
      console.warn('Câmera não configurada. Configure a câmera antes de definir os limites do mundo.')
      return
    }

    const rows = this._tiles.length
    const cols = this._tiles[0].length
    
    if (rows === 0 || cols === 0) return
    
    // Calcula o offset de centralização (mesmo usado no drawWorldMap)
    const centerOffsetX = canvas.width / 2 - this._tileWidth / 2
    
    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity
    
    // Percorre apenas os tiles do quadrado interno para encontrar os extremos
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Verifica se o tile está no quadrado interno (se habilitado)
        if (!this.isInInnerSquare(row, col)) continue
        
        // Calcula a posição isométrica do tile (mesma fórmula do drawWorldMap)
        let tileX = (row - col) * this._tileHeight
        tileX += centerOffsetX
        const tileY = (row + col) * (this._tileHeight / 2)
        
        // Atualiza os limites considerando a largura e altura do tile
        minX = Math.min(minX, tileX)
        minY = Math.min(minY, tileY)
        maxX = Math.max(maxX, tileX + this._tileWidth)
        maxY = Math.max(maxY, tileY + this._tileHeight)
      }
    }
    
    // Ajusta os limites para pegar a metade dos losangos nas bordas
    // Isso limita a câmera para criar ilusão de continuidade
    minX += this._tileWidth / 2
    maxX -= this._tileWidth / 2
    minY += this._tileHeight / 2
    maxY -= this._tileHeight / 2

    // Configura os limites ajustados na câmera
    this._camera.setWorldBounds(minX, minY, maxX, maxY)
    
    // Posiciona a câmera no limite superior ajustado
    const centerX = (minX + maxX) / 2
    this._camera.centerOn(centerX, minY)
  }
}
