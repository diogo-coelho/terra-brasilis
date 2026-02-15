import Scene from '@/arcade/interfaces/Scene'
import { SceneEvent, SceneManager } from '@/arcade/core'
import { ButtonStandardGroup } from '@/arcade/ui'
import { Sound } from '@/arcade/sounds'
import { Image } from '@/arcade/images'

import themeSound from '@/arcade/assets/sounds/intro_theme_inspiring.mp3'
import backgroundImage from '@/arcade/assets/images/tb_intro_background.png'

import { ContinueGameButton, NewGameButton } from '@/game/ui/buttons'

/**
 * Cena do menu principal do jogo.
 *
 * @class MainMenuScene
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Menu principal com opções de "Novo jogo" e "Continuar jogo".
 * Exibe título, imagem de fundo e botões interativos com sons.
 *
 * @extends SceneEvent
 * @implements Scene
 *
 * @remarks
 * - Música de fundo contínua
 * - Botões com efeitos de hover
 * - Navegação para InsertNameScene ou LoadGame
 *
 * @example
 * ```typescript
 * const mainMenuScene = new MainMenuScene();
 * sceneManager.addScene(GameSceneState.MAIN_MENU, mainMenuScene);
 * ```
 */
export default class MainMenuScene extends SceneEvent implements Scene {
  private _title: string
  private _listButtons: ButtonStandardGroup = new ButtonStandardGroup(
    0,
    130,
    25
  )
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

  public onEnter(): void {
    this.startBackgroundSound()
  }

  public onExit(): void {
    this._backgroundSound.stop()
  }

  /**
   * Renderiza a cena do menu principal.
   *
   * @param {HTMLCanvasElement} canvas - Canvas do jogo
   * @param {CanvasRenderingContext2D} context - Contexto de renderização
   *
   * @remarks
   * Desenha fundo, título e botões do menu.
   * Gerencia cursor do mouse baseado em hover.
   */
  public drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    if (!this._backgroundImage.isLoaded()) return
    this._backgroundImage.setImageAsCover(canvas)
    context.save()
    context.globalAlpha = 0.6
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

    this._shouldUsePointerCursor = this._listButtons.buttons.some(
      (el) => el.shouldUsePointerCursor
    )
    canvas.style.cursor = this._shouldUsePointerCursor ? 'pointer' : 'default'
  }

  /**
   * Manipula eventos de mouse no menu principal.
   *
   * @param {MouseEvent} event - Evento de mouse
   * @param {SceneManager} [scene] - Gerenciador de cenas
   *
   * @remarks
   * Propaga eventos para o grupo de botões.
   */
  public handleMouseEvent(event: MouseEvent, scene?: SceneManager): void {
    this._listButtons.handleMouseEvent(event, scene as SceneManager)
  }

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

  private startBackgroundSound(): void {
    if (this._initializedSoundSetup) return
    this._backgroundSound.loop(true)
    this._backgroundSound.setVolume(0.5)
    this._backgroundSound.play()
    this._initializedSoundSetup = true
  }
}
