import Scenario from '@/arcade/core/isometric/Scenario'
import Unit from '@/arcade/core/isometric/Unit'
import TileMap from '@/arcade/core/isometric/TileMap'
import Camera from '@/arcade/core/Camera'

/**
 * Gerencia uma sessão de jogo.
 *
 * @class GameSession
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Responsável por controlar o estado de uma sessão de jogo, incluindo
 * o cenário atual, unidades e renderização. Gerencia a lógica de atualização
 * e eventos de mouse durante a partida.
 *
 * @remarks
 * As unidades são ordenadas por positionY para garantir renderização correta
 * em perspectiva isométrica.
 *
 * @example
 * ```typescript
 * const session = new GameSession(canvas, context, scenario);
 * session.startGameSession();
 * ```
 */
export default class GameSession {
  protected _scenario: Scenario
  protected _canvas!: HTMLCanvasElement
  protected _context!: CanvasRenderingContext2D
  protected _camera!: Camera
  protected _units: Unit[]

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    scenario: Scenario,
    camera: Camera
  ) {
    this._canvas = canvas
    this._context = context
    this._camera = camera
    this._scenario = scenario
    this._units = scenario.units

    // Atribui a câmera ao TileMap para que ambos usem a mesma instância
    if (scenario.worldMap) {
      scenario.worldMap.camera = camera
    }
  }

  public get scenario(): Scenario {
    return this._scenario
  }

  public set scenario(scenario: Scenario) {
    this._scenario = scenario
    this._units = scenario.units
  }

  public set camera(camera: Camera) {
    this._camera = camera
    if (this._scenario.worldMap) {
      this._scenario.worldMap.camera = camera
    }
  }

  public get camera(): Camera {
    return this._camera
  }

  /**
   * Inicia a sessão de jogo renderizando o cenário inicial.
   */
  public startGameSession(): void {
    this._scenario.drawScenario(this._canvas, this._context)

    // Configura os limites do mundo na câmera
    if (this._scenario.worldMap) {
      this._scenario.worldMap.setMinAndMaxWorldXAndY(this._canvas)
    }
  }

  /**
   * Atualiza o estado da sessão de jogo.
   *
   * @param {number} deltaTime - Tempo decorrido desde a última atualização em segundos
   *
   * @remarks
   * Atualiza o cenário, ordena unidades por profundidade, e atualiza/renderiza cada unidade.
   * Aplica a transformação da câmera para que as unidades sejam desenhadas no mesmo
   * sistema de coordenadas que os tiles.
   */
  public updateGameSession(deltaTime: number): void {
    this._scenario.updateScenario(this._canvas, this._context, deltaTime)

    this._units.sort((a, b) => a.positionY - b.positionY)

    // Aplica a transformação da câmera antes de desenhar as unidades
    if (this._camera) {
      this._context.save()
      this._camera.applyTransform(this._context)
    }

    for (const unit of this._units) {
      unit.animate(deltaTime)
      unit.updateUnit(deltaTime)
      unit.drawUnit(this._canvas, this._context)
    }

    // Restaura o contexto após desenhar as unidades
    if (this._camera) {
      this._context.restore()
    }
  }

  /**
   * Gerencia eventos de mouse na sessão de jogo.
   *
   * @param {MouseEvent} event - Evento de mouse do navegador
   *
   * @remarks
   * Atualmente processa apenas eventos de click, delegando para as unidades.
   */
  public handleMouseEvent(event: MouseEvent): void {
    switch (event.type) {
      case 'click':
        this._units.forEach((unit) =>
          unit.onClick(event, this._scenario.worldMap as TileMap, this._canvas)
        )
        break
      default:
        break
    }
  }
}
