import 'dotenv/config'
import mongoose, { Mongoose } from 'mongoose'
import date from '@/server/utils/FormattedDate'

class Database {
  private _database: Promise<Mongoose>

  constructor() {
    this._database = mongoose.connect(
      `${process.env.URL_MONGO_DB}/${process.env.DATABASE}`
    )
  }

  public get database(): Promise<Mongoose> {
    return this._database
  }

  public async connection(): Promise<void> {
    const database = await this._database
    database.connection.on('connected', () => {
      console.log(`[${date.formattedDate}] : Conexão estabelecida com sucesso`)
    })

    database.connection.on('disconnected', () => {
      console.log(`[ ${date.formattedDate} ] : Conexão desconectada`)
    })

    database.connection.on('error', (error: Error) => {
      console.error(`[ ${date.formattedDate} ] : Erro de conexão => ${error}`)
    })
  }

  public closeConnection(): void {
    process.on('SIGINT', async () => {
      const database = await this._database
      database.connection.close()
      console.log(`[ ${date.formattedDate} ] : Mongoose encerrado`)
      process.exit(0)
    })
  }
}

export default new Database()