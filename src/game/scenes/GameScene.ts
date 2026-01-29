import { SceneEvent } from '@/arcade/core'
import { Scene } from '@/arcade/interfaces'
import { SceneManager } from '@/arcade/types'

import { ScenarioOne } from '@/game/scenarios'

export default class GameScene extends SceneEvent implements Scene {
  private _scenarioOne: ScenarioOne | null = null

  constructor() {
    super()
  }

  public onEnter(): void {
    console.log('Entering Game Scene')
    this._scenarioOne = new ScenarioOne()
  }

  public onExit(): void {
    console.log('Exiting Game Scene')
    this._scenarioOne = null
  }

  public drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    deltaTime: number
  ): void {
    if (!this._scenarioOne) {
      throw new Error('ScenarioOne is not initialized.')
    }
    this._scenarioOne.createScenario(canvas, context, deltaTime)
  }
}
