import Sprite from '@/arcade/core/Sprite'
import Image from '@/arcade/images/Image'

/**
 * Representa um tile isométrico.
 *
 * @class Tile
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Classe para tiles em perspectiva isométrica, com propriedades de navegabilidade,
 * caminhabilidade e elevação. Suporta renderização em formato diamante e detecção
 * de ponto.
 *
 * @extends Sprite
 *
 * @remarks
 * Tiles podem ser walkable (para unidades terrestres) e/ou navigable (para unidades marítimas).
 * A elevação afeta a renderização tridimensional do tile.
 *
 * @example
 * ```typescript
 * const tile = new Tile(64, 32, 1, 0, tileImage);
 * tile.isWalkable = true;
 * tile.elevation = 2;
 * ```
 */
export default class Tile extends Sprite {
  protected _isWalkable: boolean = true
  protected _isNavigable: boolean = true
  protected _elevation: number = 0
  protected _cost: number = 0

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
  public get isWalkable(): boolean {
    return this._isWalkable
  }
  public get isNavigable(): boolean {
    return this._isNavigable
  }
  public get elevation(): number {
    return this._elevation
  }
  public set isWalkable(value: boolean) {
    this._isWalkable = value
  }
  public set isNavigable(value: boolean) {
    this._isNavigable = value
  }
  public set elevation(value: number) {
    this._elevation = value
  }

  public set cost(value: number) {
    this._cost = value
  }

  public get cost(): number {
    return this._cost
  }

  /**
   * Renderiza o tile em formato de diamante isométrico.
   *
   * @param {CanvasRenderingContext2D} context - Contexto de renderização 2D
   *
   * @remarks
   * Aplica escala vertical e rotação para criar a forma de diamante característica
   * da projeção isométrica.
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
   * Verifica se um ponto está dentro dos limites do tile isométrico.
   *
   * @param {number} mouseX - Coordenada X do mouse
   * @param {number} mouseY - Coordenada Y do mouse
   *
   * @returns {boolean} true se o ponto está dentro do diamante, false caso contrário
   *
   * @remarks
   * Usa matemática de diamante isométrico para detecção precisa de hit.
   */
  public containsPoint(mouseX: number, mouseY: number): boolean {
    // Coordenadas relativas ao centro do tile
    const centerX = this.positionX + this.width / 2
    const centerY = this.positionY + this.height / 2
    const relX = mouseX - centerX
    const relY = mouseY - centerY

    // Verifica se está dentro do diamante isométrico
    const result =
      Math.abs(relX / (this.width / 2)) + Math.abs(relY / (this.height / 2)) <=
      1

    return result
  }

  /**
   * Cria uma cópia profunda do tile.
   *
   * @returns {Tile} Nova instância de Tile com as mesmas propriedades
   *
   * @remarks
   * Mantém sincronização do estado de animação (frame e acumulador) para
   * garantir que tiles clonados animem em sincronia.
   *
   * @example
   * ```typescript
   * const originalTile = new Tile(64, 32, 4, 200, image);
   * const clonedTile = originalTile.clone();
   * ```
   */
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
    clonedTile.cost = this.cost
    return clonedTile
  }
}
