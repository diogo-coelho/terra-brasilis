/**
 * Erro customizado para erros de cenário.
 *
 * @class ScenarioError
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Classe de erro customizada para problemas relacionados à inicialização,
 * configuração e manipulação de cenários do jogo.
 *
 * @extends Error
 *
 * @remarks
 * Captura e encadeia erros originais para facilitar o rastreamento de problemas.
 *
 * @example
 * ```typescript
 * throw new ScenarioError('Cenário não inicializado');
 * ```
 */
export default class ScenarioError extends Error {
  private _message: string
  private _stack?: string

  constructor(message: string, originalError?: Error) {
    super(message)
    this._message = message
    this.name = 'ScenarioError'
    if (originalError?.stack) {
      this._stack += '\nCaused by:\n' + originalError.stack
    }
  }

  public get message(): string {
    return this._message
  }
}
