/**
 * Erro customizado para erros do servidor.
 *
 * @class ServerError
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Classe de erro customizada para erros relacionados ao servidor HTTP
 * e configurações da aplicação.
 *
 * @extends Error
 *
 * @remarks
 * Captura e armazena o stack trace para facilitar o debug.
 *
 * @example
 * ```typescript
 * throw new ServerError('Falha ao iniciar o servidor');
 * ```
 */
export default class ServerError extends Error {
  public _stackTrace?: string

  constructor(message: string) {
    super(message)
    this.name = 'ServerError'

    if ((Error as any).captureStackTrace) {
      ;(Error as any).captureStackTrace(this, ServerError)
    }

    this._stackTrace = this.stack
  }
}
