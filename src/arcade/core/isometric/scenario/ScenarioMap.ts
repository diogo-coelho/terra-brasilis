import Scenario from './Scenario'

/**
 * Container de cenários do jogo.
 *
 * @class ScenarioMap
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Classe responsável por armazenar e gerenciar um mapa de cenários,
 * permitindo organização e acesso aos diferentes cenários do jogo.
 *
 * @remarks
 * Utiliza Map<string, Scenario> para armazenar cenários indexados por chave.
 * Pode ser estendida por classes que necessitam gerenciar múltiplos cenários.
 *
 * @see Scenario
 *
 * @example
 * ```typescript
 * const scenarioMap = new ScenarioMap();
 * const scenarios = new Map([
 *   ['level1', scenario1],
 *   ['level2', scenario2]
 * ]);
 * scenarioMap.scenarioMap = scenarios;
 * ```
 */
export default class ScenarioMap {
  protected _scenarioMap: Map<string, Scenario> | null = null

  public set scenarioMap(scenarioMap: Map<string, Scenario>) {
    this._scenarioMap = scenarioMap
  }

  public get scenarioMap(): Map<string, Scenario> | null {
    return this._scenarioMap
  }
}
