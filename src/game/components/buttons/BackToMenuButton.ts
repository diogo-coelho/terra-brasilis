import { Arcade } from "@/arcade";
import { SceneManager } from "@/arcade/core";

import { GameSceneState } from "@/game/enums";

/**
 * Classe que representa o botão de voltar ao menu principal.
 * 
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 * 
 * @description
 * A classe BackToMenuButton é uma implementação concreta
 * da classe ButtonStandard, representando o botão
 * de voltar ao menu principal. Ela define o comportamento
 * específico ao clicar no botão, que é
 * navegar para a cena do menu principal.
 * 
 * @constructor
 * @param {string} label - O rótulo do botão.
 * 
 * @example
 * const backToMenuButton = new BackToMenuButton(
 * 'Back to Menu',
 * );
 * 
 */
export default class BackToMenuButton extends Arcade.Components.ButtonStandard {

  constructor(label: string) {
    super(0, 0, label);
  }

  public onClick(scene: SceneManager): void {
    scene?.setCurrentScene(GameSceneState.MAIN_MENU);
  }

}