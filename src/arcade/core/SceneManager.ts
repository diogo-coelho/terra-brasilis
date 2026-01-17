import { Scene } from '@/arcade/interfaces'
import { SceneManagerError } from '@/arcade/errors'
import { ErrorState } from '@/arcade/enums'
import { NamedScene } from '@/arcade/types'

/**
 * Classe responsável por gerenciar as cenas do jogo
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe SceneManager é responsável por gerenciar
 * as cenas do jogo, incluindo a troca de cenas
 * e o armazenamento das cenas mapeadas.
 *
 */
export default class SceneManager {
  private _currentScene: Scene | undefined
  private _gameSceneState: string | undefined
  private _scenesMap: Map<string, Scene> = new Map()

  public get scenesMap(): Map<string, Scene> {
    return this._scenesMap
  }

  public get gameSceneState(): string | undefined {
    if (!this._gameSceneState)
      throw new SceneManagerError(ErrorState.NO_GAME_SCENE_STATE)
    return this._gameSceneState
  }

  public get currentScene(): Scene {
    if (!this._currentScene)
      throw new SceneManagerError(ErrorState.NO_CURRENT_SCENE)
    return this._currentScene
  }

  /**
   * Método que define o mapa de cenas
   * @param {NamedScene[]} scenes - array de cenas nomeadas
   */
  public setScenesMap(scenes: NamedScene[]): void {
    scenes.reduce(
      (map, scene) => map.set(scene.name, scene.scene),
      this._scenesMap
    )
  }

  /**
   * Método que define a cena atual
   * @param name - nome da cena a ser definida como atual
   */
  public setCurrentScene(name: string): void {
    const scene = this._scenesMap.get(name)
    if (!scene) throw new SceneManagerError(ErrorState.NO_MAPPED_SCENES)

    this._gameSceneState = name as string
    this._currentScene = scene
  }
}
