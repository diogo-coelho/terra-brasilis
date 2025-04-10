interface IButtonClickEvent {
  handleOnClick(event: MouseEvent, callback?: <T>(...args: any) => T | void): void
}

export default IButtonClickEvent