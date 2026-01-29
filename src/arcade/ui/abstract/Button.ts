import { Sound } from '../../sounds'
import GameObject from '../GameObject'
import { ButtonClickHandle, AlignedPosition, ColorOnHover } from '../../types'
import { SceneManager } from '@/arcade/core'

/**
 * Classe abstrata que define a estrutura base para botões interativos no jogo.
 *
 * @abstract
 * @class Button
 * @extends GameObject
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe Button implementa o padrão Template Method, fornecendo a estrutura fundamental
 * para todos os tipos de botões no jogo. Suas responsabilidades incluem:
 * - Gerenciar o texto/label exibido no botão
 * - Controlar estados visuais (cores padrão e hover)
 * - Integrar reprodução de efeitos sonoros
 * - Definir contratos para implementação de renderização e posicionamento
 * - Abstrair comportamento de clique para subclasses
 *
 * Como classe abstrata, ela define métodos que devem ser implementados pelas subclasses:
 * - renderButton: Define como o botão é desenhado
 * - setPosition: Define como o botão é posicionado
 * - handleOnClick: Define o comportamento ao clicar
 *
 * O padrão ColorOnHover permite transições visuais suaves quando o mouse passa sobre o botão.
 *
 * @remarks
 * Esta classe não pode ser instanciada diretamente. Use implementações concretas
 * como ButtonStandard ou crie sua própria subclasse.
 *
 * @example
 * ```typescript
 * class CustomButton extends Button {
 *   constructor(width: number, height: number, label: string) {
 *     super(width, height, label);
 *   }
 *
 *   renderButton(context: CanvasRenderingContext2D): void {
 *     // Implementação customizada de renderização
 *   }
 *
 *   setPosition({ canvas, x, y, align }: AlignedPosition): void {
 *     // Implementação de posicionamento
 *   }
 *
 *   handleOnClick({ event, scene, callback }: ButtonClickHandle): void {
 *     // Implementação de clique
 *   }
 * }
 * ```
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
