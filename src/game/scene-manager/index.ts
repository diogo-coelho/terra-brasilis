import Arcade, { NamedScene } from '../../arcade'
import GameSceneState from '../enums/GameSceneState'
import { IntroScene, MenuScene, GameScene, InsertNameScene } from '../scenes'

const sceneManager = new Arcade.SceneManager()
const scenesSettings: NamedScene[] = [
  { name: GameSceneState.INTRO, scene: new IntroScene() },
  { name: GameSceneState.MENU, scene: new MenuScene() },
  { name: GameSceneState.GAME_SCENE, scene: new GameScene() },
  { name: GameSceneState.INSERT_NAME, scene: new InsertNameScene() },
]
sceneManager.setScenesMap(scenesSettings)
sceneManager.setCurrentScene(GameSceneState.INTRO)

export { sceneManager }
