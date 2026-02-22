import { Camera, Scenario, Tile, TileMap, Unit } from '@/arcade/core'
import CaravelShipSpritesheet from '@/arcade/assets/images/tb_caravel_spritesheet.png'

import { TileMapper, GridScenarioOne } from '@/game/isometric/grids'
import { CaravelShip } from '@/game/isometric/units'

/**
 * Primeiro cenário do jogo.
 *
 * @class ScenarioOne
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Cenário inicial do jogo Terra Brasilis, representando o oceano Atlântico
 * com uma caravela portuguesa. Gerencia o mapa de tiles e as unidades presentes.
 *
 * @extends Scenario
 *
 * @remarks
 * Este cenário utiliza o GridScenarioOne para definir a disposição dos tiles
 * e coloca uma caravela como unidade inicial do jogador.
 *
 * @example
 * ```typescript
 * const scenario = new ScenarioOne();
 * const match = new Match(canvas, context, scenario);
 * ```
 *
 * @see Scenario
 * @see TileMap
 * @see CaravelShip
 */
export default class ScenarioOne extends Scenario {
  private _tileMapper: Map<number, Tile> | null = null
  private _caravelShip: Unit | null = null

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    super()
    this._name = 'Scenario One'
    this._tileMapper = new TileMapper().mapper
    this._caravelShip = new CaravelShip(CaravelShipSpritesheet)
    this.createScenario(canvas)
  }

  /**
   * Cria o cenário com mapa de tiles e unidades.
   *
   * @remarks
   * Inicializa o mapa de tiles usando GridScenarioOne e posiciona
   * a caravela na posição inicial (560, 120).
   */
  private createScenario(canvas: HTMLCanvasElement): void {
    const grid = GridScenarioOne.map((row) =>
      row.map((key) => this._tileMapper?.get(key)?.clone())
    )
    this.worldMap = new TileMap(grid as Tile[][], 128, 64)
    // TODO: O clique do mouse está direcionando para o tile errado quando esse tributo
    // está ativo. Verificar o motivo e corrigir para poder usar
    this.worldMap.renderOnlyInnerSquare = false

    this._caravelShip?.setPosition(560, 120)
    this.units = [this._caravelShip as Unit]
  }
}
