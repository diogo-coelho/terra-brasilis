import { SceneEvent } from '@/arcade/core'
import { GameSessionError, ScenarioError } from '@/arcade/errors'
import { Scene } from '@/arcade/interfaces'
import { SceneManager } from '@/arcade/types'
import EventListenerState from '@/arcade/enums/EventListenerState'
import KeyboardKey from '@/arcade/enums/KeyboardKey'

import { arcadeEngine } from '@/game/system'
import { Match } from '@/game/isometric/game-world'
import { ScenarioOne } from '@/game/isometric/scenarios'

/**
 * Cena principal do jogo.
 *
 * @class GameScene
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Gerencia a cena principal onde o jogo acontece. Responsável por
 * inicializar a partida, o cenário e gerenciar a interação do jogador
 * durante o gameplay.
 *
 * @extends SceneEvent
 * @implements Scene
 *
 * @remarks
 * Esta cena é ativada após o jogador inserir seu nome e iniciar uma nova partida.
 * Gerencia todo o loop de jogo, incluindo renderização, atualização e eventos.
 *
 * @example
 * ```typescript
 * const gameScene = new GameScene();
 * sceneManager.setScenesMap([{name: 'game', scene: gameScene}]);
 * sceneManager.setCurrentScene('game');
 * ```
 *
 * @see SceneEvent
 * @see Match
 * @see ScenarioOne
 */
export default class GameScene extends SceneEvent implements Scene {
  private _match: Match | null = null
  private _scenarioOne: ScenarioOne | null = null

  constructor() {
    super()
  }

  /**
   * Executado ao entrar na cena.
   *
   * @throws {ScenarioError} Quando o cenário não é inicializado
   * @throws {GameSessionError} Quando a partida não é inicializada
   *
   * @remarks
   * Inicializa o cenário do jogo e cria uma nova sessão de partida.
   */
  public onEnter(): void {
    const gameEngine = arcadeEngine

    this._scenarioOne = new ScenarioOne(gameEngine.canvas, gameEngine.context)
    if (!this._scenarioOne) {
      throw new ScenarioError('ScenarioOne is not initialized.')
    }

    this._match = new Match(
      gameEngine.canvas,
      gameEngine.context,
      this._scenarioOne
    )
    if (!this._match) {
      throw new GameSessionError('Match is not initialized.')
    }
    this._match.startGameSession()
  }

  /**
   * Executado ao sair da cena.
   *
   * @remarks
   * Limpa as referências da partida e cenário para liberar memória.
   */
  public onExit(): void {
    this._scenarioOne = null
    this._match = null
  }

  /**
   * Atualiza a lógica da cena.
   *
   * @param {HTMLCanvasElement} canvas - Elemento canvas
   * @param {CanvasRenderingContext2D} context - Contexto de renderização 2D
   * @param {number} deltaTime - Tempo decorrido desde o último frame
   */
  public update(
    canvas?: HTMLCanvasElement,
    context?: CanvasRenderingContext2D,
    deltaTime?: number
  ): void {
    if (this._match && canvas && context && deltaTime !== undefined) {
      this._match?.updateGameSession(deltaTime)
    }
  }

  public drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    deltaTime: number
  ): void {}

  /**
   * Processa eventos de mouse durante o jogo.
   *
   * @param {MouseEvent} event - Evento de mouse
   * @param {SceneManager} sceneManager - Gerenciador de cenas
   */
  public handleMouseEvent?(
    event: MouseEvent,
    sceneManager: SceneManager
  ): void {
    this._match?.handleMouseEvent(event)
  }
}
