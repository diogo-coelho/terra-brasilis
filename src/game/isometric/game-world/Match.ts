import { GameSession, Scenario } from '@/arcade/core'

export default class Match extends GameSession {
  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    scenario: Scenario
  ) {
    super(canvas, context, scenario)
  }
}
