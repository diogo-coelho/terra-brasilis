import Arcade from "../../arcade"
import { NamedScene } from "../../arcade/types/types"
import GameSceneState from "../enums/GameSceneState"
import { IntroScene, MenuScene } from "../scenes"

const sceneManager = new Arcade.SceneManager()
const scenesSettings: NamedScene[] = [
  { name: GameSceneState.INTRO, scene: new IntroScene() },
  { name: GameSceneState.MENU, scene: new MenuScene() }
]
sceneManager.setScenesMap(scenesSettings)
sceneManager.setCurrentScene(GameSceneState.INTRO)

export {
  sceneManager
}