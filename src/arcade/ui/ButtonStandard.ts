import Button from './abstract/Button'
import { ButtonEvent } from '../interfaces'
import { Sound } from '../sounds'
import { ButtonClickHandle, AlignedPosition, Callback } from '../types'
import { SoundError, ButtonError } from '../errors'
import { ErrorState, PositionState } from '../enums'

import hoverSound from '../assets/sounds/sfx/btn_hover.ogg'
import clickSound from '../assets/sounds/sfx/btn_click.wav'

/**
 * Implementação concreta de botão com renderização e interação padronizadas.
 *
 * @class ButtonStandard
 * @extends Button
 * @implements ButtonEvent
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe ButtonStandard fornece uma implementação completa e pronta para uso de botão,
 * incluindo:
 * - Renderização de texto com configurações de fonte personalizadas
 * - Sistema de hover com feedback visual e sonoro
 * - Posicionamento flexível (manual, horizontal ou vertical)
 * - Integração com sistema de eventos de mouse
 * - Efeitos sonoros para hover e clique (pré-configurados)
 * 
 * O botão utiliza o padrão Observer para detectar ações do mouse e responder
 * adequadamente com feedback visual (mudança de cor) e auditivo (sons).
 * 
 * Possui sons padrão pré-carregados:
 * - Hover: Som ao passar o mouse sobre o botão
 * - Click: Som ao clicar no botão
 * 
 * @remarks
 * Esta é a implementação padrão de botão e deve ser usada para a maioria dos casos.
 * Para comportamentos altamente customizados, considere estender a classe Button diretamente.
 *
 * @example
 * ```typescript
 * const button = new ButtonStandard(100, 50, 'Iniciar');
 * button.backgroundColor = '#4CAF50';
 * button.backgroundColorOnHover = '#45a049';
 * button.color = '#FFFFFF';
 * button.fontSize = 20;
 * button.font = 'Arial';
 * 
 * button.setPosition({
 *   canvas: myCanvas,
 *   align: PositionState.VERTICAL,
 *   y: 200
 * });
 * ```
 */
export default class ButtonStandard extends Button implements ButtonEvent {
  private _font: string
  private _fontSize: number
  private _textAlign: CanvasTextAlign
  private _textBaseline: CanvasTextBaseline
  private _isHovered: boolean = false
  private _hoverSound: Sound | null = null
  private _clickSound: Sound | null = null

  constructor(x: number = 0, y: number = 0, label: string = '') {
    super(x, y, label)
    this._font = 'Arial'
    this._fontSize = 16
    this._textAlign = 'center'
    this._textBaseline = 'middle'
    this._hoverSound = new Sound(hoverSound)
    this._clickSound = new Sound(clickSound)
  }

  public get font(): string {
    return this._font
  }

  public get fontSize(): number {
    return this._fontSize
  }

  public get textAlign(): CanvasTextAlign {
    return this._textAlign
  }

  public get textBaseline(): CanvasTextBaseline {
    return this._textBaseline
  }

  public set font(font: string) {
    this._font = font
  }

  public set fontSize(fontSize: number) {
    this._fontSize = fontSize
  }

  public set textAlign(textAlign: CanvasTextAlign) {
    this._textAlign = textAlign
  }

  public set textBaseline(textBaseline: CanvasTextBaseline) {
    this._textBaseline = textBaseline
  }

  public set hoverSound(sound: Sound) {
    this._hoverSound = sound
  }

  public get hoverSound(): Sound | null {
    return this._hoverSound
  }

  public set clickSound(sound: Sound) {
    this._clickSound = sound
  }

  public get clickSound(): Sound | null {
    return this._clickSound
  }

  /**
   * Define a posição do botão no canvas usando coordenadas absolutas ou alinhamento.
   *
   * @param {AlignedPosition} options - Objeto com opções de posicionamento
   * @param {HTMLCanvasElement} options.canvas - Canvas de referência para cálculos
   * @param {number} [options.x] - Coordenada X (obrigatória sem align ou com align horizontal)
   * @param {number} [options.y] - Coordenada Y (obrigatória sem align ou com align vertical)
   * @param {PositionState} [options.align] - Tipo de alinhamento (VERTICAL ou HORIZONTAL)
   * 
   * @returns {void}
   * 
   * @throws {ButtonError} Se coordenadas necessárias não forem fornecidas
   * 
   * @remarks
   * Modos de posicionamento:
   * - **Manual**: Fornece x e y sem align - posiciona nas coordenadas exatas
   * - **Vertical**: Usa align=VERTICAL com y - centraliza horizontalmente
   * - **Horizontal**: Usa align=HORIZONTAL com x - centraliza verticalmente
   * 
   * @example
   * // Posicionamento manual
   * button.setPosition({ canvas, x: 100, y: 200 });
   * 
   * @example
   * // Alinhamento vertical (centralizado horizontalmente)
   * button.setPosition({ canvas, align: PositionState.VERTICAL, y: 150 });
   * 
   * @example
   * // Alinhamento horizontal (centralizado verticalmente)
   * button.setPosition({ canvas, align: PositionState.HORIZONTAL, x: 300 });
   */
  public setPosition({ canvas, x, y, align }: AlignedPosition): void {
    if (!align) {
      if (!x && !y)
        throw new ButtonError(
          'É necessário fornecer pelo menos uma coordenada (x ou y) para posicionar o botão.'
        )
      this.positionX = x as number
      this.positionY = y as number
    } else {
      switch (align) {
        case PositionState.VERTICAL:
          if (!y)
            throw new ButtonError(`É necessário informar o valor da variável y`)
          this.setVerticalAlign(canvas, y)
          break
        case PositionState.HORIZONTAL:
          if (!x)
            throw new ButtonError(`É necessário informar o valor da variável x`)
          this.setHorizontalAlign(canvas, x)
          break
      }
      return
    }
  }

  /**
   * Verifica se as coordenadas do mouse estão dentro da área do botão.
   *
   * @param {number} xCoord - Coordenada X do mouse
   * @param {number} yCoord - Coordenada Y do mouse
   * 
   * @returns {boolean} `true` se o mouse estiver sobre o botão, `false` caso contrário
   * 
   * @remarks
   * Utiliza detecção de colisão AABB (Axis-Aligned Bounding Box) para determinar
   * se o ponto está dentro do retângulo do botão. Este método é fundamental para
   * implementar interações de hover e clique.
   * 
   * @example
   * ```typescript
   * if (button.isMouseOverButton(event.x, event.y)) {
   *   // Mouse está sobre o botão
   * }
   * ```
   */
  public isMouseOverButton(xCoord: number, yCoord: number): boolean {
    return (
      xCoord >= this.positionX &&
      xCoord <= this.positionX + this.width &&
      yCoord >= this.positionY &&
      yCoord <= this.positionY + this.height
    )
  }

  /**
   * Aplica efeito visual e sonoro de hover quando o mouse passa sobre o botão.
   *
   * @param {MouseEvent} event - Evento de mouse contendo coordenadas
   * 
   * @returns {void}
   * 
   * @remarks
   * Este método gerencia o estado de hover do botão:
   * 
   * **Quando o mouse ENTRA na área do botão:**
   * - Toca o som de hover (apenas na primeira vez)
   * - Ativa cursor pointer
   * - Aplica cores de hover (background e texto)
   * - Marca _isHovered como true
   * 
   * **Quando o mouse SAI da área do botão:**
   * - Desativa cursor pointer
   * - Restaura cores padrão
   * - Marca _isHovered como false
   * 
   * O controle de _isHovered evita reprodução repetida do som enquanto o mouse
   * permanece sobre o botão.
   */
  public applyHoverOnButton(event: MouseEvent): void {
    const hovering = this.isMouseOverButton(event.x, event.y)
    if (hovering) {
      if (!this._isHovered) this.playSound(this._hoverSound as Sound)
      this.shouldUsePointerCursor = true
      this.backgroundColor = this.backgroundColorOnHover.hover
      this.color = this.colorOnHover.hover
      this._isHovered = true
    } else {
      this.shouldUsePointerCursor = false
      this.backgroundColor = this.backgroundColorOnHover.default
      this.color = this.colorOnHover.default
      this._isHovered = false
    }
  }

  /**
   * Renderiza o botão no canvas com seu estado visual atual.
   *
   * @param {CanvasRenderingContext2D} context - Contexto de renderização 2D do canvas
   * 
   * @returns {void}
   * 
   * @remarks
   * Processo de renderização:
   * 1. Desenha retângulo de fundo com backgroundColor atual
   * 2. Configura estilo de texto (cor, fonte, alinhamento)
   * 3. Desenha o texto do label centralizado no botão
   * 
   * O texto é sempre centralizado horizontal e verticalmente,
   * usando as propriedades textAlign='center' e textBaseline='middle'.
   * 
   * @example
   * ```typescript
   * button.renderButton(context);
   * ```
   */
  public renderButton(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.backgroundColor || '#ccc'
    context.fillRect(this.positionX, this.positionY, this.width, this.height)

    context.fillStyle = this.color || 'white'
    context.font = `${this.fontSize} ${this.font}`
    context.textAlign = this.textAlign
    context.textBaseline = this.textBaseline
    context.fillText(
      this.label,
      this.positionX + this.width / 2,
      this.positionY + this.height / 2
    )
  }

  /**
   * Manipula evento de movimento do mouse sobre o botão.
   *
   * @param {MouseEvent} event - Evento de movimento do mouse
   * @param {Callback} [callback] - Função opcional executada após aplicar hover
   * 
   * @returns {void}
   * 
   * @remarks
   * Este método é chamado continuamente enquanto o mouse se move.
   * Aplica efeito de hover e opcionalmente executa um callback customizado,
   * permitindo comportamentos adicionais como redesenhar a cena.
   * 
   * @example
   * ```typescript
   * button.handleMouseMove(event, () => {
   *   console.log('Mouse moveu sobre o botão');
   * });
   * ```
   */
  public handleMouseMove(event: MouseEvent, callback?: Callback): void {
    this.applyHoverOnButton(event)
    callback?.()
  }

  /**
   * Manipula evento de clique no botão.
   *
   * @param {ButtonClickHandle} options - Objeto com configurações do clique
   * @param {MouseEvent} options.event - Evento de clique do mouse
   * @param {Callback} [options.callback] - Função executada ao clicar no botão
   * 
   * @returns {void}
   * 
   * @remarks
   * Verifica se o clique ocorreu dentro da área do botão.
   * Se sim:
   * - Reproduz o som de clique
   * - Executa o callback fornecido (se existir)
   * 
   * Este método é responsável pela lógica principal de interação do botão.
   * 
   * @example
   * ```typescript
   * button.handleOnClick({
   *   event: mouseEvent,
   *   callback: () => console.log('Botão clicado!')
   * });
   * ```
   */
  public handleOnClick({ event, callback }: ButtonClickHandle): void {
    const hovering = this.isMouseOverButton(event.x, event.y)
    if (hovering) {
      this.playSound(this._clickSound as Sound)
      callback?.()
    }
  }

  private setVerticalAlign(canvas: HTMLCanvasElement, y: number): void {
    this.positionX = canvas.width / 2 - this.width / 2
    this.positionY = y
  }

  private setHorizontalAlign(canvas: HTMLCanvasElement, x: number): void {
    this.positionY = canvas.height / 2 - this.height / 2
    this.positionX = x
  }

  private playSound(sound: Sound): void {
    if (!sound.isPlaying()) {
      sound.play().catch((error) => {
        throw new SoundError(ErrorState.AUDIO_FAILED_TO_LOAD, error)
      })
    }
  }
}
