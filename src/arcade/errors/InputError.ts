/**
 * Classe que representa erros relacionados a entradas de usuário.
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * A classe InputError estende a classe Error
 * e representa erros específicos relacionados a
 * entradas de usuário no jogo.
 *
 */
export default class InputError extends Error {
  private _message: string
  private _stack?: string

  constructor(message: string, originalError?: Error) {
    super(message)
    this._message = message
    this.name = 'InputError'
    if (originalError?.stack) {
      this._stack += '\nCaused by:\n' + originalError.stack
    }
  }

  public get message(): string {
    return this._message
  }
}
