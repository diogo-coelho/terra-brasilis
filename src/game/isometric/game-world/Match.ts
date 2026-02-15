import { GameSession, Scenario } from '@/arcade/core'

/**
 * Representa uma partida do jogo.
 *
 * @class Match
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Classe que encapsula uma sessão de jogo completa, gerenciando o cenário,
 * as unidades e o estado da partida em andamento.
 *
 * @extends GameSession
 *
 * @remarks
 * Esta classe estende GameSession e representa uma instância específica
 * de uma partida do jogo Terra Brasilis.
 *
 * @example
 * ```typescript
 * const match = new Match(canvas, context, scenario);
 * match.startGameSession();
 * ```
 *
 * @see GameSession
 * @see Scenario
 */
export default class Match extends GameSession {
  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    scenario: Scenario
  ) {
    super(canvas, context, scenario)
  }
}
