import ErrorState from '../enums/ErrorState'
import Scene from './Scene'
import { NamedScene } from '../types/types'

/**
 * Classe responsável por gerenciar as cenas do jogo
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

  public handleKeyboardEvent(event: KeyboardEvent): void {
    this._currentScene?.handleKeyboardEvent(event, this)
  }

  public handleMouseEvent(event: MouseEvent): void {
    this._currentScene?.handleMouseEvent(event, this)
  }
}

export default SceneManager
