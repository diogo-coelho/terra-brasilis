import FogOfWar from '@/arcade/core/isometric/fog/FogOfWar'
import TileMap from '@/arcade/core/isometric/tiles/TileMap'
import Unit from '@/arcade/core/isometric/units/Unit'

/**
 * Representa um cenário de jogo.
 *
 * @class Scenario
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Classe base para cenários do jogo, gerenciando mapa de tiles, unidades,
 * e metadados como nome, descrição e datas de criação/atualização.
 *
 * @remarks
 * Deve ser estendida por classes específicas de cenário que implementam
 * a lógica particular de cada mapa/missão.
 *
 * @example
 * ```typescript
 * class MyScenario extends Scenario {
 *   constructor() {
 *     super();
 *     this.name = 'First Mission';
 *   }
 * }
 * ```
 */
export default class Scenario {
  protected _name: string = ''
  protected _worldMap: TileMap | null = null
  protected _description: string = ''
  protected _creator: string = ''
  protected _creationDate: Date | null = null
  protected _updateDate: Date | null = null
  protected _duration: number = 0
  protected _units: Unit[] | null = null
  protected _fogOfWar: FogOfWar | null = null

  public get name(): string {
    return this._name
  }

  public set name(name: string) {
    this._name = name
  }
  public get worldMap(): TileMap | null {
    return this._worldMap
  }

  public set worldMap(worldMap: TileMap | null) {
    this._worldMap = worldMap
  }

  public set units(units: Unit[]) {
    this._units = units
  }

  public get units(): Unit[] {
    return this._units as Unit[]
  }

  public set fogOfWar(fogOfWar: FogOfWar | null) {
    this._fogOfWar = fogOfWar
  }

  public get fogOfWar(): FogOfWar | null {
    return this._fogOfWar
  }

  /**
   * Renderiza o cenário no canvas.
   *
   * @param {HTMLCanvasElement} canvas - Elemento canvas
   * @param {CanvasRenderingContext2D} context - Contexto de renderização 2D
   */
  public drawScenario(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    this.worldMap?.drawWorldMap(canvas, context)

    if (this._fogOfWar) {
      this._fogOfWar.drawFog(
        context,
        this.worldMap?.tileWidth ?? 64,
        this.worldMap?.tileHeight ?? 32,
        canvas,
        this.worldMap?.camera ?? undefined
      )
    }
  }

  /**
   * Atualiza o estado do cenário.
   *
   * @param {HTMLCanvasElement} canvas - Elemento canvas
   * @param {CanvasRenderingContext2D} context - Contexto de renderização 2D
   * @param {number} deltaTime - Tempo decorrido desde a última atualização em segundos
   */
  public updateScenario(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    deltaTime: number
  ): void {
    this.worldMap?.update(canvas, context, deltaTime)

    if (this._fogOfWar) {
      this._fogOfWar.drawFog(
        context,
        this.worldMap?.tileWidth ?? 64,
        this.worldMap?.tileHeight ?? 32,
        canvas,
        this.worldMap?.camera ?? undefined
      )
    }
  }
}
