/**
 * Temporizador de alta precisão para medição de intervalos de tempo no jogo.
 *
 * @class Timer
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * A classe Timer fornece um cronômetro preciso baseado em Date.now() para:
 * - Medir tempo decorrido desde a criação ou último reset
 * - Controlar intervalos de tempo em animações
 * - Implementar cooldowns e delays
 * - Gerenciar duração de eventos temporários
 * - Sincronizar ações baseadas em tempo
 * 
 * O timer inicia automaticamente no momento da instanciação e pode ser
 * resetado a qualquer momento usando o método update().
 * 
 * **Características:**
 * - Precisão em milissegundos
 * - Inicialização automática
 * - Reset manual via update()
 * - Leitura não-destrutiva do tempo decorrido
 * - Acesso ao timestamp inicial
 * 
 * **Casos de Uso Comuns:**
 * - Cooldown de habilidades
 * - Duração de power-ups
 * - Controle de spawn de inimigos
 * - Medição de tempo de jogo
 * - Sincronização de eventos
 *
 * @example
 * ```typescript
 * // Cooldown de habilidade
 * class Player {
 *   private attackCooldown = new Timer();
 *   
 *   attack() {
 *     if (this.attackCooldown.elapsed >= 1000) { // 1 segundo
 *       // Executa ataque
 *       this.attackCooldown.update(); // Reset do timer
 *     }
 *   }
 * }
 * ```
 * 
 * @example
 * ```typescript
 * // Duração de power-up
 * class PowerUp {
 *   private duration = new Timer();
 *   
 *   update() {
 *     if (this.duration.elapsed >= 5000) { // 5 segundos
 *       this.deactivate();
 *     }
 *   }
 * }
 * ```
 * 
 * @example
 * ```typescript
 * // Medição de tempo de jogo
 * const gameTimer = new Timer();
 * 
 * function showGameTime() {
 *   const seconds = Math.floor(gameTimer.elapsed / 1000);
 *   const minutes = Math.floor(seconds / 60);
 *   console.log(`Tempo: ${minutes}:${seconds % 60}`);
 * }
 * ```
 */
export default class Timer {

  private _startTime: number = 0

  constructor() {
    this._startTime = Date.now()
  }

  /**
   * Retorna o timestamp (em milissegundos) do início do timer.
   *
   * @returns {number} Timestamp em milissegundos desde epoch Unix (01/01/1970)
   * 
   * @remarks
   * Útil para comparações diretas de tempo ou cálculos customizados.
   * O valor retornado é o mesmo de Date.now() no momento da criação ou último update().
   * 
   * @example
   * ```typescript
   * const timer = new Timer();
   * console.log(timer.start); // 1706400000000 (exemplo)
   * ```
   */
  public get start(): number {
    return this._startTime
  }

  /**
   * Reseta o timer para o momento atual, reiniciando a contagem.
   *
   * @returns {void}
   * 
   * @remarks
   * Atualiza o tempo inicial (_startTime) para o timestamp atual,
   * efetivamente zerando o elapsed. Use este método para:
   * - Reiniciar contadores após eventos
   * - Resetar cooldowns
   * - Iniciar nova medição de intervalo
   * 
   * @example
   * ```typescript
   * const timer = new Timer();
   * // ... 2 segundos depois
   * console.log(timer.elapsed); // ~2000ms
   * timer.update(); // Reset
   * console.log(timer.elapsed); // ~0ms
   * ```
   */
  public update(): void {
    var d = new Date();
    this._startTime = d.getTime();
  }

  /**
   * Calcula e retorna o tempo decorrido desde o início ou último reset.
   *
   * @returns {number} Tempo decorrido em milissegundos
   * 
   * @remarks
   * Este getter calcula a diferença entre o timestamp atual e o timestamp
   * inicial, fornecendo o tempo decorrido em milissegundos.
   * 
   * **Importante:**
   * - A leitura é não-destrutiva (não reseta o timer)
   * - Pode ser chamado múltiplas vezes
   * - Precisão em milissegundos
   * - Retorna sempre valor >= 0
   * 
   * @example
   * ```typescript
   * const timer = new Timer();
   * 
   * // Converter para segundos
   * const seconds = timer.elapsed / 1000;
   * 
   * // Verificar se passou tempo suficiente
   * if (timer.elapsed >= 500) {
   *   console.log('Meio segundo passou!');
   * }
   * 
   * // Usar como condição de loop
   * while (timer.elapsed < 5000) {
   *   // Executa por 5 segundos
   * }
   * ```
   */
  public get elapsed(): number {
    return Date.now() - this._startTime
  }

}