import Scenario from '@/arcade/core/isometric/Scenario'

export default class GameSession {
  protected _scenario: Scenario

  constructor(scenario: Scenario) {
    this._scenario = scenario
  }

  public get scenario(): Scenario {
    return this._scenario
  }

  public set scenario(scenario: Scenario) {
    this._scenario = scenario
  }

  public startGameSession(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    this._scenario.drawScenario(canvas, context)
  }

  public updateGameSession(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    deltaTime: number
  ): void {
    this._scenario.updateScenario(canvas, context, deltaTime)
  }
}
