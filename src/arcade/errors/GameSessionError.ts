/**
 * Erro customizado para erros de sessão de jogo.
 *
 * @class GameSessionError
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Classe de erro customizada para problemas relacionados à inicialização
 * e gerenciamento de sessões de jogo.
 *
 * @extends Error
 *
 * @remarks
 * Utilizado quando há falhas ao criar ou gerenciar partidas.
 *
 * @example
 * ```typescript
 * throw new GameSessionError('Sessão de jogo não inicializada');
 * ```
 */
export default class GameSessionError extends Error {
  private _message: string
  private _stack?: string

  constructor(message: string, originalError?: Error) {
    super(message)
    this._message = message
    this.name = 'GameSessionError'
    if (originalError?.stack) {
      this._stack += '\nCaused by:\n' + originalError.stack
    }
  }

  public get message(): string {
    return this._message
  }
}
