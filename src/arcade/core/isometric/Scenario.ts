import TileMap from '@/arcade/core/isometric/TileMap'

/**
 * Classe base para cenários isométricos do jogo.
 *
 * @class Scenario
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2026-01-29
 *
 * @description
 * Representa um cenário genérico composto por um TileMap isométrico.
 * Serve como base para cenários customizados do jogo, permitindo extensão e especialização.
 *
 * - Armazena o nome do cenário
 * - Gerencia o TileMap associado ao cenário
 * - Fornece método para desenhar o cenário completo
 *
 * @property {string} name - Nome identificador do cenário
 * @property {TileMap | null} tileMap - Mapa de tiles isométricos do cenário
 *
 * @example
 * // Criação de um cenário customizado
 * class MyScenario extends Scenario {
 *   constructor() {
 *     super();
 *     this.name = 'Floresta';
 *     this.tileMap = new TileMap(...);
 *   }
 * }
 *
 * // Renderização
 * myScenario.drawScenario(canvas, context, deltaTime);
 */
export default class Scenario {
  protected _name: string = ''
  protected _worldMap: TileMap | null = null

  /** Nome identificador do cenário */
  public get name(): string {
    return this._name
  }

  public set name(name: string) {
    this._name = name
  }

  /** Mapa de tiles isométricos do cenário */
  public get tileMap(): TileMap | null {
    return this._worldMap
  }

  public set tileMap(tileMap: TileMap | null) {
    this._worldMap = tileMap
  }

  /**
   * Desenha o cenário completo usando o TileMap associado.
   *
   * @param {HTMLCanvasElement} canvas - Canvas alvo para renderização
   * @param {CanvasRenderingContext2D} context - Contexto 2D do canvas
   * @param {number} deltaTime - Tempo decorrido para animações
   *
   * @returns {void}
   *
   * @example
   * scenario.drawScenario(canvas, context, deltaTime);
   */
  public drawScenario(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
  ): void {
    this._worldMap?.drawWorldMap(canvas, context)
  }

  public updateScenario(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    deltaTime: number
  ): void {
    this._worldMap?.update(canvas, context, deltaTime)
  }
}
