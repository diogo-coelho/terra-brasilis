import Sprite from '@/arcade/core/Sprite'
import Image from '@/arcade/images/Image'

/**
 * Tile isométrico com renderização em forma de diamante para jogos 2D isométricos.
 *
 * @class Tile
 * @extends Sprite
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe Tile representa um bloco individual em um mapa isométrico, estendendo
 * a funcionalidade de Sprite para suportar a projeção isométrica (visão 2.5D).
 *
 * **Características Principais:**
 * - Renderização em perspectiva isométrica (forma de diamante)
 * - Suporte a animação de tiles (água, lava, vegetação animada)
 * - Posicionamento baseado em grid isométrico
 * - Transformação automática de coordenadas 2D para isométricas
 * - Integração com spritesheets de terreno
 *
 * **Sistema Isométrico:**
 * Ao contrário de sprites normais, tiles isométricos usam uma projeção onde:
 * - Eixo X é rotacionado 45° para a direita
 * - Eixo Y é rotacionado 45° para a esquerda
 * - Escala Y é reduzida em 50% para criar profundidade
 * - Resulta em visual de diamante característico
 *
 * **Posicionamento:**
 * - tilePositionX/Y: Coordenadas no grid lógico do mapa (ex: tile [3,5])
 * - width/height: Dimensões do tile em pixels
 * - As coordenadas de tela são calculadas pela projeção isométrica
 *
 * **Tipos Comuns de Tiles:**
 * - Terreno: grama, terra, pedra, areia
 * - Água: tiles animados com ondulação
 * - Elevação: tiles de diferentes alturas
 * - Decoração: árvores, rochas, construções
 *
 * @param {number} width - Largura do tile em pixels (normalmente 64px)
 * @param {number} height - Altura do tile em pixels (normalmente 32px para ratio 2:1)
 * @param {number} frames - Número de frames para tiles animados (1 = estático)
 * @param {number} tilePositionX - Posição X no grid do mapa (coordenada lógica)
 * @param {number} tilePositionY - Posição Y no grid do mapa (coordenada lógica)
 * @param {number} durationPerFrame - Duração total da animação em ms (0 = sem animação)
 * @param {Image} [spritesheet] - Imagem do spritesheet de terreno (opcional)
 *
 * @example
 * ```typescript
 * // Tile estático de grama (sem animação)
 * const grassSheet = new Image('assets/terrain.png');
 * const grassTile = new Tile(
 *   64,        // Largura padrão
 *   32,        // Altura padrão (ratio 2:1 isométrico)
 *   1,         // 1 frame = sem animação
 *   0,         // Posição X no grid
 *   0,         // Posição Y no grid
 *   0,         // Sem duração (não anima)
 *   grassSheet
 * );
 *
 * // Renderizar
 * grassTile.drawDiamond(context);
 * ```
 *
 * @example
 * ```typescript
 * // Tile animado de água com 4 frames
 * const waterSheet = new Image('assets/water-animated.png');
 * const waterTile = new Tile(
 *   64,         // Largura
 *   32,         // Altura
 *   4,          // 4 frames de animação
 *   5,          // Posição X = 5
 *   3,          // Posição Y = 3
 *   1200,       // Animação completa em 1.2 segundos
 *   waterSheet
 * );
 *
 * // No game loop
 * function update(time: number) {
 *   waterTile.animate(time);
 *   waterTile.drawDiamond(context);
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Criar mapa isométrico 5x5
 * const terrainSheet = new Image('assets/terrain-tileset.png');
 * const mapTiles: Tile[][] = [];
 *
 * for (let y = 0; y < 5; y++) {
 *   mapTiles[y] = [];
 *   for (let x = 0; x < 5; x++) {
 *     mapTiles[y][x] = new Tile(64, 32, 1, x, y, 0, terrainSheet);
 *   }
 * }
 *
 * // Renderizar mapa (ordem importante: back-to-front)
 * function renderMap() {
 *   for (let y = 0; y < 5; y++) {
 *     for (let x = 0; x < 5; x++) {
 *       mapTiles[y][x].drawDiamond(context);
 *     }
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Trocar textura do tile dinamicamente
 * const tile = new Tile(64, 32, 1, 2, 3, 0);
 *
 * const grassTexture = new Image('grass.png');
 * const dirtTexture = new Image('dirt.png');
 *
 * // Inicialmente grama
 * tile.setTileSpritesheet(grassTexture);
 * tile.drawDiamond(context);
 *
 * // Mudar para terra
 * tile.setTileSpritesheet(dirtTexture);
 * tile.drawDiamond(context);
 * ```
 *
 * @see Sprite
 * @see Image
 */
export default class Tile extends Sprite {
  protected _isWalkable: boolean = true
  protected _isNavigable: boolean = true
  protected _elevation: number = 0

  constructor(
    width: number,
    height: number,
    frames: number,
    durationPerFrame: number,
    spritesheet?: Image
  ) {
    super(
      spritesheet as unknown as Image,
      width,
      height,
      frames,
      0,
      0,
      durationPerFrame
    )
  }

  /**
   * Indica se o tile pode ser atravessado por personagens.
   * @return {boolean} true se o tile for caminhável, false caso contrário
   */
  public get isWalkable(): boolean {
    return this._isWalkable
  }

  /**
   * Indica se o tile pode ser navegado por personagens (considerando obstáculos).
   * @return {boolean} true se o tile for navegável, false caso contrário
   */
  public get isNavigable(): boolean {
    return this._isNavigable
  }

  /**
   * Retorna a elevação do tile em unidades de altura.
   * @return {number} Valor da elevação (ex: 0 = nível do chão, 1 = 1 unidade acima)
   */
  public get elevation(): number {
    return this._elevation
  }

  /**
   * Define se o tile pode ser atravessado por personagens.
   * @param {boolean} value - true para tornar o tile caminhável, false caso contrário
   */
  public set isWalkable(value: boolean) {
    this._isWalkable = value
  }

  /**
   * Define se o tile pode ser navegado por personagens (considerando obstáculos).
   * @param {boolean} value - true para tornar o tile navegável, false caso contrário
   */
  public set isNavigable(value: boolean) {
    this._isNavigable = value
  }

  /**
   * Define a elevação do tile em unidades de altura.
   * @param {number} value - Valor da elevação (ex: 0 = nível do chão, 1 = 1 unidade acima)
   */
  public set elevation(value: number) {
    this._elevation = value
  }

  /**
   * Renderiza o tile com projeção isométrica (forma de diamante).
   *
   * @param {CanvasRenderingContext2D} context - Contexto 2D do canvas
   *
   * @returns {void}
   *
   * @remarks
   * Este método aplica transformações matemáticas para converter o tile
   * retangular em formato de diamante isométrico:
   *
   * **Transformações Aplicadas:**
   * 1. **save()**: Salva estado atual do contexto
   * 2. **scale(1, 0.5)**: Achata verticalmente em 50% (cria profundidade)
   * 3. **rotate(45°)**: Rotaciona 45 graus (forma o diamante)
   * 4. **draw()**: Renderiza o sprite com as transformações
   * 5. **restore()**: Restaura contexto original (não afeta outros desenhos)
   *
   * **Validações:**
   * - Verifica se spritesheet existe
   * - Verifica se imagem está carregada
   * - Retorna silenciosamente se inválido
   *
   * **Ordem de Renderização:**
   * Em mapas isométricos, renderize de trás para frente:
   * ```
   * for (y de 0 até altura)
   *   for (x de 0 até largura)
   *     renderizar tile[y][x]
   * ```
   *
   * **Performance:**
   * - Usa save/restore para isolar transformações
   * - Não desenha se textura não estiver pronta
   * - Transformações são aplicadas pela GPU
   *
   * @example
   * ```typescript
   * // Renderização simples
   * tile.drawDiamond(context);
   * ```
   *
   * @example
   * ```typescript
   * // Renderizar mapa isométrico completo
   * function renderIsometricMap(tiles: Tile[][]) {
   *   context.clearRect(0, 0, canvas.width, canvas.height);
   *
   *   // Renderizar de trás para frente para oclusão correta
   *   for (let y = 0; y < tiles.length; y++) {
   *     for (let x = 0; x < tiles[y].length; x++) {
   *       tiles[y][x].drawDiamond(context);
   *     }
   *   }
   * }
   * ```
   *
   * @example
   * ```typescript
   * // Com animação e lógica de visibilidade
   * function renderAnimatedTile(tile: Tile, time: number) {
   *   if (tile.shown) {
   *     tile.animate(time);
   *     tile.drawDiamond(context);
   *   }
   * }
   * ```
   */
  public drawDiamond(context: CanvasRenderingContext2D): void {
    if (!this.spritesheet || !this.spritesheet.isLoaded()) {
      return
    }
    // Lógica para desenhar o tile em forma de diamante
    context.save()
    // Escala Y para achatar a imagem
    context.scale(1, 0.5)
    // Rotaciona 45 graus para formar o diamante
    context.rotate((45 * Math.PI) / 180)
    // Desenha a imagem do spritesheet
    this.draw(context, false)
    // Restaura o contexto para evitar afetar outros desenhos
    context.restore()
  }

  /**
   * Verifica se um ponto (mouseX, mouseY) está dentro da área do tile isométrico (diamante).
   *
   * @param {number} mouseX - Coordenada X do mouse
   * @param {number} mouseY - Coordenada Y do mouse
   * @returns {boolean} true se o ponto está dentro do tile, false caso contrário
   *
   * @remarks
   * Usa a fórmula matemática do diamante isométrico:
   * |relX / (width/2)| + |relY / (height/2)| <= 1
   */
  public containsPoint(mouseX: number, mouseY: number): boolean {
    // Coordenadas relativas ao centro do tile
    const relX = mouseX - (this.positionX - this.width / 2)
    const relY = mouseY - this.positionY

    // Verifica se está dentro do diamante isométrico
    return (
      Math.abs(relX / (this.width / 2)) + Math.abs(relY / (this.height / 2)) <=
      1
    )
  }

  public clone(): Tile {
    const clonedTile = new Tile(
      this.width,
      this.height,
      this._frames,
      this._frameDuration,
      this.spritesheet as Image
    )

    // Copia o estado de animação para manter sincronização
    clonedTile.currentFrame = this.currentFrame
    clonedTile.accumulator = this.accumulator

    // Copia propriedades específicas do Tile
    clonedTile.isWalkable = this.isWalkable
    clonedTile.isNavigable = this.isNavigable
    clonedTile.elevation = this.elevation

    return clonedTile
  }
}
