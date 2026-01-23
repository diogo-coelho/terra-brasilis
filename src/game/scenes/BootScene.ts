import { SceneEvent } from '@/arcade/core';
import Scene from '@/arcade/interfaces/Scene';
import { SceneManager } from '@/arcade/types';
import EventListenerState from '@/arcade/enums/EventListenerState';
import KeyboardKey from '@/arcade/enums/KeyboardKey';
import { Sound } from '@/arcade/sounds'

import themeSound from '@/arcade/assets/sounds/intro_theme_inspiring.mp3'

import { GameSceneState } from '../enums';

/**
 * A classe BootScene representa a cena de inicialização do jogo.
 * Ela implementa a interface Scene e estende a classe SceneEvent.
 * Esta cena lida com eventos de teclado e mouse, especificamente qualquer tecla pressionada ou clique do mouse,
 * que faz a transição para a cena de introdução do jogo.
 * 
 * @class BootScene
 * @extends SceneEvent
 * @implements Scene
 * 
 * @example
 * const bootScene = new BootScene();
 * 
 * @see Scene
 * @see SceneEvent
 * @see SceneManager
 * @see GameSceneState
 * 
 */
export default class BootScene extends SceneEvent implements Scene {

  private _backgroundSound: Sound
  private _phrase: string

  constructor() {
    super();
    this._phrase = 'Pressione qualquer tecla';
    this._backgroundSound = new Sound(themeSound);
  }

  public drawScene(
    canvas: HTMLCanvasElement, 
    context: CanvasRenderingContext2D, 
  ): void {

    /** Pinta todo o background preto */
    context.fillStyle = '#000'
    context.fillRect(0, 0, canvas.width, canvas.height)
    
    /** Escreve a frase centralizada */
    context.fillStyle = '#ffffff'
    context.font = '20px "Jersey 15", sans-serif'
    
    let xCoord = canvas.width / 2
    const phraseSize = context.measureText(this._phrase)
    xCoord = canvas.width / 2 - phraseSize.width / 2

    context.fillText(this._phrase, xCoord, canvas.height / 2)
  }
  
  /**
   * Lida com eventos de teclado.
   * @param {KeyboardEvent} event - O evento de teclado a ser manipulado.
   * @param {SceneManager} sceneManager - O gerenciador de cenas.
   */
  public handleKeyboardEvent?(event: KeyboardEvent, sceneManager: SceneManager): void {
    var action = () => {
      this._backgroundSound.stop()
      sceneManager.setCurrentScene(GameSceneState.INTRO)
    }
    this.onKeyboardEvent(event, {
      eventType: EventListenerState.KEY_DOWN,
      eventKey: KeyboardKey.ANY,
      action
    })
    this.startBackgroundSound()
  }

  /**
   * Lida com eventos de mouse.
   * @param {MouseEvent} event - O evento de mouse a ser manipulado.
   * @param {SceneManager} sceneManager - O gerenciador de cenas.
   */
  public handleMouseEvent?(event: MouseEvent, sceneManager: SceneManager): void {
    var action = () => {
      this._backgroundSound.stop()
      sceneManager.setCurrentScene(GameSceneState.INTRO)
    }
    this.onMouseEvent(event, {
      eventType: EventListenerState.CLICK,
      eventKey: KeyboardKey.ANY,
      action
    })
    this.startBackgroundSound()
  }

  /**
   * Inicia a reprodução do som de fundo da cena de boot.
   * @private
   * @returns {void}
   */
  private startBackgroundSound(): void {
    this._backgroundSound.play()
    this._backgroundSound.loop(true)
    this._backgroundSound.setVolume(0.5)
  }

}