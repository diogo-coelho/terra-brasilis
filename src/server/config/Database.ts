import 'dotenv/config'
import mongoose, { Mongoose } from 'mongoose'
import FormattedDate from '@/server/utils/FormattedDate'
import MongoDBError from '@/server/error/MongoDB'

/**
 * Gerenciador de conexão MongoDB usando Mongoose com tratamento de eventos.
 *
 * @class Database
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-10
 *
 * @description
 * A classe Database encapsula toda lógica de conexão com MongoDB:
 * - Estabelece conexão usando Mongoose
 * - Monitora eventos de conexão (connected, disconnected, error)
 * - Fornece logging detalhado com timestamps
 * - Gerencia desconexão graceful (SIGINT)
 * - Utiliza variáveis de ambiente para configuração
 *
 * **Eventos Monitorados:**
 * - **connected**: Conexão estabelecida com sucesso
 * - **disconnected**: Conexão perdida
 * - **error**: Erro durante operações do banco
 *
 * **Variáveis de Ambiente:**
 * - URL_MONGO_DB: URL de conexão do MongoDB
 * - DATABASE: Nome do banco de dados
 *
 * A classe garante que a conexão seja fechada adequadamente quando
 * o processo recebe sinal de interrupção (Ctrl+C), evitando
 * conexões pendentes.
 *
 * @throws {MongoDBError} Lança erro se tentar acessar database antes de conectar
 *
 * @example
 * ```typescript
 * const database = new Database();
 *
 * await database.connection();
 * const db = await database.database;
 *
 * // Configurar graceful shutdown
 * database.closeConnection();
 * ```
 *
 * @see Mongoose
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
