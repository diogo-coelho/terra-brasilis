import { SceneEvent } from '@/arcade/core'
import { GameSessionError, ScenarioError } from '@/arcade/errors'
import { Scene } from '@/arcade/interfaces'
import { SceneManager } from '@/arcade/types'
import EventListenerState from '@/arcade/enums/EventListenerState'
import KeyboardKey from '@/arcade/enums/KeyboardKey'

import { arcadeEngine } from '@/game/system'
import { Match } from '@/game/isometric/game-world'
import { ScenarioOne } from '@/game/isometric/scenarios'

export default class GameScene extends SceneEvent implements Scene {
  private _match: Match | null = null
  private _scenarioOne: ScenarioOne | null = null

  constructor() {
    super()
  }

  public onEnter(): void {
    const gameEngine = arcadeEngine

    this._scenarioOne = new ScenarioOne()
    if (!this._scenarioOne) {
      throw new ScenarioError('ScenarioOne is not initialized.')
    }

    this._match = new Match(
      gameEngine.canvas,
      gameEngine.context,
      this._scenarioOne
    )
    if (!this._match) {
      throw new GameSessionError('Match is not initialized.')
    }
    this._match.startGameSession()
  }

  public onExit(): void {
    this._scenarioOne = null
    this._match = null
  }

  public update(
    canvas?: HTMLCanvasElement,
    context?: CanvasRenderingContext2D,
    deltaTime?: number
  ): void {
    if (this._match && canvas && context && deltaTime !== undefined) {
      this._match?.updateGameSession(deltaTime)
    }
  }

  public drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    deltaTime: number
  ): void {}

  public handleMouseEvent?(
    event: MouseEvent,
    sceneManager: SceneManager
  ): void {
    this._match?.handleMouseEvent(event)
  }
}
