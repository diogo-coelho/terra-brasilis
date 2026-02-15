/**
 * Erro customizado para erros do MongoDB.
 *
 * @class MongoDBError
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Classe de erro customizada para erros relacionados a operações
 * do banco de dados MongoDB.
 *
 * @extends Error
 *
 * @remarks
 * Captura e armazena o stack trace para facilitar o debug de problemas
 * relacionados ao banco de dados.
 *
 * @example
 * ```typescript
 * throw new MongoDBError('Falha na conexão com MongoDB');
 * ```
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
