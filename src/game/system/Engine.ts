import { Arcade } from '@/arcade'
import { Game } from '@/arcade/types'

/**
 * Motor gráfico do jogo.
 *
 * @constant {HTMLCanvasElement} canvas - Elemento canvas principal
 * @constant {Game} arcadeEngine - Instância singleton do motor de jogo
 *
 * @description
 * Configura e inicializa o motor gráfico do jogo, incluindo canvas,
 * redimensionamento de tela e desativação de suavização de imagem
 * para manter o visual pixel art.
 *
 * @remarks
 * O image smoothing é desabilitado para preservar a estética pixel art do jogo.
 *
 * @example
 * ```typescript
 * import { arcadeEngine } from '@/game/system';
 * arcadeEngine.start();
 * ```
 */
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement
const arcadeEngine: Game = Arcade.Game.getInstance('gameCanvas')
arcadeEngine.canvas = canvas
arcadeEngine.resizeScreen()
arcadeEngine.setImageSmoothingEnabled(false)

export { arcadeEngine }
