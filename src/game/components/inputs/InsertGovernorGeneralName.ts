import Arcade from "../../../arcade"

class InsertGovernorGeneralName extends Arcade.StandardInputBox {
  constructor(
    width: number,
    height: number,
    backgroundColor: string,
    backgroundColorOnHover: string,
    color: string,
    colorOnHover: string
  ) {
    super(width, height)

    this.backgroundColor = backgroundColor
    this.backgroundColorOnHover = backgroundColorOnHover
    this.color = color
    this.colorOnHover = colorOnHover
  }
}

export default InsertGovernorGeneralName