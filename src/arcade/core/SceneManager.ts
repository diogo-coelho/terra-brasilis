import { Scene } from '@/arcade/interfaces'
import { SceneManagerError } from '@/arcade/errors'
import { ErrorState } from '@/arcade/enums'
import { NamedScene } from '@/arcade/types'

/**
 * Gerenciador de cenas do jogo.
 *
 * @class SceneManager
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Gerencia a transição e controle de cenas do jogo, implementando o padrão Singleton.
 * Responsável por armazenar, alternar e controlar o ciclo de vida das cenas,
 * garantindo que apenas uma cena esteja ativa por vez e mantendo o estado atual do jogo.
 *
 * @remarks
 * Esta classe implementa o padrão Singleton para garantir que exista apenas uma
 * instância do gerenciador de cenas durante toda a execução do jogo.
 *
 * @example
 * ```typescript
 * const sceneManager = SceneManager.getInstance();
 * sceneManager.setScenesMap([{name: 'menu', scene: menuScene}]);
 * sceneManager.setCurrentScene('menu');
 * ```
 */
export default class SceneManager {
  private static _currentScene: Scene | undefined
  private static _gameSceneState: string | undefined
  private static _scenesMap: Map<string, Scene> = new Map()
  private static _instance: SceneManager

  private constructor() {}

  /**
   * Obtém a instância única do SceneManager.
   *
   * @returns {SceneManager} Instância única do SceneManager
   *
   * @example
   * ```typescript
   * const manager = SceneManager.getInstance();
   * ```
   */
  public static getInstance(): SceneManager {
    if (!this._instance) {
      this._instance = new SceneManager()
    }
    return this._instance
  }

  public get scenesMap(): Map<string, Scene> {
    return SceneManager._scenesMap
  }

  /**
   * Obtém o estado atual da cena do jogo.
   *
   * @throws {SceneManagerError} Quando não há estado de cena do jogo definido
   */
  public get gameSceneState(): string | undefined {
    if (!SceneManager._gameSceneState)
      throw new SceneManagerError(ErrorState.NO_GAME_SCENE_STATE)
    return SceneManager._gameSceneState
  }

  /**
   * Obtém a cena atualmente ativa.
   *
   * @throws {SceneManagerError} Quando não há cena atual definida
   */
  public get currentScene(): Scene {
    if (!SceneManager._currentScene)
      throw new SceneManagerError(ErrorState.NO_CURRENT_SCENE)
    return SceneManager._currentScene
  }

  /**
   * Define o mapeamento de cenas disponíveis no jogo.
   *
   * @param {NamedScene[]} scenes - Array de objetos contendo nome e instância da cena
   *
   * @example
   * ```typescript
   * sceneManager.setScenesMap([
   *   { name: 'menu', scene: new MenuScene() },
   *   { name: 'game', scene: new GameScene() }
   * ]);
   * ```
   */
  public setScenesMap(scenes: NamedScene[]): void {
    scenes.reduce(
      (map, scene) => map.set(scene.name, scene.scene),
      SceneManager._scenesMap
    )
  }

  /**
   * Altera a cena atual do jogo.
   *
   * @param {string} name - Nome da cena a ser ativada
   *
   * @throws {SceneManagerError} Quando a cena solicitada não está mapeada
   *
   * @remarks
   * Este método executa a saída da cena atual (onExit) e a entrada da nova cena (onEnter).
   *
   * @example
   * ```typescript
   * sceneManager.setCurrentScene('game');
   * ```
   */
  public setCurrentScene(name: string): void {
    const scene = SceneManager._scenesMap.get(name)
    if (!scene) throw new SceneManagerError(ErrorState.NO_MAPPED_SCENES)

    SceneManager._gameSceneState = name as string
    SceneManager._currentScene?.onExit?.()
    SceneManager._currentScene = scene
    SceneManager._currentScene.onEnter?.()
  }
}
