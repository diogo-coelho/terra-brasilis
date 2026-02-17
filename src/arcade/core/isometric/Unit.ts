import Sprite from '@/arcade/core/Sprite'
import Image from '@/arcade/images/Image'
import TileMap from '@/arcade/core/isometric/TileMap'
import Tile from '@/arcade/core/isometric/Tile'
import { UnitMobileState, UnitDirection } from '@/arcade/enums'

/**
 * Representa uma unidade no jogo isométrico.
 *
 * @class Unit
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Classe base para unidades móveis no jogo, incluindo navios, soldados, etc.
 * Gerencia movimentação, direção, seleção e interação com o mapa de tiles.
 *
 * @extends Sprite
 *
 * @remarks
 * Suporta 8 direções de movimento (N, NE, E, SE, S, SW, W, NW) e dois modos
 * de mobilidade: caminhante (terrestre) e navegador (marítimo).
 *
 * @example
 * ```typescript
 * const ship = new Unit(64, 64, 4, 200, shipImage);
 * ship.unitSpeed = 100;
 * ship.mobileState = UnitMobileState.NAVIGATOR;
 * ```
 */
export default class Unit extends Sprite {
  protected _unitSpeed: number = 0
  protected _hasShadow: boolean = true
  protected _targetTileX: number = 0
  protected _targetTileY: number = 0
  protected _mobileState: UnitMobileState = UnitMobileState.NONE
  protected _destinationTile: Tile | null = null
  protected _currentDirection: UnitDirection = UnitDirection.SOUTHWEST

  constructor(
    width: number,
    height: number,
    frames: number,
    durationPerFrame: number,
    spritesheet?: Image
  ) {
    super(
      spritesheet as unknown as Image,
      width,
      height,
      frames,
      0,
      0,
      durationPerFrame
    )
  }

  public set unitSpeed(value: number) {
    this._unitSpeed = value
  }

  public get unitSpeed(): number {
    return this._unitSpeed
  }

  public set hasShadow(value: boolean) {
    this._hasShadow = value
  }

  public get hasShadow(): boolean {
    return this._hasShadow
  }

  public set targetTileX(value: number) {
    this._targetTileX = value
  }

  public get targetTileX(): number {
    return this._targetTileX
  }

  public set targetTileY(value: number) {
    this._targetTileY = value
  }

  public get targetTileY(): number {
    return this._targetTileY
  }

  public set mobileState(value: UnitMobileState) {
    this._mobileState = value
  }

  public get mobileState(): UnitMobileState {
    return this._mobileState
  }

  public get currentDirection(): UnitDirection {
    return this._currentDirection
  }

  /**
   * Renderiza a unidade no canvas.
   *
   * @param {HTMLCanvasElement} canvas - Elemento canvas
   * @param {CanvasRenderingContext2D} context - Contexto de renderização 2D
   */
  public drawUnit(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    if (this.selected) {
      this.drawWithOutline(context, 'white')
    }
    this.draw(context, this._hasShadow)
  }

  /**
   * Atualiza o estado da unidade incluindo movimentação.
   *
   * @param {number} deltaTime - Tempo decorrido desde a última atualização em segundos
   *
   * @remarks
   * Calcula direção do movimento, atualiza posição baseado em velocidade e deltaTime,
   * e verifica se a unidade chegou ao destino. Atualiza automaticamente a direção
   * do sprite para corresponder à direção do movimento.
   */
  public updateUnit(
    deltaTime: number,
  ): void {
    // Lógica de movimentação e atualização do estado da unidade
    if (this.targetTileX === 0 && this.targetTileY === 0) return;
    if (!this._destinationTile) return;

    // Calcula a direção baseada na posição ATUAL da unidade
    const directionX = this.targetTileX - this.positionX;
    const directionY = this.targetTileY - this.positionY;

    // Calcula a distância até o destino
    const distance = Math.sqrt(directionX * directionX + directionY * directionY);

    // Se já está no destino (ou muito próximo), trava a unidade
    if (distance < 1) {
      this.positionX = this.targetTileX;
      this.positionY = this.targetTileY;
      this._targetTileX = 0;
      this._targetTileY = 0;
      return;
    }

    // Atualiza a direção da unidade baseada no vetor de movimento
    this._currentDirection = this.calculateDirection(directionX, directionY);
    this.updateSpriteDirection();

    // Normaliza a direção e multiplica pela velocidade e deltaTime
    const moveX = (directionX / distance) * this._unitSpeed * deltaTime;
    const moveY = (directionY / distance) * this._unitSpeed * deltaTime;

    // Calcula a próxima posição
    let nextX = this.positionX + moveX;
    let nextY = this.positionY + moveY;

    // Verifica se o próximo passo ultrapassa o destino
    if (Math.abs(moveX) > Math.abs(directionX) || Math.abs(moveY) > Math.abs(directionY)) {
      nextX = this.targetTileX;
      nextY = this.targetTileY;
    }

    // Move para a próxima posição (o destino já foi validado no setUnitDestination)
    this.positionX = nextX;
    this.positionY = nextY;
    
    // Se chegou no destino, zera o target
    if (Math.abs(this.targetTileX - this.positionX) < 1 && 
        Math.abs(this.targetTileY - this.positionY) < 1) {
      this.positionX = this.targetTileX;
      this.positionY = this.targetTileY;
      this._targetTileX = 0;
      this._targetTileY = 0;
    }
  }

  /**
   * Gerencia evento de click na unidade.
   *
   * @param {MouseEvent} event - Evento de mouse
   * @param {TileMap} tileMap - Mapa de tiles do cenário
   * @param {HTMLCanvasElement} canvas - Elemento canvas
   *
   * @remarks
   * Se a unidade está selecionada e o click não é sobre ela, define o destino.
   * Caso contrário, altera o estado de seleção.
   */
  public onClick(
    event: MouseEvent,
    tileMap: TileMap,
    canvas: HTMLCanvasElement
  ): void {
    if (this.selected && !this.isClickingOnUnit(event)) {
      this.setUnitDestination(event, tileMap, canvas)
    } else {
      this.setSelected(event)
    }
  }

  private setTarget(tileX: number, tileY: number): void {
    this._targetTileX = tileX
    this._targetTileY = tileY
  }

  /**
   * Calcula a direção baseada no vetor de movimento.
   *
   * @param {number} directionX - Componente X da direção
   * @param {number} directionY - Componente Y da direção
   *
   * @returns {UnitDirection} Uma das 8 direções possíveis
   *
   * @remarks
   * Converte o ângulo do vetor de movimento em uma das 8 direções discretas.
   */
  protected calculateDirection(directionX: number, directionY: number): UnitDirection {
    // Calcula o ângulo em radianos (-PI a PI)
    const angle = Math.atan2(directionY, directionX);
    
    // Converte para graus (0 a 360)
    let degrees = (angle * 180) / Math.PI;
    if (degrees < 0) degrees += 360;
    
    // Ajusta para que 0° seja o Norte (em vez de Leste)
    // Subtrai 90° e normaliza
    degrees = (degrees + 90) % 360;
    
    // Divide em 8 setores de 45° cada
    // Adiciona 22.5° para centralizar os setores
    const sector = Math.round((degrees + 22.5) / 45) % 8;
    
    return sector as UnitDirection;
  }

  /**
   * Atualiza o offset do sprite para corresponder à direção atual.
   *
   * @remarks
   * Ajusta qual linha da spritesheet deve ser usada baseado na direção.
   */
  protected updateSpriteDirection(): void {
    const offsetY = this.getOffsetYForDirection(this._currentDirection);
    this.setOffset(this.currentFrame * this.width, offsetY);
  }

  /**
   * Calcula o offset Y na spritesheet para uma direção específica.
   *
   * @param {UnitDirection} direction - Direção da unidade
   *
   * @returns {number} Offset Y em pixels
   *
   * @remarks
   * Assume que a spritesheet tem uma linha por direção na ordem: N, NE, E, SE, S, SW, W, NW.
   */
  protected getOffsetYForDirection(direction: UnitDirection): number {
    // Por padrão, cada direção ocupa uma linha no spritesheet
    // A ordem esperada é: N, NE, E, SE, S, SW, W, NW
    return direction * this.height;
  }

  /**
   * Define o tile de destino para a unidade.
   *
   * @param {MouseEvent} event - Evento de mouse
   * @param {TileMap} tileMap - Mapa de tiles
   * @param {HTMLCanvasElement} canvas - Elemento canvas
   *
   * @remarks
   * Valida se o tile é transitável baseado no modo de mobilidade da unidade
   * (walker para tiles walkable, navigator para tiles navigable).
   */
  private setUnitDestination(
    event: MouseEvent,
    tileMap: TileMap,
    canvas: HTMLCanvasElement
  ): void {
    console.log('event.x', event.x, 'event.y', event.y)
    this._destinationTile = tileMap.getTileAtGridPosition(
      event.x,
      event.y,
      canvas
    )
    console.log('Destino selecionado:', this._destinationTile)
    if (!this._destinationTile) return

    if (this._mobileState === UnitMobileState.NONE) return
    if (
      (this._mobileState === UnitMobileState.WALKER &&
        this._destinationTile.isWalkable) ||
      (this._mobileState === UnitMobileState.NAVIGATOR &&
        this._destinationTile.isNavigable)
    ) {
      // Centraliza a unidade horizontalmente e alinha a base ao tile
      const targetX = this._destinationTile.positionX + 
                     (this._destinationTile.width - this.width) / 2
      const targetY = this._destinationTile.positionY + 
                     this._destinationTile.height - this.height
      
      this.setTarget(targetX, targetY)
    }
  }

  private setSelected(event: MouseEvent): void {
    if (this.isClickingOnUnit(event) && !this.selected) {
      this.selected = true
    } else {
      this.selected = false
    }
  }

  private isClickingOnUnit(event: MouseEvent): boolean {
    return (
      event.x >= this.positionX &&
      event.x <= this.positionX + this.width &&
      event.y >= this.positionY &&
      event.y <= this.positionY + this.height
    )
  }
}
