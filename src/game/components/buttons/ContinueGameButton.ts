import Arcade, { ButtonClickHandle } from '../../../arcade'
import { GameSceneState } from '../../enums'

class ContinueGameButton extends Arcade.StandardButton {
  constructor(
    width: number,
    height: number,
    label: string,
    backgroundColor: string,
    backgroundColorOnHover: string,
    color: string,
    colorOnHover: string
  ) {
    super(width, height, label)

    this.backgroundColor = backgroundColor
    this.backgroundColorOnHover = backgroundColorOnHover
    this.color = color
    this.colorOnHover = colorOnHover
  }

  public handleOnClick({ event, scene }: ButtonClickHandle): void {
    if (!this.isMouseOverButton(event?.x as number, event?.y as number)) return
    scene?.setCurrentScene(GameSceneState.GAME_SCENE)
  }
}

export default ContinueGameButton
