import '../../arcade/assets/sass/styles.scss'
import Arcade from '../../arcade'
import { sceneManager } from '../scene-manager'
import { Game, SceneManager } from '../../arcade/core'

window.document.title = 'Terra Brasilis'

window.onload = (): void => {
  const canvas = document.getElementById('gameCanvas')! as HTMLCanvasElement

  /** Configuração inicial do jogo */
  const gameEngine: Game = new Arcade.Game(canvas)
  gameEngine.resize()
  gameEngine.setImageSmoothingEnabled(false)

  /** Configuração das cenas que vão compor o jogo */
  const gameScenes: SceneManager = sceneManager

  /** Função que inicializa o jogo */
  gameEngine.startGame(gameScenes.currentScene)

}