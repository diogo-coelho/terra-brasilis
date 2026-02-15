/**
 * Gerenciador de tempo do jogo.
 *
 * @class Timer
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Classe responsável por rastrear o tempo decorrido desde a criação,
 * permitindo medições precisas de intervalos de tempo no jogo.
 *
 * @example
 * ```typescript
 * const timer = new Timer();
 * // ... algum tempo depois
 * console.log(timer.elapsed); // tempo em milissegundos
 * ```
 */
export default class Timer {
  private _startTime: number = 0

  constructor() {
    this._startTime = Date.now()
  }
  public get start(): number {
    return this._startTime
  }

  /**
   * Reinicia o timer com o tempo atual.
   */
  public update(): void {
    var d = new Date()
    this._startTime = d.getTime()
  }
  public get elapsed(): number {
    return Date.now() - this._startTime
  }
}
