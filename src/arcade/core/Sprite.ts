import { Image } from '@/arcade/images'
import GameObject from '@/arcade/core/game/GameObject'

/**
 * Representa um sprite animado do jogo.
 *
 * @class Sprite
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Classe que gerencia sprites animados, incluindo animação de frames,
 * renderização com sombra e controle de visibilidade. Extende GameObject
 * para herdar propriedades básicas de objetos do jogo.
 *
 * @extends GameObject
 *
 * @remarks
 * Sprites podem ter spritesheets associadas, animações baseadas em frames,
 * e suporte a renderização de sombras dinâmicas.
 *
 * @example
 * ```typescript
 * const sprite = new Sprite(image, 64, 64, 4, 0, 0, 1000);
 * sprite.setPosition(100, 200);
 * sprite.draw(context, true);
 * ```
 */
export default class Sprite extends GameObject {
  private _spritesheet: Image | null = null
  private _offsetX: number = 0
  private _offsetY: number = 0
  private _shadow: CanvasRenderingContext2D | null = null
  private _zoomLevel: number = 1
  private _shown: boolean = true
  private _isSelected: boolean = false

  constructor(
    source: Image,
    width: number,
    height: number,
    frames: number,
    offsetX: number,
    offsetY: number,
    totalDuration: number
  ) {
    super(width, height)
    this._spritesheet = source
    this._offsetX = offsetX
    this._offsetY = offsetY
    this.initializeFrames(frames, totalDuration)
  }

  public set shown(value: boolean) {
    this._shown = value
  }

  public get shown(): boolean {
    return this._shown
  }

  public get spritesheet(): Image | null {
    return this._spritesheet
  }

  /**
   * Define a spritesheet do sprite.
   *
   * @param {Image} source - Imagem da spritesheet a ser utilizada
   */
  public setSpritesheet(source: Image): void {
    this._spritesheet = source
  }

  /**
   * Define a posição do sprite no canvas.
   *
   * @param {number} x - Coordenada X
   * @param {number} y - Coordenada Y
   */
  public setPosition(x: number, y: number): void {
    this.positionX = x
    this.positionY = y
  }

  /**
   * Define o deslocamento (offset) na spritesheet.
   *
   * @param {number} offsetX - Deslocamento horizontal em pixels
   * @param {number} offsetY - Deslocamento vertical em pixels
   */
  public setOffset(offsetX: number, offsetY: number): void {
    this._offsetX = offsetX
    this._offsetY = offsetY
  }

  /**
   * Define apenas o deslocamento vertical (offsetY) na spritesheet.
   *
   * @param {number} offsetY - Deslocamento vertical em pixels
   *
   * @remarks
   * Útil para alterar a linha da spritesheet sem afetar o frame atual (offsetX).
   */
  public setOffsetY(offsetY: number): void {
    this._offsetY = offsetY
  }

  public set selected(value: boolean) {
    this._isSelected = value
  }

  public get selected(): boolean {
    return this._isSelected
  }

  /**
   * Anima o sprite atualizando o frame baseado no deltaTime.
   *
   * @param {number} deltaTime - Tempo decorrido desde o último frame em segundos
   *
   * @remarks
   * Calcula qual frame deve ser exibido e atualiza o offset X na spritesheet.
   */
  public animate(deltaTime: number): void {
    if (!this._frames) return

    const frameIndex = this.update(deltaTime)
    this._offsetX = frameIndex * this.width
  }

  /**
   * Renderiza o sprite no canvas.
   *
   * @param {CanvasRenderingContext2D} context - Contexto de renderização 2D do canvas
   * @param {boolean} drawShadow - Define se deve desenhar a sombra do sprite
   *
   * @remarks
   * A sombra é gerada dinamicamente convertendo a imagem para preto e aplicando
   * transparência. A sombra é cache para melhorar a performance.
   *
   * @example
   * ```typescript
   * sprite.draw(context, true); // Com sombra
   * sprite.draw(context, false); // Sem sombra
   * ```
   */
  public draw(context: CanvasRenderingContext2D, drawShadow: boolean): void {
    if (this._shown) {
      if (drawShadow) {
        if (this._shadow === null) {
          const canvas = document.createElement('canvas')
          var contextCanvas = canvas.getContext('2d')

          if (!contextCanvas) {
            return
          }

          canvas.width = this.width
          canvas.height = this.height
          this._shadow = contextCanvas

          if (this._spritesheet && this._spritesheet.isLoaded()) {
            contextCanvas.drawImage(
              this._spritesheet.image as HTMLImageElement,
              this._offsetX,
              this._offsetY,
              this.width,
              this.height,
              0,
              0,
              this.width,
              this.height
            )

            const imageData = contextCanvas.getImageData(
              0,
              0,
              this.width,
              this.height
            )

            for (var i = 0, len = imageData.data.length; i < len; i += 4) {
              imageData.data[i] = 0 // Red
              imageData.data[i + 1] = 0 // Green
              imageData.data[i + 2] = 0 // Blue
            }

            contextCanvas.clearRect(0, 0, canvas.width, canvas.height)
            contextCanvas.putImageData(imageData, 0, 0)
          }
        }

        context.save()
        context.globalAlpha = 0.1
        var shadowWidth = this.width * this._zoomLevel
        var shadowHeight = this.height * this._zoomLevel
        context.drawImage(
          this._shadow?.canvas as HTMLCanvasElement,
          this.positionX,
          this.positionY + shadowHeight / 2,
          shadowWidth,
          shadowHeight
        )
        context.restore()
      }

      context.drawImage(
        this._spritesheet?.image as HTMLImageElement,
        this._offsetX,
        this._offsetY,
        this.width,
        this.height,
        this.positionX,
        this.positionY,
        this.width * this._zoomLevel,
        this.height * this._zoomLevel
      )
    }
  }

  public drawWithOutline(
    context: CanvasRenderingContext2D,
    outlineColor: string,
    outlineWidth: number = 2
  ): void {
    if (this._shown && this.selected) {
      // Cria canvas temporário para gerar silhueta colorida
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = this.width * this._zoomLevel
      tempCanvas.height = this.height * this._zoomLevel
      const tempContext = tempCanvas.getContext('2d')

      if (!tempContext || !this._spritesheet) return

      // Desenha o sprite no canvas temporário
      tempContext.drawImage(
        this._spritesheet.image as HTMLImageElement,
        this._offsetX,
        this._offsetY,
        this.width,
        this.height,
        0,
        0,
        this.width * this._zoomLevel,
        this.height * this._zoomLevel
      )

      // Preenche com a cor mantendo apenas o canal alpha (transparência)
      tempContext.globalCompositeOperation = 'source-in'
      tempContext.fillStyle = outlineColor
      tempContext.fillRect(0, 0, tempCanvas.width, tempCanvas.height)

      context.save()

      // Gera offsets circulares baseados na largura do outline
      const offsets: [number, number][] = []
      const steps = 8 // Número de pontos ao redor do círculo

      for (let angle = 0; angle < Math.PI * 2; angle += (Math.PI * 2) / steps) {
        const dx = Math.round(Math.cos(angle) * outlineWidth)
        const dy = Math.round(Math.sin(angle) * outlineWidth)
        offsets.push([dx, dy])
      }

      // Desenha a silhueta colorida em cada offset para criar o contorno
      offsets.forEach(([dx, dy]) => {
        context.drawImage(tempCanvas, this.positionX + dx, this.positionY + dy)
      })

      context.restore()
    }
  }
}
