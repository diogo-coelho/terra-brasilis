import { GameSession, Scenario } from '@/arcade/core'

export default class Match extends GameSession {
  constructor(scenario: Scenario) {
    super(scenario)
  }
}
