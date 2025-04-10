import Arcade, { IButtonClickEvent } from "../../arcade";

class ContinueGameButton extends Arcade.StandardButton implements IButtonClickEvent {

  public handleOnClick(event: MouseEvent, callback?: <T>(...args: any) => T | void): void {
    throw new Error("Method not implemented.");
  }

}

export default ContinueGameButton