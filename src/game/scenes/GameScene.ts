import { Arcade } from '@/arcade'
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
    const canvas = Arcade.Game.getInstance('gameCanvas').canvas as HTMLCanvasElement
    const context = Arcade.Game.getInstance('gameCanvas').context as CanvasRenderingContext2D

    this._scenarioOne = new ScenarioOne()
    this._scenarioOne.createScenario(canvas, context as CanvasRenderingContext2D)
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
    console.log('Entrou aqui no update da GameScene')
    console.log('deltaTime:', deltaTime)
    if (this._scenarioOne && canvas && context && deltaTime !== undefined) {
      this._scenarioOne.updateScenario(canvas, context, deltaTime)
    }
  }

  public drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    deltaTime: number
  ): void {
    if (!this._scenarioOne) {
      throw new Error('ScenarioOne is not initialized.')
    }
  }
}
