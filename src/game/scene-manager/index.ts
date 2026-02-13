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

/**
 * O módulo de cenas do jogo é responsável por gerenciar as diferentes cenas que compõem o jogo.
 * Ele utiliza o SceneManager para controlar a transição entre cenas e manter o estado atual do jogo.
 *
 * @module GameScenes
 * @see SceneManager
 * @see GameSceneState
 * @see IntroScene
 * @see MenuScene
 * @see BootScene
 * @see InsertNameScene
 * @see LoadGame
 * @see GameScene
 *
 * @example
 * import { sceneManager } from '@/game/scenes'
 * sceneManager.setCurrentScene(GameSceneState.BOOT)
 *
 */

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
