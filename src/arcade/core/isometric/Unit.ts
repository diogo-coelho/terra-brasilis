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
    if (this.targetTileX === 0 && this.targetTileY === 0) return
    if (!this._destinationTile) return

    const directionX = this.targetTileX - this._destinationTile.positionX
    const directionY = this.targetTileY - this._destinationTile.positionY

    // Se já está no destino, trava a unidade e zera o alvo
    if (directionX === 0 && directionY === 0) {
      this.positionX = this.targetTileX
      this.positionY = this.targetTileY
      this._targetTileX = 0
      this._targetTileY = 0
      return
    }

    const stepX = Math.sign(directionX) * this._unitSpeed * deltaTime
    const stepY = Math.sign(directionY) * this._unitSpeed * deltaTime

    console.log(
      'directionX:',
      directionX,
      'directionY:',
      directionY,
      'stepX:',
      stepX,
      'stepY:',
      stepY
    )

    // Verifica se o próximo passo ultrapassa o destino
    let nextTileX = this._destinationTile.positionX + stepX
    let nextTileY = this._destinationTile.positionY + stepY

    // Corrige para não ultrapassar o destino
    if (
      (stepX !== 0 &&
        Math.abs(nextTileX - this.targetTileX) > Math.abs(directionX)) ||
      (stepY !== 0 &&
        Math.abs(nextTileY - this.targetTileY) > Math.abs(directionY))
    ) {
      nextTileX = this.targetTileX
      nextTileY = this.targetTileY
    }

    const nextTile = tileMap.getTileAtGridPosition(nextTileX, nextTileY, canvas)

    if (
      nextTile &&
      ((this._mobileState === UnitMobileState.WALKER && nextTile.isWalkable) ||
        (this._mobileState === UnitMobileState.NAVIGATOR &&
          nextTile.isNavigable))
    ) {
      this._destinationTile = nextTile
      this.positionX = nextTile.positionX
      this.positionY = nextTile.positionY
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
      this.setTarget(
        this._destinationTile.positionX,
        this._destinationTile.positionY
      )
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
