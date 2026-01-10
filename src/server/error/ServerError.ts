/**
 * Classe que representa um erro genérico do servidor
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-10
 *
 * A classe ServerError estende a classe Error do JavaScript e é usada para
 * representar erros genéricos do servidor.
 *
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
