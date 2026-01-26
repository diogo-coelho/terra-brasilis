import Scene from '@/arcade/interfaces/Scene'
import { SceneEvent, SceneManager } from '@/arcade/core'
import { ButtonStandardGroup } from '@/arcade/components'
import { Sound } from '@/arcade/sounds'
import { Image } from '@/arcade/images'

import themeSound from '@/arcade/assets/sounds/intro_theme_inspiring.mp3'
import backgroundImage from '@/arcade/assets/images/tb_intro_background.png'

import { ContinueGameButton, NewGameButton } from '@/game/components/buttons'

/**
 * A classe MainMenuScene representa a cena do menu principal do jogo.
 * Ela implementa a interface Scene e estende a classe SceneEvent.
 * Esta cena é responsável por exibir o título do jogo e pode ser expandida
 * no futuro para incluir opções de menu, configurações e outras funcionalidades relacionadas
 * ao menu principal.
 *
 * @class MainMenuScene
 * @extends SceneEvent
 * @implements Scene
 *
 * @example
 * const mainMenuScene = new MainMenuScene();
 *
 * @see Scene
 *
 */
export default class MainMenuScene extends SceneEvent implements Scene {
  private _title: string
  private _listButtons: ButtonStandardGroup = new ButtonStandardGroup(0, 130, 25)
  private _backgroundSound: Sound
  private _initializedSoundSetup: boolean = false
  private _backgroundImage!: Image
  private _shouldUsePointerCursor: boolean = false

  constructor() {
    super()
    this._title = 'Selecione uma opção'
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
    context.font = '30px "Jersey 15", sans-serif'
    context.textAlign = 'center'
    context.textBaseline = 'top'
    context.lineWidth = 3
    context.strokeStyle = '#37598b'

    context.strokeText(this._title, canvas.width / 2, 50)
    context.fillText(this._title, canvas.width / 2, 50)

    this._listButtons.renderButtons(canvas, context)

    this._shouldUsePointerCursor = this._listButtons.buttons.some(el => el.shouldUsePointerCursor)  
    canvas.style.cursor = this._shouldUsePointerCursor ? 'pointer' : 'default'
  }

  /**
   * Manipula eventos de mouse na cena.
   * @param {MouseEvent} event - O evento de mouse.
   * @param {SceneManager} scene - O gerenciador de cenas.
   */
  public handleMouseEvent(event: MouseEvent, scene?: SceneManager): void {
    this._listButtons.handleMouseEvent(event, scene as SceneManager)
  }

  /**
   * Inicializa os botões do menu.
   * @private
   * @returns {void}
   */
  private initializeButtons() {
    this._listButtons.setButtonsConfigurations({
      width: 450,
      height: 60,
      backgroundColor: '#84310a',
      backgroundColorOnHover: '#692303',
      color: '#FFFFFF',
      colorOnHover: '#D7D7D7',
    })

    const newGameButton = new NewGameButton('Novo jogo')
    const continueGameButton = new ContinueGameButton('Continuar jogo')

    this._listButtons.addButton(newGameButton)
    this._listButtons.addButton(continueGameButton)
  }

  /**
   * Inicia a reprodução do som de fundo da cena de introdução.
   * @private
   * @returns {void}
   */
  private startBackgroundSound(): void {
    if (this._initializedSoundSetup) return
    this._backgroundSound.loop(true)
    this._backgroundSound.setVolume(0.5)
    this._backgroundSound.play()
    this._initializedSoundSetup = true
  }
}
