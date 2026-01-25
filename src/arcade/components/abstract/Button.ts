import { Sound } from '../../sounds'
import GameObject from '../GameObject'
import { ButtonClickHandle, AlignedPosition, ColorOnHover } from '../../types'
import { SceneManager } from '@/arcade/core'

/**
 * Classe abstrata que representa um botão interativo no jogo.
 * Estende a classe GameObject e adiciona propriedades e métodos específicos para botões,
 * como rótulo, cores ao passar o mouse e métodos abstratos para renderização e posicionamento.
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe Button serve como uma base para todos os botões
 * interativos no jogo, fornecendo propriedades essenciais como
 * rótulo e cores ao passar o mouse. Ela define métodos abstratos
 * para renderização e posicionamento, que devem ser implementados
 * por subclasses específicas de botões.
 *
 * @constructor
 * @param {number} width - A largura inicial do botão.
 * @param {number} height - A altura inicial do botão.
 * @param {string} label - O rótulo do botão.
 *
 * @example
 * class MyButton extends Button {
 *   renderButton(context: CanvasRenderingContext2D): void {
 *     // Implementação da renderização do botão
 *   }
 *  setPosition({ canvas, x, y }: AlignedPosition): void {
 *    // Implementação do posicionamento do botão
 *  }
 * }
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
