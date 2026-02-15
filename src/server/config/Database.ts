import 'dotenv/config'
import mongoose, { Mongoose } from 'mongoose'
import FormattedDate from '@/server/utils/FormattedDate'
import MongoDBError from '@/server/error/MongoDB'

/**
 * Gerenciador de conexão com MongoDB.
 *
 * @class Database
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Classe responsável por gerenciar a conexão com o banco de dados MongoDB
 * usando Mongoose. Gerencia ciclo de vida da conexão incluindo abertura,
 * monitoramento de eventos e fechamento.
 *
 * @remarks
 * Utiliza variáveis de ambiente para configurar URL e nome do banco de dados.
 * Monitora eventos de conexão, desconexão e erros.
 *
 * @example
 * ```typescript
 * const db = new Database();
 * await db.connection();
 * const mongoose = await db.database;
 * ```
 *
 * @see FormattedDate
 * @see MongoDBError
 */
export default class Database {
  private _database: Promise<Mongoose> | null = null
  private _date: string

  constructor() {
    this._date = new FormattedDate().formatted
  }

  public get database(): Promise<Mongoose> | null {
    if (!this._database) {
      throw new MongoDBError('Banco de dados não conectado')
    }
    return this._database
  }

  public get date(): string {
    return this._date
  }

  /**
   * Estabelece conexão com o banco de dados MongoDB.
   *
   * @returns {Promise<void>} Promise que resolve quando conectado
   *
   * @remarks
   * Configura event listeners para monitorar o estado da conexão.
   * Utiliza URL e nome do banco de variáveis de ambiente.
   *
   * @example
   * ```typescript
   * await database.connection();
   * ```
   */
  public async connection(): Promise<void> {
    console.log(`[ ${this.date} ] : Conectando ao banco de dados...`)

    mongoose.connection.on('connected', () => {
      console.log(`[ ${this.date} ] : Conexão estabelecida com sucesso`)
    })

    mongoose.connection.on('disconnected', () => {
      console.log(`[ ${this.date} ] : Conexão desconectada`)
    })

    mongoose.connection.on('error', (error: Error) => {
      console.error(`[ ${this.date} ] : Erro de conexão => ${error}`)
    })

    this._database = mongoose.connect(
      `${process.env.URL_MONGO_DB}/${process.env.DATABASE}`
    )
  }

  /**
   * Configura o fechamento da conexão ao receber sinal SIGINT.
   *
   * @remarks
   * Garante que a conexão seja fechada corretamente ao encerrar a aplicação.
   * Escuta o evento SIGINT (Ctrl+C) para fechar gracefully.
   */
  public closeConnection(): void {
    process.on('SIGINT', async () => {
      await this.database?.then((d) => d.connection.close())
      console.log(`[ ${this.date} ] : Mongoose encerrado`)
      process.exit(0)
    })
  }
}
