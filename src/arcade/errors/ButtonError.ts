/**
 * Classe de erro customizado para erros relacionados a botões.
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * A classe ButtonError estende a classe Error
 * e representa erros específicos relacionados ao
 * carregamento e manipulação de botões no jogo.
 *
 */
export default class ButtonError extends Error {
  private _message: string
  private _stack?: string

  constructor(message: string, originalError?: Error) {
    super(message)
    this._message = message
    this.name = 'ButtonError'
    if (originalError?.stack) {
      this._stack += '\nCaused by:\n' + originalError.stack
    }
  }

  public get message(): string {
    return this._message
  }
}
