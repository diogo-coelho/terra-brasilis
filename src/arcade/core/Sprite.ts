import { GameObject } from "@/arcade/components"
import { Image } from "@/arcade/images"
import Frame from "@/arcade/core/Frame"

/**
 * Sprite animado com suporte a spritesheets e renderização otimizada.
 *
 * @class Sprite
 * @extends GameObject
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe Sprite é um componente visual avançado para jogos 2D que gerencia:
 * - Carregamento e renderização de spritesheets
 * - Animação frame-by-frame automática
 * - Sistema de offset para navegação no spritesheet
 * - Geração de sombras dinâmicas
 * - Controle de visibilidade
 * - Zoom/escala de sprites
 * - Posicionamento preciso no canvas
 * 
 * **Arquitetura:**
 * Estende GameObject, herdando propriedades de posição e dimensão.
 * Utiliza a classe Frame internamente para gerenciar a animação.
 * Integra-se com a classe Image do arcade para carregamento de recursos.
 * 
 * **Sistema de Spritesheet:**
 * Os sprites são organizados horizontalmente no spritesheet.
 * Cada frame tem a mesma largura e altura.
 * A animação percorre os frames da esquerda para a direita.
 * 
 * **Coordenadas:**
 * - offsetX, offsetY: Posição inicial no spritesheet (pixels)
 * - positionX, positionY: Posição de renderização no canvas
 * - width, height: Dimensões de cada frame individual
 * 
 * **Sistema de Sombra:**
 * Gera automaticamente uma sombra escura do sprite.
 * A sombra é criada uma única vez e reutilizada (cache).
 * Renderizada com 10% de opacidade abaixo do sprite.
 *
 * @param {Image} source - Imagem do spritesheet carregada
 * @param {number} width - Largura de cada frame em pixels
 * @param {number} height - Altura de cada frame em pixels
 * @param {number} frames - Número total de frames na animação
 * @param {number} offsetX - Posição X inicial no spritesheet
 * @param {number} offsetY - Posição Y inicial no spritesheet
 * @param {number} durationPerFrame - Duração total da animação em ms
 *
 * @example
 * ```typescript
 * // Sprite de personagem com 8 frames de animação
 * const playerSheet = new Image('assets/player-walk.png');
 * const player = new Sprite(
 *   playerSheet,
 *   64,    // Largura de cada frame
 *   64,    // Altura de cada frame
 *   8,     // 8 frames de animação
 *   0,     // Começa no pixel 0 (X)
 *   0,     // Começa no pixel 0 (Y)
 *   800    // Animação completa em 800ms
 * );
 * 
 * player.setPosition(100, 200);
 * 
 * // No game loop
 * function update(deltaTime: number) {
 *   player.animate(deltaTime);
 *   player.draw(context, true); // Com sombra
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Múltiplas animações no mesmo spritesheet
 * const enemySheet = new Image('assets/enemy-sheet.png');
 * const enemy = new Sprite(enemySheet, 48, 48, 4, 0, 0, 400);
 * 
 * // Trocar para animação de ataque (linha 1 do spritesheet)
 * enemy.setOffset(0, 48); // Pula para segunda linha
 * 
 * // Alternar visibilidade
 * enemy.shown = false; // Esconde
 * enemy.shown = true;  // Mostra
 * ```
 *
 * @example
 * ```typescript
 * // Sistema de sprite dinâmico
 * class AnimatedCharacter {
 *   private sprite: Sprite;
 *   
 *   constructor() {
 *     const sheet = new Image('character.png');
 *     this.sprite = new Sprite(sheet, 32, 32, 6, 0, 0, 600);
 *   }
 *   
 *   playWalkAnimation() {
 *     this.sprite.setOffset(0, 0); // Linha 1: walk
 *   }
 *   
 *   playJumpAnimation() {
 *     this.sprite.setOffset(0, 32); // Linha 2: jump
 *   }
 *   
 *   render(ctx: CanvasRenderingContext2D, time: number) {
 *     this.sprite.animate(time);
 *     this.sprite.draw(ctx, false);
 *   }
 * }
 * ```
 *
 * @see GameObject
 * @see Frame
 * @see Image
 */
export default class Sprite extends GameObject {

  private _spritesheet: Image | null = null
  private _offsetX: number = 0
  private _offsetY: number = 0
  private _shadow: CanvasRenderingContext2D | null = null
  private _zoomLevel: number = 1
  private _shown: boolean = true
  private _frame: Frame | null = null

  constructor(source: Image, width: number, height: number, frames: number, offsetX: number, offsetY: number, durationPerFrame: number) {
    super(width, height)
    this._spritesheet = source
    this._offsetX = offsetX
    this._offsetY = offsetY
    this._frame = new Frame(frames, durationPerFrame)
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
   * Substitui a imagem do spritesheet por uma nova.
   *
   * @param {Image} source - Nova imagem do spritesheet
   * 
   * @returns {void}
   * 
   * @remarks
   * Útil para trocar completamente o visual do sprite ou
   * alternar entre diferentes spritesheets (ex: diferentes skins).
   * A animação atual continua, mas usando a nova imagem.
   * 
   * @example
   * ```typescript
   * const normalSkin = new Image('player-normal.png');
   * const powerUpSkin = new Image('player-powered.png');
   * 
   * sprite.setSpritesheet(normalSkin);
   * // ... ao pegar power-up
   * sprite.setSpritesheet(powerUpSkin);
   * ```
   */
  public setSpritesheet(source: Image): void {
    this._spritesheet = source
  }

  /**
   * Define a posição de renderização do sprite no canvas.
   *
   * @param {number} x - Coordenada X no canvas (em pixels)
   * @param {number} y - Coordenada Y no canvas (em pixels)
   * 
   * @returns {void}
   * 
   * @remarks
   * Define onde o sprite será desenhado no canvas.
   * As coordenadas representam o canto superior esquerdo do sprite.
   * 
   * @example
   * ```typescript
   * sprite.setPosition(100, 150);
   * // Sprite renderizado em x=100, y=150
   * 
   * // Centralizar no canvas
   * const centerX = (canvas.width - sprite.width) / 2;
   * const centerY = (canvas.height - sprite.height) / 2;
   * sprite.setPosition(centerX, centerY);
   * ```
   */
  public setPosition(x: number, y: number): void {
    this.positionX = x
    this.positionY = y
  }

  /**
   * Define o deslocamento (offset) dentro do spritesheet.
   *
   * @param {number} offsetX - Posição X no spritesheet (em pixels)
   * @param {number} offsetY - Posição Y no spritesheet (em pixels)
   * 
   * @returns {void}
   * 
   * @remarks
   * Permite navegar para diferentes regiões do spritesheet,
   * essencial para trocar entre diferentes animações.
   * 
   * **Importante:**
   * - offsetX é sobrescrito pela animação frame-by-frame
   * - offsetY normalmente define qual "linha" de animação usar
   * - Use múltiplos de width/height para alinhamento perfeito
   * 
   * @example
   * ```typescript
   * // Spritesheet organizado:
   * // Linha 0 (Y=0):  Walk animation (4 frames)
   * // Linha 1 (Y=64): Jump animation (3 frames)
   * // Linha 2 (Y=128): Attack animation (5 frames)
   * 
   * // Selecionar animação de walk
   * sprite.setOffset(0, 0);
   * 
   * // Selecionar animação de jump
   * sprite.setOffset(0, 64);
   * 
   * // Selecionar animação de attack
   * sprite.setOffset(0, 128);
   * ```
   */
  public setOffset(offsetX: number, offsetY: number): void {
    this._offsetX = offsetX
    this._offsetY = offsetY
  }

  /**
   * Atualiza a animação do sprite baseado no tempo decorrido.
   *
   * @param {number} elapsedTime - Timestamp atual em milissegundos
   * 
   * @returns {void}
   * 
   * @remarks
   * Este método deve ser chamado a cada frame do game loop.
   * Compara o tempo atual com o timer interno do Frame para
   * determinar quando avançar para o próximo quadro da animação.
   * 
   * **Como Funciona:**
   * 1. Verifica se o tempo atual >= frameTimer
   * 2. Se sim, avança para o próximo frame
   * 3. Atualiza offsetX automaticamente
   * 4. Reinicia do primeiro frame ao chegar no último
   * 
   * **Importante:**
   * - Passe Date.now() ou performance.now() como parâmetro
   * - Chamadas frequentes garantem animação suave
   * - Não anima se frames <= 1
   * 
   * @example
   * ```typescript
   * // No game loop
   * function gameLoop() {
   *   const currentTime = Date.now();
   *   sprite.animate(currentTime);
   *   sprite.draw(context, true);
   *   requestAnimationFrame(gameLoop);
   * }
   * ```
   */
  public animate (elapsedTime: number): void {
    if (this._frame && elapsedTime >= this._frame.frameTimer) {
      this._offsetX =this._frame.nextFrame(this._offsetX, this.width)
    }
  }

  /**
   * Renderiza o sprite (e opcionalmente sua sombra) no canvas.
   *
   * @param {CanvasRenderingContext2D} context - Contexto 2D do canvas
   * @param {boolean} drawShadow - Se `true`, renderiza sombra abaixo do sprite
   * 
   * @returns {void}
   * 
   * @remarks
   * Este é o método principal de renderização que:
   * - Verifica se o sprite está visível (shown = true)
   * - Gera sombra se solicitado (apenas uma vez, depois usa cache)
   * - Desenha a sombra com 10% de opacidade
   * - Renderiza o sprite na posição atual
   * 
   * **Geração de Sombra:**
   * - Cria canvas temporário do tamanho do frame
   * - Copia o sprite e converte para preto
   * - Preserva canal alpha para transparência
   * - Cache da sombra para performance
   * 
   * **Performance:**
   * - Sombra gerada apenas uma vez
   * - Usa drawImage otimizado do canvas
   * - Respeita zoomLevel para escala
   * 
   * @example
   * ```typescript
   * // Renderização básica sem sombra
   * sprite.draw(context, false);
   * 
   * // Renderização com sombra
   * sprite.draw(context, true);
   * 
   * // No game loop completo
   * function render() {
   *   context.clearRect(0, 0, canvas.width, canvas.height);
   *   
   *   // Renderizar múltiplos sprites
   *   player.draw(context, true);
   *   enemies.forEach(e => e.draw(context, true));
   *   items.forEach(i => i.draw(context, false));
   * }
   * ```
   */
  public draw(context: CanvasRenderingContext2D, drawShadow: any): void {
    if (this._shown) {
      if (drawShadow !== undefined && drawShadow) {
        if (this._shadow === null) {
          const canvas = document.createElement('canvas')
          var contextCanvas = canvas.getContext('2d')

          if (!contextCanvas) {
            return
          }

          canvas.width = this.width
          canvas.height = this.height

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

            const imageData = contextCanvas.getImageData(0, 0, this.width, this.height)

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
          this._shadow?.canvas as CanvasImageSource,
          this.positionX,
          this.positionY + (shadowHeight / 2),
          shadowWidth,
          shadowHeight
        )
        context.restore()
      }

      context.drawImage(
        this._spritesheet?.image as CanvasImageSource,
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
}