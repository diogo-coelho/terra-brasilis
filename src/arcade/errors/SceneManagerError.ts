/**
 * Erro customizado para erros do gerenciador de cenas.
 *
 * @class SceneManagerError
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Classe de erro customizada para problemas relacionados ao gerenciamento
 * e transição de cenas do jogo.
 *
 * @extends Error
 *
 * @remarks
 * Lançado quando cenas não estão mapeadas ou estados inválidos são acessados.
 *
 * @example
 * ```typescript
 * throw new SceneManagerError('Nenhuma cena atual definida');
 * ```
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
