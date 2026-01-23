import { Arcade } from '@/arcade'
import { SceneManager } from '@/arcade/core'
import { NamedScene } from '@/arcade/types'

import { GameSceneState } from '@/game/enums'
import IntroScene from '@/game/scenes/IntroScene'
import MenuScene from '@/game/scenes/MenuScene'
import { BootScene } from '../scenes'

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
 *
 * @example
 * import { sceneManager } from '@/game/scenes'
 * sceneManager.setCurrentScene(GameSceneState.BOOT)
 *
 */
const sceneManager: SceneManager = new Arcade.SceneManager()
const sceneSettings: NamedScene[] = [
  { name: GameSceneState.BOOT, scene: new BootScene() },
  { name: GameSceneState.INTRO, scene: new IntroScene() },
  { name: GameSceneState.MENU, scene: new MenuScene() },
]
sceneManager.setScenesMap(sceneSettings)
sceneManager.setCurrentScene(GameSceneState.BOOT)

export { sceneManager }
