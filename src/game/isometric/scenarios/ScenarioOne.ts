import { Scenario, Tile, TileMap, Unit } from '@/arcade/core'
import CaravelShipSpritesheet from '@/arcade/assets/images/tb_caravel_spritesheet.png'

import { TileMapper, GridScenarioOne } from '@/game/isometric/grids'
import { CaravelShip } from '@/game/isometric/units'

/**
 * Implementação de um cenário isométrico 10x10 totalmente preenchido com OceanTile.
 *
 * @class ScenarioOne
 * @extends Scenario
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2026-01-29
 *
 * @description
 * Esta classe representa um cenário de exemplo para o jogo, demonstrando como criar,
 * configurar e renderizar um cenário customizado usando o sistema de TileMap isométrico.
 *
 * Características:
 * - Cria e armazena uma instância de OceanTile
 * - Gera um TileMap 10x10 usando o mesmo tile de oceano
 * - Renderiza o cenário completo via drawScenario
 *
 * @property {Tile | null} _oceanTile - Instância do tile de oceano utilizada no cenário
 *
 * @example
 * // Criação e renderização do cenário
 * const scenario = new ScenarioOne();
 */
export default class ScenarioOne extends Scenario {
  private _tileMapper: Map<number, Tile> | null = null
  private _caravelShip: Unit | null = null

  constructor() {
    super()
    this._name = 'Scenario One'
    this._tileMapper = new TileMapper().mapper
    this._caravelShip = new CaravelShip(CaravelShipSpritesheet)
    this.createScenario()
  }

  private createScenario(): void {
    /** Monta o grid do cenário */
    const grid = GridScenarioOne.map((row) =>
      row.map((key) => this._tileMapper?.get(key)?.clone())
    )
    this.worldMap = new TileMap(grid as Tile[][], 128, 64)

    /** Adicionando a caravela como unidade no cenário */
    this._caravelShip?.setPosition(620, 125)
    this.units = [this._caravelShip as Unit]
  }
}
