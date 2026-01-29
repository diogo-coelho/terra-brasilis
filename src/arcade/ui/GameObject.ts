/**
 * Classe base que representa qualquer objeto visual renderizável no jogo.
 *
 * @class GameObject
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe GameObject serve como entidade fundamental para todos os objetos visuais do jogo,
 * implementando o padrão Entity-Component. Ela encapsula propriedades essenciais:
 * - Posicionamento no espaço 2D (positionX, positionY)
 * - Dimensões (width, height)
 * - Estilização visual (color, backgroundColor)
 * - Controle de cursor (shouldUsePointerCursor)
 *
 * Esta classe é projetada para ser estendida por componentes mais especializados
 * como botões, inputs, sprites e outros elementos do jogo, fornecendo uma base
 * consistente para manipulação de propriedades visuais e espaciais.
 *
 * @remarks
 * Todos os getters e setters permitem acesso controlado às propriedades privadas,
 * facilitando futuras validações ou lógica adicional sem quebrar a API pública.
 *
 * @example
 * ```typescript
 * // Uso direto (embora normalmente seja estendida)
 * const gameObject = new GameObject(50, 100);
 * gameObject.positionX = 10;
 * gameObject.positionY = 20;
 * gameObject.color = '#FF0000';
 * gameObject.backgroundColor = '#00FF00';
 *
 * // Uso através de extensão
 * class Player extends GameObject {
 *   constructor() {
 *     super(32, 48);
 *   }
 * }
 * ```
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
