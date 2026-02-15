import Scenario from '@/arcade/core/isometric/Scenario'
import Unit from '@/arcade/core/isometric/Unit'
import TileMap from '@/arcade/core/isometric/TileMap'

/**
 * Gerencia uma sessão de jogo.
 *
 * @class GameSession
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Responsável por controlar o estado de uma sessão de jogo, incluindo
 * o cenário atual, unidades e renderização. Gerencia a lógica de atualização
 * e eventos de mouse durante a partida.
 *
 * @remarks
 * As unidades são ordenadas por positionY para garantir renderização correta
 * em perspectiva isométrica.
 *
 * @example
 * ```typescript
 * const session = new GameSession(canvas, context, scenario);
 * session.startGameSession();
 * ```
 */
export default class GameSession {
  protected _scenario: Scenario
  protected _canvas!: HTMLCanvasElement
  protected _context!: CanvasRenderingContext2D
  protected _units: Unit[]

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    scenario: Scenario
  ) {
    this._canvas = canvas
    this._context = context
    this._scenario = scenario
    this._units = scenario.units
  }

  public get scenario(): Scenario {
    return this._scenario
  }

  public set scenario(scenario: Scenario) {
    this._scenario = scenario
    this._units = scenario.units
  }

  /**
   * Inicia a sessão de jogo renderizando o cenário inicial.
   */
  public startGameSession(): void {
    this._scenario.drawScenario(this._canvas, this._context)
  }

  /**
   * Atualiza o estado da sessão de jogo.
   *
   * @param {number} deltaTime - Tempo decorrido desde a última atualização em segundos
   *
   * @remarks
   * Atualiza o cenário, ordena unidades por profundidade, e atualiza/renderiza cada unidade.
   */
  public updateGameSession(deltaTime: number): void {
    this._scenario.updateScenario(this._canvas, this._context, deltaTime)

    this._units.sort((a, b) => a.positionY - b.positionY)

    for (const unit of this._units) {
      unit.updateUnit(
        deltaTime,
      )
      unit.drawUnit(this._canvas, this._context)
    }
  }

  /**
   * Gerencia eventos de mouse na sessão de jogo.
   *
   * @param {MouseEvent} event - Evento de mouse do navegador
   *
   * @remarks
   * Atualmente processa apenas eventos de click, delegando para as unidades.
   */
  public handleMouseEvent(event: MouseEvent): void {
    switch (event.type) {
      case 'click':
        this._units.forEach((unit) =>
          unit.onClick(event, this._scenario.worldMap as TileMap, this._canvas)
        )
        break
      default:
        break
    }
  }
}
