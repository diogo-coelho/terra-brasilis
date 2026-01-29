import { Scenario, Tile, TileMap } from '@/arcade/core'
import { OceanTile } from '@/game/tiles'

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
 * scenario.createScenario(canvas, context, deltaTime);
 */
export default class ScenarioOne extends Scenario {
  private _oceanTile: Tile | null = null

  constructor() {
    super()
    this._name = 'Scenario One'
  }

  public createScenario(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    deltaTime: number
  ): void {
    this._oceanTile = new OceanTile()
    // TODO: Criar um mapper para converter a instancia de um tile por uma chave
    /**
     * Cria e renderiza o cenário 10x10 de OceanTile.
     *
     * @param {HTMLCanvasElement} canvas - Elemento canvas alvo para renderização
     * @param {CanvasRenderingContext2D} context - Contexto 2D do canvas
     * @param {number} deltaTime - Tempo decorrido para animações e atualização
     *
     * @returns {void}
     *
     * @example
     * const scenario = new ScenarioOne();
     * scenario.createScenario(canvas, context, deltaTime);
     */
    this._worldMap = new TileMap(
      [
        [
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
        ],
        [
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
        ],
        [
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
        ],
        [
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
        ],
        [
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
        ],
        [
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
        ],
        [
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
        ],
        [
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
        ],
        [
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
        ],
        [
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
          this._oceanTile,
        ],
      ],
      128,
      64
    )

    this.drawScenario(canvas, context, deltaTime)
  }
}
