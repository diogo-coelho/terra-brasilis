import ImageError from '../errors/ImageError'
import { ImageResizePayload, Position } from '../types'

/**
 * Gerenciador de imagens do jogo.
 *
 * @class Image
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Classe responsável por carregar, redimensionar e posicionar imagens.
 * Oferece funcionalidades para movimento suave, redimensionamento proporcional
 * e ajuste automático para cobrir canvas.
 *
 * @remarks
 * Encapsula HTMLImageElement fornecendo controle avançado de posicionamento
 * e redimensionamento para uso em jogos.
 *
 * @example
 * ```typescript
 * const background = new Image('assets/bg.png', 800, 600);
 * background.initialPosition(0, 0);
 * background.setTargetPosition(100, 50);
 * background.updatePosition(deltaTime);
 * ```
 */
export default class Image {
  private _image: HTMLImageElement | null = null
  private _positionY: number = 0
  private _positionTargetY: number = 0
  private _positionX: number = 0
  private _positionTargetX: number = 0
  private _speed: number = 200
  private _initialized: boolean = false

  constructor(src: string, width?: number, height?: number) {
    this._image = new window.Image()
    this._image.src = src
    this._image.width = width || this._image.naturalWidth
    this._image.height = height || this._image.naturalHeight
  }

  public get image(): HTMLImageElement | null {
    return this._image
  }

  public get positionX(): number {
    return this._positionX
  }

  public get positionY(): number {
    return this._positionY
  }

  public set speed(value: number) {
    this._speed = value
  }

  public get speed(): number {
    return this._speed
  }

  /**
   * Verifica se a imagem foi carregada completamente.
   *
   * @returns {boolean} true se carregada, false caso contrário
   *
   * @remarks
   * Valida se a imagem é um HTMLImageElement, está completa e possui dimensões naturais.
   */
  public isLoaded(): boolean {
    return (
      this._image !== null &&
      this._image instanceof HTMLImageElement &&
      this._image.complete &&
      this._image.naturalWidth !== 0
    )
  }

  /**
   * Ajusta a imagem para cobrir o canvas mantendo proporções.
   *
   * @param {HTMLCanvasElement} canvas - Canvas a ser coberto
   *
   * @remarks
   * Calcula a escala necessária para cobrir completamente o canvas
   * sem distorcer a imagem (modo 'cover').
   *
   * @example
   * ```typescript
   * const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
   * background.setImageAsCover(canvas);
   * ```
   */
  public setImageAsCover(canvas: HTMLCanvasElement): void {
    if (this._image === null || !this.isLoaded()) return

    const scale = Math.max(
      canvas.width / this._image!.naturalWidth,
      canvas.height / this._image!.naturalHeight
    )

    this._image.width = this._image!.naturalWidth * scale
    this._image.height = this._image!.naturalHeight * scale
  }

  /**
   * Redimensiona a imagem proporcionalmente.
   *
   * @param {ImageResizePayload} payload - Configuração de redimensionamento
   * @param {number} [payload.targetWidth] - Largura alvo
   * @param {number} [payload.targetHeight] - Altura alvo
   * @param {'cover' | 'contain'} [payload.option='cover'] - Modo de redimensionamento
   *
   * @throws {ImageError} Quando nenhuma dimensão alvo é fornecida
   * @throws {ImageError} Quando targetWidth não é fornecido para 'cover'
   * @throws {ImageError} Quando targetHeight não é fornecido para 'contain'
   *
   * @remarks
   * - 'cover': Redimensiona baseado na largura
   * - 'contain': Redimensiona baseado na altura
   *
   * @example
   * ```typescript
   * image.resizeProportionally({ targetWidth: 400, option: 'cover' });
   * ```
   */
  public resizeProportionally({
    targetWidth,
    targetHeight,
    option = 'cover',
  }: ImageResizePayload): void {
    if (this._image === null || !this.isLoaded()) return
    if (!targetWidth && !targetHeight) {
      throw new ImageError(
        'Either targetWidth or targetHeight must be provided.'
      )
    }

    switch (option) {
      case 'cover': {
        if (!targetWidth)
          throw new ImageError('targetWidth is required for cover option.')

        const ratioWidth = this._image.naturalHeight / this._image.naturalWidth
        this._image.width = targetWidth
        this._image.height = targetWidth * ratioWidth
        break
      }
      case 'contain': {
        if (!targetHeight)
          throw new ImageError('targetHeight is required for contain option.')

        const ratioHeight = this._image.naturalWidth / this._image.naturalHeight
        this._image.height = targetHeight
        this._image.width = targetHeight * ratioHeight
        break
      }
    }
  }

  /**
   * Define a posição inicial da imagem.
   *
   * @param {number} positionX - Posição X inicial
   * @param {number} positionY - Posição Y inicial
   * @returns {Position} Objeto com as coordenadas x e y
   *
   * @throws {ImageError} Quando a imagem não foi carregada
   *
   * @remarks
   * Só define a posição na primeira chamada. Chamadas subsequentes
   * retornam a posição atual sem alterá-la.
   *
   * @example
   * ```typescript
   * const pos = sprite.initialPosition(100, 200);
   * console.log(pos.x, pos.y); // 100, 200
   * ```
   */
  public initialPosition(positionX: number, positionY: number): Position {
    if (!this.isLoaded()) {
      throw new ImageError('Image must be loaded to get its initial position.')
    }
    if (!this._initialized) {
      this._positionX = positionX || 0
      this._positionY = positionY || 0
      this._initialized = true
    }

    return {
      x: this._positionX,
      y: this._positionY,
    }
  }

  /**
   * Define a posição alvo para movimento suave.
   *
   * @param {number} positionX - Posição X de destino
   * @param {number} positionY - Posição Y de destino
   *
   * @remarks
   * A imagem se moverá gradualmente da posição atual para a posição alvo
   * quando updatePosition() for chamado.
   */
  public setTargetPosition(positionX: number, positionY: number): void {
    this._positionTargetX = positionX
    this._positionTargetY = positionY
  }

  /**
   * Atualiza a posição da imagem em direção à posição alvo.
   *
   * @param {number} deltaTime - Tempo decorrido desde o último frame (em segundos)
   * @param {number} [speed] - Velocidade de movimento (opcional)
   *
   * @remarks
   * Calcula movimento suave baseado em deltaTime e velocidade configurada.
   * Para automaticamente quando alcança a posição alvo.
   *
   * @example
   * ```typescript
   * function gameLoop(deltaTime: number) {
   *   sprite.updatePosition(deltaTime);
   * }
   * ```
   */
  public updatePosition(deltaTime: number, speed?: number): void {
    if (this._initialized) {
      this._positionX +=
        this._speed *
        deltaTime *
        Math.sign(this._positionTargetX - this._positionX)
      this._positionY +=
        this._speed *
        deltaTime *
        Math.sign(this._positionTargetY - this._positionY)

      if (this._positionX > this._positionTargetX) {
        this._positionX = this._positionTargetX
      }

      if (this._positionY > this._positionTargetY) {
        this._positionY = this._positionTargetY
      }
    }
  }
}
