import Scenario from './Scenario'

export default class ScenarioMap {
  protected _scenarioMap: Map<string, Scenario> | null = null

  public set scenarioMap(scenarioMap: Map<string, Scenario>) {
    this._scenarioMap = scenarioMap
  }

  public get scenarioMap(): Map<string, Scenario> | null {
    return this._scenarioMap
  }
}
