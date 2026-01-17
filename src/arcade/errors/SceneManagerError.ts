/**
 * Erro relacionado ao gerenciamento de cenas do jogo.
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe SceneManagerError é uma extensão da classe Error
 * que representa erros específicos relacionados ao
 * gerenciamento de cenas no jogo.
 *
 *
 */
export default class SceneManagerError extends Error {
  private _message: string
  private _stack?: string

  constructor(message: string, originalError?: Error) {
    super(message)
    this._message = message
    this.name = 'SceneManagerError'

    if (originalError?.stack) {
      this._stack += '\nCaused by:\n' + originalError.stack
    }
  }

  public get message(): string {
    return this._message
  }
}
