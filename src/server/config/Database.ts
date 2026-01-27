import 'dotenv/config'
import mongoose, { Mongoose } from 'mongoose'
import FormattedDate from '@/server/utils/FormattedDate'
import MongoDBError from '../error/MongoDB'

/**
 * Classe que representa a conexão ao banco de dados mongoDB
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-10
 *
 * @description
 * A classe Database é responsável por estabelecer a conexão com o banco de dados
 * mongoDB utilizando o mongoose. Ela também gerencia eventos de conexão,
 * desconexão e erros, além de fornecer um método para fechar a conexão
 * de forma adequada quando o processo é encerrado.
 *
 * @example new Database().connection()
 *
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
   * Método assíncrono que estabelece a conexão com o banco de dados
   *
   * @async
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
   * Método que desconecta do banco de dados
   * @returns {void}
   */
  public closeConnection(): void {
    process.on('SIGINT', async () => {
      await this.database?.then((d) => d.connection.close())
      console.log(`[ ${this.date} ] : Mongoose encerrado`)
      process.exit(0)
    })
  }
}
