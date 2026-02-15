import { SceneEvent } from '@/arcade/core'
import { Image } from '@/arcade/images'
import { Scene } from '@/arcade/interfaces'
import { SceneManager } from '@/arcade/types'
import { ButtonStandardGroup, InputStandard } from '@/arcade/ui'
import { EventListenerState, PositionState } from '@/arcade/enums'

import backgroundImage from '@/arcade/assets/images/tb_insert_name_background.png'

import { GovernorGeneralNameInput } from '@/game/ui/inputs'
import { BackToMenuButton, GoToGameButton } from '@/game/ui/buttons'

/**
 * Cena de inserção do nome do Governador-Geral.
 *
 * @class InsertNameScene
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Cena onde o jogador insere o nome do seu personagem (Governador-Geral).
 * Exibe campo de input, imagem de fundo e botões de navegação.
 *
 * @extends SceneEvent
 * @implements Scene
 *
 * @remarks
 * - Valida entrada de texto com limite de caracteres
 * - Permite voltar ao menu ou iniciar o jogo
 * - Armazena nome do usuário no botão de iniciar
 *
 * @example
 * ```typescript
 * const insertNameScene = new InsertNameScene();
 * sceneManager.addScene(GameSceneState.INSERT_NAME, insertNameScene);
 * ```
 */
export default class InsertNameScene extends SceneEvent implements Scene {
  private _title: string
  private _backgroundImage: Image
  private _input: InputStandard
  private _canvas: HTMLCanvasElement
  private _listButtons: ButtonStandardGroup = new ButtonStandardGroup(
    0,
    520,
    30
  )
  private _shouldUsePointerCursor: boolean = false

  constructor() {
    super()
    this._title = 'Insira o nome do Governador-Geral:'
    this._input = new GovernorGeneralNameInput(450, 40)
    this._backgroundImage = new Image(backgroundImage)
    this._canvas = window.document.querySelector('canvas') as HTMLCanvasElement
    this.initializeButtons()
  }

  /**
   * Renderiza a cena de inserção de nome.
   *
   * @param {HTMLCanvasElement} canvas - Canvas do jogo
   * @param {CanvasRenderingContext2D} context - Contexto de renderização
   *
   * @remarks
   * Desenha fundo, título, campo de input e botões.
   * Gerencia cursor do mouse baseado em hover.
   */
  public drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    if (!this._backgroundImage.isLoaded()) return
    this._backgroundImage.setImageAsCover(canvas)
    context.save()
    context.globalAlpha = 0.8
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
    context.strokeStyle = '#2c0f0b'

    context.strokeText(this._title, canvas.width / 2, 130)
    context.fillText(this._title, canvas.width / 2, 130)

    this._input.setPosition({
      canvas,
      align: PositionState.VERTICAL,
      y: this._input.height + 150,
    })
    this._input.renderInputBox(context)
    this._shouldUsePointerCursor ||= this._input.shouldUsePointerCursor
    this._shouldUsePointerCursor ||= this._listButtons.buttons.some(
      (el) => el.shouldUsePointerCursor
    )

    this._listButtons.alignement = PositionState.HORIZONTAL
    this._listButtons.positionX = this._listButtons.getCenteredPositionX(canvas)
    this._listButtons.renderButtons(canvas, context)

    canvas.style.cursor = this._shouldUsePointerCursor ? 'pointer' : 'default'
  }

  /**
   * Manipula eventos de teclado na cena.
   *
   * @param {KeyboardEvent} event - Evento de teclado
   * @param {SceneManager} sceneManager - Gerenciador de cenas
   *
   * @remarks
   * Captura entrada de texto e atualiza o nome do usuário no botão.
   */
  public handleKeyboardEvent?(
    event: KeyboardEvent,
    sceneManager: SceneManager
  ): void {
    switch (event.type) {
      case EventListenerState.KEY_DOWN:
        this._input.handleKeyboardEvent(event)
        this.setUserNameInButton()
        break
    }
  }

  /**
   * Manipula eventos de mouse na cena.
   *
   * @param {MouseEvent} event - Evento de mouse
   * @param {SceneManager} scene - Gerenciador de cenas
   *
   * @remarks
   * Gerencia hover e click no input e nos botões.
   */
  public handleMouseEvent?(event: MouseEvent, scene: SceneManager): void {
    const canvas = this._canvas
    if (!canvas) return

    switch (event.type) {
      case EventListenerState.MOUSE_MOVE:
        this._input.handleMouseMove(event, () => {
          scene?.currentScene.drawScene(
            canvas,
            canvas.getContext('2d') as CanvasRenderingContext2D,
            0
          )
        })
        this._listButtons.handleMouseEvent(event, scene as SceneManager)
        break
      case EventListenerState.CLICK:
        this._input.inputText = ''
        this._input.handleMouseClick(event)
        this._listButtons.handleMouseEvent(event, scene as SceneManager)
        break
    }
  }

  private initializeButtons(): void {
    this._listButtons.setButtonsConfigurations({
      width: 210,
      height: 50,
      backgroundColor: '#84310a',
      backgroundColorOnHover: '#692303',
      color: '#FFFFFF',
      colorOnHover: '#D7D7D7',
    })

    const backToMenuButton = new BackToMenuButton('Voltar ao Menu')
    const goToGameButton = new GoToGameButton('Iniciar Jogo')

    this._listButtons.addButton(backToMenuButton)
    this._listButtons.addButton(goToGameButton)
  }

  private setUserNameInButton(): void {
    const goToGameButton = this._listButtons.buttons.find(
      (btn) => btn instanceof GoToGameButton
    )
    if (!goToGameButton) {
      throw new Error('GoToGameButton não encontrado na lista de botões.')
    }
    goToGameButton.userName = this._input.inputText
  }
}
