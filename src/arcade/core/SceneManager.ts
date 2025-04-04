import ErrorState from '../enums/ErrorState'
import Scene from './Scene'
import { Callback, NamedScene } from '../types/types'

/**
 * Classe responsável por gerenciar a cenas
 */
class SceneManager {
  private _currentScene: Scene | undefined
  private _gameSceneState: string | undefined
  private _scenesMap: Map<string, Scene> = new Map()

  public get scenesMap(): Map<string, Scene> {
    return this._scenesMap
  }

  public get gameSceneState(): string {
    if (!this._gameSceneState)
      throw new SceneManagerError(ErrorState.NO_GAME_SCENE_STATE)
    return this._gameSceneState
  }

  public get currentScene(): Scene {
    if (!this._currentScene)
      throw new SceneManagerError(ErrorState.NO_MAPPED_SCENES)
    return this._currentScene as Scene
  }

  public setScenesMap(scenes: NamedScene[]): void {
    scenes.reduce((map, s) => map.set(s.name, s.scene), this._scenesMap)
  }

  public setCurrentScene(name: string): void {
    const scene = this._scenesMap.get(name)
    if (!scene) {
      throw new SceneManagerError(ErrorState.NO_MAPPED_SCENES)
    }
    this._gameSceneState = name as string
    this._currentScene = scene
  }

  public handleKeyboardEvent(configs: {
    event: KeyboardEvent
    callback: Callback
    scene: SceneManager
  }): void {
    this._currentScene?.handleKeyboardEvent(configs)
  }
}

export default SceneManager
