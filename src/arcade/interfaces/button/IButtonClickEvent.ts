interface IButtonClickEvent {
  /**
   * Método que lida com evento de clique do botão
   * @param event - Evento de mouse
   * @param callback - Função de callback
   */
  handleOnClick(
    event: MouseEvent,
    callback?: <T>(...args: any) => T | void
  ): void
}

export default IButtonClickEvent
