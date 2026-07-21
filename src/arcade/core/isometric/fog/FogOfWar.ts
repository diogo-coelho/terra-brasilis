import {Camera} from '@/arcade/core'
import {FogState} from './FogState'
import FogCell from './FogCell'

/**
 * Classe que representa o sistema de neblina de guerra (Fog of War) em um cenário isométrico.
 * 
 * @class FogOfWar
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 * 
 * @description
 * Esta classe gerencia a visibilidade do mapa de jogo, 
 * ocultando áreas que não estão ao alcance das unidades do jogador.
 *
 */
export default class FogOfWar { 
  protected _states: FogCell[][] = []

  /**
   * Define os estados da neblina de guerra para cada célula do mapa.
   * Também associa largura e altura para que cada célula tenha o mesmo tamanho visual do tile correspondente.
   *
   * @param states
   * @param defaultWidth
   * @param defaultHeight
   */
  public setStates(
    states: Array<Array<FogCell | FogState>>,
    defaultWidth: number = 64,
    defaultHeight: number = 32
  ): void {
    this._states = states.map((row) =>
      row.map((cell) => {
        if (typeof cell === 'number') {
          return new FogCell(cell as FogState, defaultWidth, defaultHeight)
        }

        return new FogCell(
          cell.state ?? FogState.VISIBLE,
          cell.width ?? defaultWidth,
          cell.height ?? defaultHeight
        )
      })
    )
  }

  /**
   * Retorna os estados da neblina de guerra para cada célula do mapa.
   * @returns FogState[][] 
   */
  public getStates(): FogCell[][] {
    return this._states
  }

  /**
   * Desenha a neblina de guerra no contexto do canvas, considerando o estado de cada célula do mapa.
   * As células podem estar em três estados: HIDDEN (preto), EXPLORED (cinza) ou VISIBLE (transparente).
   * O método também leva em consideração a posição da câmera para otimizar a renderização.
   * 
   * @param {CanvasRenderingContext2D} ctx - Contexto de renderização do canvas
   * @param {number} tileWidth - Largura de cada tile do mapa
   * @param {number} tileHeight - Altura de cada tile do mapa
   * @param {Camera} camera - Câmera do jogo
   * @returns 
   */
  public drawFog(
    ctx: CanvasRenderingContext2D,
    tileWidth: number,
    tileHeight: number,
    canvas?: HTMLCanvasElement,
    camera?: Camera
  ): void {
    if (tileWidth <= 0 || tileHeight <= 0 || this._states.length === 0) {
      return
    }

    ctx.save()

    if (camera) {
      camera.applyTransform(ctx)
    }

    const originX = canvas ? canvas.width / 2 - tileWidth / 2 : 0

    for (let y = 0; y < this._states.length; y++) {
      const row = this._states[y]
      if (!row) {
        continue
      }

      for (let x = 0; x < row.length; x++) {
        const cell = row[x]
        const state = cell.state
        const cellWidth = cell.width
        const cellHeight = cell.height
        const worldX = (x - y) * cellHeight + originX
        const worldY = (x + y) * (cellHeight / 2)

        if (camera && !camera.isVisible(worldX, worldY, cellWidth, cellHeight)) {
          continue
        }

        if (state === FogState.HIDDEN) {
          ctx.fillStyle = '#363636'
          ctx.globalAlpha = 1.0
        } else if (state === FogState.EXPLORED) {
          ctx.fillStyle = '#363636'
          ctx.globalAlpha = 0.5
        } else {
          ctx.globalAlpha = 0
        }

        cell.drawDiamond(ctx, worldX, worldY)
      }
    }

    ctx.restore()
  }
  
}