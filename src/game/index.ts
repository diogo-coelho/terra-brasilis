import '@/arcade/assets/sass/styles.scss'
import { Arcade } from '@/arcade/index'
import { Game, SceneManager } from '@/arcade/core'

import { sceneManager } from '@/game/scene-manager'

window.document.title = 'Terra Brasilis'

window.onload = () => {
  const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement
  /** Inicia o jogo */
  const gameEngine: Game = Arcade.Game.getInstance(canvas)
  gameEngine.resizeScreen()
  gameEngine.setImageSmoothingEnabled(false)

  /** Inicializa os eventos globais */
  const GlobalEvents = Arcade.GlobalEvents
  new GlobalEvents(sceneManager)
  GlobalEvents.resize(gameEngine, sceneManager)

  /** Inicializa as cenas do jogo */
  const gameScenes: SceneManager = sceneManager
  gameEngine.startGame(gameScenes)
}
