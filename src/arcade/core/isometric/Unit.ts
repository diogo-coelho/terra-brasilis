import Sprite from '@/arcade/core/Sprite'
import Image from '@/arcade/images/Image'
import TileMap from '@/arcade/core/isometric/TileMap'
import Tile from '@/arcade/core/isometric/Tile'
import { UnitMobileState } from '@/arcade/enums'

export default class Unit extends Sprite {
  protected _unitSpeed: number = 0
  protected _hasShadow: boolean = true
  protected _targetTileX: number = 0
  protected _targetTileY: number = 0
  protected _mobileState: UnitMobileState = UnitMobileState.NONE
  protected _destinationTile: Tile | null = null
  protected _isSelected: boolean = false

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

  public drawUnit(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    this.draw(context, this._hasShadow)
  }

  public updateUnit(
    deltaTime: number,
    tileMap: TileMap,
    canvas: HTMLCanvasElement
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

  public onClick(
    event: MouseEvent,
    tileMap: TileMap,
    canvas: HTMLCanvasElement
  ): void {
    if (this._isSelected && !this.isClickingOnUnit(event)) {
      this.setUnitDestination(event, tileMap, canvas)
    } else {
      this.setSelected(event)
    }
  }

  private setTarget(tileX: number, tileY: number): void {
    this._targetTileX = tileX
    this._targetTileY = tileY
  }

  private setUnitDestination(
    event: MouseEvent,
    tileMap: TileMap,
    canvas: HTMLCanvasElement
  ): void {
    this._destinationTile = tileMap.getTileAtGridPosition(
      event.x,
      event.y,
      canvas
    )
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
    if (this.isClickingOnUnit(event) && !this._isSelected) {
      this._isSelected = true
    } else {
      this._isSelected = false
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
