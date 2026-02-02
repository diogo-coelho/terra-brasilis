import { Arcade } from '@/arcade'
import { Game } from '@/arcade/types'

/** Inicia o jogo */
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement
const arcadeEngine: Game = Arcade.Game.getInstance('gameCanvas')
arcadeEngine.canvas = canvas
arcadeEngine.resizeScreen()
arcadeEngine.setImageSmoothingEnabled(false)

export { arcadeEngine }
