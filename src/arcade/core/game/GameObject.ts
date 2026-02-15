import { MS_PER_UNIT } from '@/arcade/constants'

/**
 * Classe base para todos os objetos do jogo.
 *
 * @class GameObject
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Fornece propriedades e métodos fundamentais para objetos de jogo, incluindo
 * posição, dimensões, cores, e controle de animação por frames.
 * Serve como classe base para sprites, tiles, unidades e outros elementos visuais.
 *
 * @remarks
 * Esta classe gerencia o sistema de animação por frames, incluindo duração,
 * acumuladores de tempo e delays customizáveis entre frames.
 *
 * @see Sprite
 * @see Tile
 * @see Unit
 */
export default class GameObject {
  private _positionX: number = 0
  private _positionY: number = 0
  private _width: number
  private _height: number
  private _color: string = '#FFFFFF'
  private _backgroundColor: string = '#000000'
  private _shouldUsePointerCursor: boolean = false
  protected _frames: number = 0
  protected _currentFrame: number = 0
  protected _frameDuration: number = 0
  protected _accumulator: number = 0
  protected _frameDelay: number = 0

  constructor(width: number, height: number) {
    this._width = width
    this._height = height
  }

  public set positionX(x: number) {
    this._positionX = x
  }

  public set positionY(y: number) {
    this._positionY = y
  }

  public get positionX(): number {
    return this._positionX
  }

  public get positionY(): number {
    return this._positionY
  }

  public get width(): number {
    return this._width
  }

  public get height(): number {
    return this._height
  }

  public set width(value: number) {
    this._width = value
  }

  public set height(value: number) {
    this._height = value
  }

  public set color(color: string) {
    this._color = color
  }

  public get color(): string {
    return this._color
  }

  public set backgroundColor(color: string) {
    this._backgroundColor = color
  }

  public get backgroundColor(): string {
    return this._backgroundColor
  }

  public set shouldUsePointerCursor(value: boolean) {
    this._shouldUsePointerCursor = value
  }

  public get shouldUsePointerCursor(): boolean {
    return this._shouldUsePointerCursor
  }

  public set frameDelay(value: number) {
    this._frameDelay = value
  }

  public get frameDelay(): number {
    return this._frameDelay
  }

  public set currentFrame(frame: number) {
    this._currentFrame = frame
  }

  public get currentFrame(): number {
    return this._currentFrame
  }

  public set accumulator(value: number) {
    this._accumulator = value
  }

  public get accumulator(): number {
    return this._accumulator
  }

  /**
   * Inicializa o sistema de animação por frames.
   *
   * @param {number} frames - Número total de frames na animação
   * @param {number} totalDuration - Duração total da animação em milissegundos
   *
   * @remarks
   * Calcula automaticamente a duração de cada frame baseado no total de frames
   * e na duração total especificada.
   */
  public initializeFrames(frames: number, totalDuration: number) {
    this._frames = frames
    this._frameDuration =
      frames > 0 ? (totalDuration * MS_PER_UNIT) / frames / 1000 : 0
    this._accumulator = 0
  }

  /**
   * Atualiza o frame atual da animação baseado no tempo decorrido.
   *
   * @param {number} deltaTime - Tempo decorrido desde a última atualização em segundos
   *
   * @returns {number} Índice do frame atual
   *
   * @remarks
   * Utiliza um acumulador para controlar o tempo e avançar os frames.
   * Considera frameDelay adicional se configurado. Loop automático ao final.
   */
  public update(deltaTime: number): number {
    if (this._frames <= 1 || this._frameDuration <= 0) {
      return this._currentFrame
    }

    this._accumulator += deltaTime
    // Considera frameDelay extra, se definido
    const totalFrameTime =
      this._frameDuration + (this._frameDelay > 0 ? this._frameDelay : 0)

    if (this._accumulator >= totalFrameTime) {
      this._accumulator -= totalFrameTime
      this._currentFrame =
        this._currentFrame < this._frames - 1 ? this._currentFrame + 1 : 0
    }
    return this._currentFrame
  }
}
