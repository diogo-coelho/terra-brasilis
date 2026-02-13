import ImageError from '../errors/ImageError'
import { ImageResizePayload, Position } from '../types'

/**
 * Gerenciador de imagens com suporte a carregamento, redimensionamento e animação de posição.
 *
 * @class Image
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-01-15
 *
 * @description
 * A classe Image encapsula toda a funcionalidade de manipulação de imagens no jogo:
 * - Carregamento assíncrono de recursos de imagem
 * - Redimensionamento proporcional (cover e contain)
 * - Ajuste automático para cobrir canvas (setImageAsCover)
 * - Sistema de posição com interpolação suave
 * - Animação de movimento entre posições alvo
 * - Validação de carregamento
 *
 * A classe gerencia automaticamente as dimensões naturais da imagem e permite
 * redimensionamento mantendo proporções. Suporta animações de movimento
 * independentes de frame rate através do deltaTime.
 *
 * @remarks
 * Sempre verifique se a imagem está carregada com isLoaded() antes de
 * realizar operações de renderização ou manipulação.
 *
 * @example
 * ```typescript
 * const backgroundImage = new Image('assets/background.png', 800, 600);
 *
 * // Aguardar carregamento
 * if (backgroundImage.isLoaded()) {
 *   backgroundImage.setImageAsCover(canvas);
 *   backgroundImage.initialPosition(0, -100);
 *   backgroundImage.setTargetPosition(0, 0);
 * }
 *
 * // No loop do jogo
 * backgroundImage.updatePosition(deltaTime);
 * context.drawImage(
 *   backgroundImage.image,
 *   backgroundImage.positionX,
 *   backgroundImage.positionY
 * );
 * ```
 *
 * @see HTMLImageElement
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
   * Verifica se a imagem foi carregada completamente e está pronta para uso.
   *
   * @returns {boolean} `true` se a imagem estiver carregada, `false` caso contrário
   *
   * @remarks
   * Valida múltiplas condições para garantir que a imagem está pronta:
   * - A referência não é null
   * - É uma instância válida de HTMLImageElement
   * - A propriedade complete é true
   * - A largura natural não é zero (indica erro de carregamento)
   *
   * Sempre verifique este método antes de realizar operações que dependem
   * da imagem estar carregada.
   *
   * @example
   * ```typescript
   * if (image.isLoaded()) {
   *   context.drawImage(image.image, 0, 0);
   * }
   * ```
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
   * Redimensiona a imagem para cobrir todo o canvas mantendo proporções.
   *
   * @param {HTMLCanvasElement} canvas - Canvas de referência para dimensões
   *
   * @returns {void}
   *
   * @remarks
   * Comportamento similar ao CSS `background-size: cover`:
   * - A imagem cobre completamente o canvas
   * - Mantém proporções originais (aspect ratio)
   * - Partes da imagem podem ficar fora do canvas se proporções diferirem
   *
   * Calcula a escala necessária comparando as proporções do canvas e da imagem,
   * usando a maior escala para garantir cobertura total.
   *
   * Não executa se a imagem não estiver carregada.
   *
   * @example
   * ```typescript
   * const background = new Image('background.jpg');
   * if (background.isLoaded()) {
   *   background.setImageAsCover(canvas);
   * }
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
   * Redimensiona a imagem proporcionalmente baseado em largura ou altura alvo.
   *
   * @param {ImageResizePayload} params - Parâmetros de redimensionamento
   * @param {number} [params.targetWidth] - Largura alvo (obrigatório para option='cover')
   * @param {number} [params.targetHeight] - Altura alvo (obrigatório para option='contain')
   * @param {'cover' | 'contain'} [params.option='cover'] - Modo de redimensionamento
   *
   * @returns {void}
   *
   * @throws {ImageError} Se parâmetros necessários não forem fornecidos
   *
   * @remarks
   * **Modo 'cover':**
   * - Define a largura como targetWidth
   * - Calcula altura mantendo proporção (ratio = altura/largura)
   * - Requer targetWidth
   *
   * **Modo 'contain':**
   * - Define a altura como targetHeight
   * - Calcula largura mantendo proporção (ratio = largura/altura)
   * - Requer targetHeight
   *
   * @example
   * ```typescript
   * // Redimensionar por largura
   * image.resizeProportionally({ targetWidth: 500, option: 'cover' });
   *
   * // Redimensionar por altura
   * image.resizeProportionally({ targetHeight: 300, option: 'contain' });
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
   * @param {number} positionX - A posição X inicial da imagem.
   * @param {number} positionY - A posição Y inicial da imagem.
   * @returns {void}
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
   * Define a posição alvo da imagem.
   * @param {number} positionX - A posição X alvo da imagem.
   * @param {number} positionY - A posição Y alvo da imagem.
   * @returns {void}
   */
  public setTargetPosition(positionX: number, positionY: number): void {
    this._positionTargetX = positionX
    this._positionTargetY = positionY
  }

  /**
   * Atualiza a posição da imagem movendo-a gradualmente em direção à posição alvo.
   *
   * @param {number} deltaTime - Tempo decorrido desde o último frame (em segundos)
   * @param {number} [speed] - Velocidade opcional (não utilizada atualmente)
   *
   * @returns {void}
   *
   * @remarks
   * Implementa interpolação linear para movimento suave:
   * - Calcula direção do movimento usando Math.sign
   * - Aplica velocidade (speed) multiplicada por deltaTime
   * - Garante que não ultrapasse a posição alvo
   *
   * Fórmula:
   * ```
   * nova_posição = posição_atual + (speed * deltaTime * direção)
   * ```
   *
   * Só executa se initialPosition() foi chamado (_initialized = true).
   *
   * @example
   * ```typescript
   * // No loop do jogo
   * image.updatePosition(deltaTime);
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
