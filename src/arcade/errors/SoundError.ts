/**
 * Classe personalizada para representar erros relacionados
 * a sons no motor de jogo Arcade.
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe SoundError estende a classe nativa Error do JavaScript,
 * permitindo a criação de erros específicos para operações relacionadas a sons,
 * como carregamento, reprodução e manipulação de áudio no jogo.
 *
 */
export default class SoundError extends Error {
  private _message: string
  private _stack?: string

  constructor(message: string, originalError?: Error) {
    super(message)
    this._message = message
    this.name = 'SoundError'

    if (originalError?.stack) {
      this._stack += '\nCaused by:\n' + originalError.stack
    }
  }

  public get message(): string {
    return this._message
  }
}
