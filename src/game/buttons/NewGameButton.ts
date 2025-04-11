import Arcade, { Callback, IButtonClickEvent } from '../../arcade'

class NewGameButton extends Arcade.StandardButton implements IButtonClickEvent {

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
 
  public handleOnClick(event: MouseEvent, callback?: Callback): void {
    throw new Error('Method not implemented.')
  }
  
}

export default NewGameButton