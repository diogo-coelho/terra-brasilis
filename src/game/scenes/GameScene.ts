import { SceneEvent } from '@/arcade/core'
import { Scene } from '@/arcade/interfaces'
import { SceneManager } from '@/arcade/types'

import { ScenarioOne } from '@/game/scenarios'
import { arcadeEngine } from '@/game/system'

export default class GameScene extends SceneEvent implements Scene {
  private _scenarioOne: ScenarioOne | null = null

  constructor() {
    super()
  }

  public onEnter(): void {
    const gameEngine = arcadeEngine
    this._scenarioOne = new ScenarioOne()
    if (!this._scenarioOne) {
      throw new Error('ScenarioOne is not initialized.')
    }
    this._scenarioOne.createScenario(
      gameEngine.canvas,
      gameEngine.context as CanvasRenderingContext2D,
      gameEngine.deltaTime
    )
  }

  public onExit(): void {
    console.log('Exiting Game Scene')
    this._scenarioOne = null
  }

  public update(
    canvas?: HTMLCanvasElement,
    context?: CanvasRenderingContext2D,
    deltaTime?: number
  ): void {
    if (this._scenarioOne && canvas && context && deltaTime !== undefined) {
      this._scenarioOne.updateScenario(canvas, context, deltaTime)
    }
  }

  public drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    deltaTime: number
  ): void {}
}
