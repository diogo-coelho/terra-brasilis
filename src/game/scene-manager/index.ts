import { Arcade } from '@/arcade'
import { SceneManager } from '@/arcade/core'
import { NamedScene } from '@/arcade/types'

import { GameSceneState } from '@/game/enums'
import {
  IntroScene,
  BootScene,
  InsertNameScene,
  LoadGame,
  GameScene,
} from '@/game/scenes'
import MainMenuScene from '@/game/scenes/MainMenuScene'

const sceneManager: SceneManager = Arcade.SceneManager.getInstance()
const sceneSettings: NamedScene[] = [
  { name: GameSceneState.BOOT, scene: new BootScene() },
  { name: GameSceneState.INTRO, scene: new IntroScene() },
  { name: GameSceneState.MAIN_MENU, scene: new MainMenuScene() },
  { name: GameSceneState.INSERT_NAME, scene: new InsertNameScene() },
  { name: GameSceneState.LOADED_GAME, scene: new LoadGame() },
  { name: GameSceneState.GAME, scene: new GameScene() },
]
sceneManager.setScenesMap(sceneSettings)
sceneManager.setCurrentScene(GameSceneState.GAME)

export { sceneManager }
