/**
 * Classe de erro genérico do MongoDB
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-10
 *
 * A classe MongoDBError estende a classe ServerError
 * e é usada para representar erros genéricos
 * relacionados ao MongoDB.
 *
 */
export default class MongoDBError extends Error {
  public _stackTrace?: string

  constructor(message: string) {
    super(message)
    this.name = 'MongoDBError'

    if ((Error as any).captureStackTrace) {
      ;(Error as any).captureStackTrace(this, MongoDBError)
    }

    this._stackTrace = this.stack
  }
}
