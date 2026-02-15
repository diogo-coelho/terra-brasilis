import '@/arcade/assets/sass/styles.scss'
import { Arcade } from '@/arcade/index'
import { Game, SceneManager } from '@/arcade/core'

import { arcadeEngine } from '@/game/system'
import { sceneManager } from '@/game/scene-manager'

window.document.title = 'Terra Brasilis'

window.onload = () => {
  const gameEngine: Game = arcadeEngine

  const GlobalEvents = Arcade.GlobalEvents
  new GlobalEvents(sceneManager)
  GlobalEvents.resize(gameEngine, sceneManager)

  const gameScenes: SceneManager = sceneManager
  gameEngine.startGame(gameScenes)
}
