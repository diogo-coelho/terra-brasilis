/**
 * Câmera para controlar a visualização do mundo do jogo.
 *
 * @class Camera
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2026-02-16
 *
 * @description
 * Gerencia o viewport do jogo, incluindo posição, movimento e zoom.
 * Permite scroll suave e delimitação de bordas do mundo.
 *
 * @example
 * ```typescript
 * const camera = new Camera(800, 600);
 * camera.setWorldBounds(0, 0, 2000, 2000);
 * camera.move(10, 0); // Move 10 pixels para direita
 * camera.applyTransform(context);
 * ```
 */
export default class Camera {
  protected _x: number = 0
  protected _y: number = 0
  protected _zoomLevel: number = 1
  protected _width: number
  protected _height: number
  protected _worldMinX: number = 0
  protected _worldMinY: number = 0
  protected _worldMaxX: number = Infinity
  protected _worldMaxY: number = Infinity
  protected _speed: number = 5

  constructor(width: number, height: number) {
    this._width = width
    this._height = height
  }

  public get x(): number {
    return this._x
  }

  public set x(value: number) {
    this._x = this.clampX(value)
  }

  public get y(): number {
    return this._y
  }

  public set y(value: number) {
    this._y = this.clampY(value)
  }

  public get width(): number {
    return this._width
  }

  public set width(value: number) {
    this._width = value
  }

  public get height(): number {
    return this._height
  }

  public set height(value: number) {
    this._height = value
  }

  public get zoomLevel(): number {
    return this._zoomLevel
  }

  public set zoomLevel(value: number) {
    this._zoomLevel = Math.max(0.1, Math.min(3, value))
  }

  public get speed(): number {
    return this._speed
  }

  public set speed(value: number) {
    this._speed = value
  }

  /**
   * Define os limites do mundo para a câmera.
   *
   * @param {number} minX - Coordenada X mínima
   * @param {number} minY - Coordenada Y mínima
   * @param {number} maxX - Coordenada X máxima
   * @param {number} maxY - Coordenada Y máxima
   */
  public setWorldBounds(minX: number, minY: number, maxX: number, maxY: number): void {
    this._worldMinX = minX
    this._worldMinY = minY
    this._worldMaxX = maxX
    this._worldMaxY = maxY
  }

  /**
   * Move a câmera pela quantidade especificada.
   *
   * @param {number} dx - Deslocamento em X
   * @param {number} dy - Deslocamento em Y
   */
  public move(dx: number, dy: number): void {
    this.x += dx * this._speed
    this.y += dy * this._speed
  }

  /**
   * Posiciona a câmera em coordenadas absolutas.
   *
   * @param {number} x - Coordenada X
   * @param {number} y - Coordenada Y
   */
  public setPosition(x: number, y: number): void {
    this.x = x
    this.y = y
  }

  /**
   * Centraliza a câmera em um ponto específico.
   *
   * @param {number} x - Coordenada X do ponto
   * @param {number} y - Coordenada Y do ponto
   */
  public centerOn(x: number, y: number): void {
    this.x = x - this._width / 2
    this.y = y - this._height / 2
  }

  /**
   * Aplica a transformação da câmera ao contexto do canvas.
   *
   * @param {CanvasRenderingContext2D} context - Contexto de renderização
   *
   * @remarks
   * Deve ser chamado antes de renderizar objetos do mundo.
   * Use save() antes e restore() depois para não afetar UI.
   */
  public applyTransform(context: CanvasRenderingContext2D): void {
    context.translate(-this._x, -this._y)
    // Zoom pode ser adicionado aqui se necessário:
    // context.scale(this._zoomLevel, this._zoomLevel)
  }

  /**
   * Converte coordenadas de tela para coordenadas do mundo.
   *
   * @param {number} screenX - Coordenada X na tela
   * @param {number} screenY - Coordenada Y na tela
   * @returns {{x: number, y: number}} Coordenadas no mundo
   */
  public screenToWorld(screenX: number, screenY: number): { x: number; y: number } {
    return {
      x: screenX + this._x,
      y: screenY + this._y
    }
  }

  /**
   * Converte coordenadas do mundo para coordenadas de tela.
   *
   * @param {number} worldX - Coordenada X no mundo
   * @param {number} worldY - Coordenada Y no mundo
   * @returns {{x: number, y: number}} Coordenadas na tela
   */
  public worldToScreen(worldX: number, worldY: number): { x: number; y: number } {
    return {
      x: worldX - this._x,
      y: worldY - this._y
    }
  }

  /**
   * Verifica se um retângulo está visível pela câmera.
   *
   * @param {number} x - Coordenada X do retângulo
   * @param {number} y - Coordenada Y do retângulo
   * @param {number} width - Largura do retângulo
   * @param {number} height - Altura do retângulo
   * @returns {boolean} True se visível
   */
  public isVisible(x: number, y: number, width: number, height: number): boolean {
    return !(
      x + width < this._x ||
      x > this._x + this._width ||
      y + height < this._y ||
      y > this._y + this._height
    )
  }

  /**
   * Limita a posição X da câmera dentro dos limites do mundo.
   */
  private clampX(value: number): number {
    const maxX = Math.max(this._worldMinX, this._worldMaxX - this._width)
    return Math.max(this._worldMinX, Math.min(maxX, value))
  }

  /**
   * Limita a posição Y da câmera dentro dos limites do mundo.
   */
  private clampY(value: number): number {
    const maxY = Math.max(this._worldMinY, this._worldMaxY - this._height)
    return Math.max(this._worldMinY, Math.min(maxY, value))
  }
}