/**
 * Controlador de animação frame-by-frame para sprites.
 *
 * @class Frame
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe Frame gerencia o sistema de animação frame-by-frame:
 * - Controla número total de frames na animação
 * - Rastreia frame atual sendo exibido
 * - Calcula timing automático entre frames
 * - Fornece navegação cíclica pelos frames
 * - Sincroniza animação com tempo real
 * 
 * **Sistema de Timing:**
 * O tempo de duração por frame é calculado automaticamente:
 * ```
 * tempoDeUmFrame = durationPerFrame / frames
 * ```
 * 
 * Por exemplo, com 4 frames e duration de 400ms:
 * - Cada frame exibe por 100ms
 * - Animação completa dura 400ms
 * - Depois do último frame, volta ao primeiro
 * 
 * **Gerenciamento de Estado:**
 * - _currentFrame: Índice do frame atual (0-based)
 * - _frameTimer: Timestamp quando deve trocar de frame
 * - _frames: Total de frames
 * - _durationPerFrame: Duração total da animação
 * 
 * Esta classe é usada internamente pela classe Sprite.
 *
 * @param {number} frames - Número total de frames na animação
 * @param {number} durationPerFrame - Duração total da animação em milissegundos
 *
 * @example
 * ```typescript
 * // Animação de 8 frames, 800ms total
 * const frameController = new Frame(8, 800);
 * // Cada frame dura: 800 / 8 = 100ms
 * 
 * let offsetX = 0;
 * const frameWidth = 64;
 * 
 * function update() {
 *   const now = Date.now();
 *   if (now >= frameController.frameTimer) {
 *     offsetX = frameController.nextFrame(offsetX, frameWidth);
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Animação rápida vs lenta
 * const fastAnimation = new Frame(4, 200);  // 50ms por frame
 * const slowAnimation = new Frame(4, 2000); // 500ms por frame
 * ```
 *
 * @example
 * ```typescript
 * // Trocar número de frames dinamicamente
 * const frame = new Frame(4, 400);
 * 
 * // Mudar para animação de 6 frames
 * frame.frames = 6; // Reseta para frame 0
 * // Agora cada frame dura: 400 / 6 = ~66.67ms
 * ```
 */
export default class Frame {

  private _frames: number = 1
  private _currentFrame: number = 0
  private _durationPerFrame: number = 100
  private _frameTimer: number = 0

  constructor(frames: number, durationPerFrame: number) {
    this._frames = frames
    this._durationPerFrame = durationPerFrame
    this.setFrameTimer()
  }

  /**
   * Define o número total de frames e reseta a animação.
   *
   * @param {number} value - Novo número de frames (deve ser >= 1)
   * 
   * @remarks
   * Ao alterar o número de frames:
   * - O frame atual é resetado para 0 (primeiro frame)
   * - A duração por frame é recalculada automaticamente
   * - Útil para trocar entre animações com diferentes quantidades de frames
   * 
   * @example
   * ```typescript
   * frame.frames = 8; // Agora tem 8 frames, volta ao primeiro
   * ```
   */
  public set frames(value: number) {
    this._currentFrame = 0;
    this._frames = value;
  }

  /**
   * Retorna o número total de frames na animação.
   *
   * @returns {number} Quantidade de frames
   * 
   * @example
   * ```typescript
   * console.log(frame.frames); // 6
   * ```
   */
  public get frames(): number {
    return this._frames;
  }

  /**
   * Retorna o timestamp quando o próximo frame deve ser exibido.
   *
   * @returns {number} Timestamp em milissegundos (epoch Unix)
   * 
   * @remarks
   * Use este valor para comparar com Date.now() ou performance.now()
   * para determinar se é hora de avançar para o próximo frame.
   * 
   * Retorna 0 se durationPerFrame ou frames for <= 0 (sem animação).
   * 
   * @example
   * ```typescript
   * if (Date.now() >= frame.frameTimer) {
   *   // Hora de trocar de frame
   *   offsetX = frame.nextFrame(offsetX, width);
   * }
   * ```
   */
  public get frameTimer(): number {
    return this._frameTimer;
  }

  /**
   * Calcula e define quando o próximo frame deve ser exibido.
   *
   * @returns {void}
   * 
   * @remarks
   * Calcula o timestamp futuro baseado em:
   * ```
   * frameTimer = agora + (durationPerFrame / frames)
   * ```
   * 
   * Se durationPerFrame ou frames for <= 0, define como 0 (sem animação).
   * 
   * Este método é chamado automaticamente:
   * - No construtor
   * - A cada chamada de nextFrame()
   * 
   * @example
   * ```typescript
   * // Com 4 frames e 400ms de duração:
   * // frameTimer = Date.now() + 100
   * frame.setFrameTimer();
   * ```
   */
  public setFrameTimer(): void {
    var date = new Date()
    if (this._durationPerFrame > 0 && this._frames > 0) {
      this._frameTimer = date.getTime() + (this._durationPerFrame / this._frames)
    } else {
      this._frameTimer = 0
    }
  }

  /**
   * Avança para o próximo frame e retorna o novo offset X no spritesheet.
   *
   * @param {number} offsetX - Offset X atual no spritesheet
   * @param {number} width - Largura de um frame em pixels
   * 
   * @returns {number} Novo offset X calculado para o próximo frame
   * 
   * @remarks
   * Este método:
   * 1. Atualiza o timer para o próximo frame
   * 2. Calcula novo offsetX baseado no frame atual
   * 3. Incrementa o índice do frame atual
   * 4. Volta ao frame 0 após o último frame (loop)
   * 
   * **Cálculo do Offset:**
   * ```
   * offsetX = width * currentFrame
   * ```
   * 
   * **Exemplo com 4 frames de 64px:**
   * - Frame 0: offsetX = 0
   * - Frame 1: offsetX = 64
   * - Frame 2: offsetX = 128
   * - Frame 3: offsetX = 192
   * - Volta para Frame 0: offsetX = 0
   * 
   * @example
   * ```typescript
   * let offsetX = 0;
   * const frameWidth = 64;
   * 
   * // A cada intervalo de tempo
   * if (Date.now() >= frame.frameTimer) {
   *   offsetX = frame.nextFrame(offsetX, frameWidth);
   *   // offsetX agora aponta para o próximo frame
   * }
   * ```
   */
  public nextFrame(offsetX: number, width: number): number {
    if (this._durationPerFrame > 0) {
      this.setFrameTimer()
      offsetX = width * this._currentFrame

      if (this._currentFrame === (this._frames - 1)) {
        this._currentFrame = 0
      } else {
        this._currentFrame++
      }
    }

    return offsetX
  }

}