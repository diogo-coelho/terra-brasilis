import Scene from '@/arcade/interfaces/Scene'
import { SceneEvent, SceneManager } from '@/arcade/core'
import { ButtonStandard } from '@/arcade/components'
import { Sound } from '@/arcade/sounds'
import { Image } from '@/arcade/images'

import themeSound from '@/arcade/assets/sounds/intro_theme_inspiring.mp3'
import backgroundImage from '@/arcade/assets/images/terra_brasilis_intro_background.png'

import { ContinueGameButton, NewGameButton } from '@/game/components/buttons'
import EventListenerState from '@/arcade/enums/EventListenerState'

/**
 * A classe MenuScene representa a cena do menu principal do jogo.
 * Ela implementa a interface Scene e estende a classe SceneEvent.
 * Esta cena é responsável por exibir o título do jogo e pode ser expandida
 * no futuro para incluir opções de menu, configurações e outras funcionalidades relacionadas
 * ao menu principal.
 *
 * @class MenuScene
 * @extends SceneEvent
 * @implements Scene
 *
 * @example
 * const menuScene = new MenuScene();
 *
 * @see Scene
 *
 */
export default class MenuScene extends SceneEvent implements Scene {
  private _title: string
  private _buttons: ButtonStandard[] = []
  private _backgroundSound: Sound
  private _initializedSoundSetup: boolean = false
  private _backgroundImage!: Image

  constructor() {
    super()
    this._title = 'Menu'
    this._backgroundSound = new Sound(themeSound)
    this._backgroundImage = new Image(backgroundImage)
    this.initializeButtons()
  }

  /**
   * Método chamado ao entrar na cena.
   * Inicia a reprodução do som de fundo.
   * @returns {void}
   */
  public onEnter(): void {
    this.startBackgroundSound()
  }

  /**
   * Método chamado ao sair da cena.
   * Para a reprodução do som de fundo.
   * @returns {void}
   */
  public onExit(): void {
    this._backgroundSound.stop()
  }

  /**
   * Desenha a cena do menu no canvas.
   * @param {HTMLCanvasElement} canvas - O elemento HTMLCanvasElement onde a cena será desenhada.
   * @param {CanvasRenderingContext2D} context - O contexto de renderização 2D do canvas.
   * @returns {void}
   */
  public drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    /** Ajusta a imagem de fundo para cobrir todo o canvas */
    if (!this._backgroundImage.isLoaded()) return
    this._backgroundImage.setImageAsCover(canvas)
    context.save()
    context.globalAlpha = 0.6
    /** Desenhando a imagem de fundo */
    context.drawImage(
      this._backgroundImage.image as CanvasImageSource,
      0,
      0,
      canvas.width,
      canvas.height
    )
    context.restore()

    context.fillStyle = '#FFFFFF'
    context.font = '25px "Jersey 15", sans-serif'
    context.textAlign = 'center'
    context.textBaseline = 'top'
    context.lineWidth = 3
    context.strokeStyle = '#000000'

    context.fillText(this._title, canvas.width / 2, 50)
    context.strokeText(this._title, canvas.width / 2, 50)

    const initialPosition = 120

    this._buttons.forEach((btn, i) => {
      const margin = i === 0 ? 0 : 20
      btn.setPosition({
        canvas,
        align: 'vertical',
        y: i * btn.height + margin + initialPosition,
      })
      btn.renderButton(context)
    })
  }

  public handleMouseEvent(event: MouseEvent, scene?: SceneManager): void {
    const canvas = window.document.querySelector('canvas')
    if (!canvas) return

    switch (event.type) {
      case EventListenerState.MOUSE_MOVE:
        this._buttons.forEach((btn) => {
          btn.handleMouseMove(event, canvas, () => {
            scene?.currentScene.drawScene(canvas, canvas.getContext('2d')!, 0)
          })
        })
        this.setCursorWhenAnyButtonIsHovered(event, canvas)
        break
      case EventListenerState.CLICK:
        this._buttons.forEach((btn) => {
          btn.handleOnClick({ event, scene, callback: () => this.onExit() })
        })
    }
  }

  /**
   * Inicializa os botões do menu.
   * @private
   * @returns {void}
   */
  private initializeButtons() {
    this._buttons = []
    /** Botão de Novo Jogo */
    const newGameButton = new NewGameButton(
      450,
      60,
      'Novo jogo',
      '#008000',
      '#016501',
      'white',
      'white'
    )
    this._buttons.push(newGameButton)

    /** Botão de Continuar Jogo */
    const continueGameButton = new ContinueGameButton(
      450,
      60,
      'Continuar jogo',
      '#008000',
      '#016501',
      'white',
      'white'
    )
    this._buttons.push(continueGameButton)
  }

  /**
   * Inicia a reprodução do som de fundo da cena de introdução.
   * @private
   * @returns {void}
   */
  private startBackgroundSound(): void {
    if (this._initializedSoundSetup) return
    this._backgroundSound.play()
    this._backgroundSound.loop(true)
    this._backgroundSound.setVolume(0.5)
    this._initializedSoundSetup = true
  }

  /**
   * Define o cursor do mouse quando algum botão está sendo hover.
   * @private
   * @param {HTMLCanvasElement} canvas - O elemento canvas onde os botões estão desenhados.
   */
  private setCursorWhenAnyButtonIsHovered(
    event: MouseEvent,
    canvas: HTMLCanvasElement
  ): void {
    const anyButtonIsHovered = this._buttons.some((btn) =>
      btn.isMouseOverButton(event.x, event.y)
    )
    if (anyButtonIsHovered) {
      canvas.style.cursor = 'pointer'
    } else {
      canvas.style.cursor = 'default'
    }
  }
}
