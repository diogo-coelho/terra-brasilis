import Arcade from '../../arcade'

class GameScene extends Arcade.Scene {
  drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    console.log('Game Scene')
  }
}

export default GameScene
