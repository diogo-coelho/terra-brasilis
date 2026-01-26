/**
 * Classe que representa um objeto de jogo genérico.
 * Permite definir e obter propriedades como posição, tamanho, cor e cor de fundo.
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe GameObject serve como uma base para todos os objetos
 * do jogo, fornecendo propriedades essenciais como posição,
 * tamanho, cor e cor de fundo. Ela pode ser estendida para criar
 * objetos de jogo mais complexos com funcionalidades adicionais.
 *
 * @constructor
 * @param {number} width - A largura inicial do objeto.
 * @param {number} height - A altura inicial do objeto.
 *
 * @example
 * const player = new GameObject(50, 100);
 * player.positionX = 10;
 * player.positionY = 20;
 * player.color = '#FF0000';
 * player.backgroundColor = '#00FF00';
 * console.log(`Player position: (${player.positionX}, ${player.positionY})`);
 *
 */
export default class GameObject {
  private _positionX: number = 0
  private _positionY: number = 0
  private _width: number
  private _height: number
  private _color: string = '#FFFFFF'
  private _backgroundColor: string = '#000000'
  private _shouldUsePointerCursor: boolean = false

  constructor(width: number, height: number) {
    this._width = width
    this._height = height
  }

  public set positionX(x: number) {
    this._positionX = x
  }

  public set positionY(y: number) {
    this._positionY = y
  }

  public get positionX(): number {
    return this._positionX
  }

  public get positionY(): number {
    return this._positionY
  }

  public get width(): number {
    return this._width
  }

  public get height(): number {
    return this._height
  }

  public set width(value: number) {
    this._width = value
  }

  public set height(value: number) {
    this._height = value
  }

  public set color(color: string) {
    this._color = color
  }

  public get color(): string {
    return this._color
  }

  public set backgroundColor(color: string) {
    this._backgroundColor = color
  }

  public get backgroundColor(): string {
    return this._backgroundColor
  }

  public set shouldUsePointerCursor(value: boolean) {
    this._shouldUsePointerCursor = value
  }

  public get shouldUsePointerCursor(): boolean {
    return this._shouldUsePointerCursor
  }
}
