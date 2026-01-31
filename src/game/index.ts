import '@/arcade/assets/sass/styles.scss'
import { Arcade } from '@/arcade/index'
import { Game, SceneManager } from '@/arcade/core'

import { arcadeEngine } from '@/game/system'
import { sceneManager } from '@/game/scene-manager'

window.document.title = 'Terra Brasilis'

window.onload = () => {
  /** Inicializa o motor do jogo */
  const gameEngine: Game = arcadeEngine

  /** Inicializa os eventos globais */
  const GlobalEvents = Arcade.GlobalEvents
  new GlobalEvents(sceneManager)
  GlobalEvents.resize(gameEngine, sceneManager)

  /** Inicializa as cenas do jogo */
  const gameScenes: SceneManager = sceneManager
  gameEngine.startGame(gameScenes)
}
