import Scenario from '@/arcade/core/isometric/Scenario'
import Unit from '@/arcade/core/isometric/Unit'

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

  public startGameSession(): void {
    this._scenario.drawScenario(this._canvas, this._context)
  }

  public updateGameSession(deltaTime: number): void {
    this._scenario.updateScenario(this._canvas, this._context, deltaTime)

    this._units.sort((a, b) => a.positionY - b.positionY)

    for (const unit of this._units) {
      unit.drawUnit(this._canvas, this._context)
    }
  }
}
