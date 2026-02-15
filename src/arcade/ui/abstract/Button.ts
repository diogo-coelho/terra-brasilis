import { Sound } from '../../sounds'
import GameObject from '../../core/game/GameObject'
import { ButtonClickHandle, AlignedPosition, ColorOnHover } from '../../types'
import { SceneManager } from '@/arcade/core'

/**
 * Classe abstrata base para botões.
 *
 * @class Button
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Define a estrutura base para todos os botões do jogo, incluindo
 * rótulo, comportamento de hover, efeitos sonoros e métodos abstratos
 * para renderização e posicionamento.
 *
 * @extends GameObject
 *
 * @remarks
 * Classes concretas devem implementar renderButton, setPosition e handleOnClick.
 *
 * @see ButtonStandard
 */
export default abstract class Button extends GameObject {
  private _label: string = ''
  private _backgroundColorOnHover: ColorOnHover = {
    default: '',
    hover: '',
  }
  private _colorOnHover: ColorOnHover = {
    default: '',
    hover: '',
  }
  private _sound: Sound | null = null

  constructor(width: number, height: number, label: string) {
    super(width, height)
    this._label = label
  }

  public set backgroundColorOnHover(backgroundColorOnHover: string) {
    this._backgroundColorOnHover = {
      default: this.backgroundColor,
      hover: backgroundColorOnHover,
    }
  }

  public get backgroundColorOnHover(): ColorOnHover {
    return this._backgroundColorOnHover
  }

  public set colorOnHover(colorOnHover: string) {
    this._colorOnHover = {
      default: this.color,
      hover: colorOnHover,
    }
  }

  public get colorOnHover(): ColorOnHover {
    return this._colorOnHover
  }

  public get label(): string {
    return this._label
  }

  public set sound(source: string) {
    this._sound = new Sound(source)
  }

  public get sound(): Sound | null {
    return this._sound
  }

  abstract renderButton(context: CanvasRenderingContext2D): void

  abstract setPosition({ canvas, x, y, align }: AlignedPosition): void

  abstract handleOnClick({ event, scene, callback }: ButtonClickHandle): void

  public onClick(scene: SceneManager): void {}
}
