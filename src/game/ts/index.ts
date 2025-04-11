import '../../arcade/assets/sass/styles.scss'
import Arcade, { globalEvents, Game, SceneManager } from '../../arcade'
import { sceneManager } from '../scene-manager'

window.document.title = 'Terra Brasilis'

window.onload = (): void => {
  const canvas = document.getElementById('gameCanvas')! as HTMLCanvasElement
  /** Configuração inicial do jogo */
  const gameEngine: Game = new Arcade.Game(canvas)
  gameEngine.resize()
  gameEngine.setImageSmoothingEnabled(false)
  /** Configuração das cenas que vão compor o jogo */
  const gameScenes: SceneManager = sceneManager
  /** Ajusta o tamanho da tela */
  globalEvents.resize(gameEngine, gameScenes)
  /** Configura os eventos globais de teclado */
  globalEvents.keyboard.keyUp(gameScenes)
  /** Configura os eventos globais de mouse */
  globalEvents.mouse.mouseMove(gameScenes)
  /** Função que inicializa o jogo */
  gameEngine.startGame(gameScenes)
}
