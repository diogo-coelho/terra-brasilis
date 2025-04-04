import 'dotenv/config'
import * as http from 'http'
import MainApplication from '@/server/config/MainApplication'
import Database from '@/server/config/Database'

class Server {
  private _port: string | boolean | number
  private _server: Promise<http.Server>

  constructor() {
    this._port = this.normalizePort(process.env.PORT || 3000)
    this._server = this.configureMainApplication()
  }

  public get port(): string | boolean | number {
    return this._port
  }

  public get server(): Promise<http.Server> {
    return this._server
  }

  private normalizePort(val: string | number): string | number | boolean {
    const port: number = typeof val === 'string' ? parseInt(val, 10) : val
    if (isNaN(port)) return val
    else if (port >= 0) return port
    else return false
  }

  private async configureMainApplication(): Promise<http.Server> {
    return new Promise((resolve, reject) => {
      Database.connection()
        .then(async () => {
          MainApplication.set('port', this._port)
          MainApplication.set('database', await Database.database)
          resolve(http.createServer(MainApplication))
        })
        .catch((error: unknown | Error) => reject(error))
    })
  }

  public closeDatabase(): void {
    MainApplication.get('database').closeConnection()
  }
}

export default Server
