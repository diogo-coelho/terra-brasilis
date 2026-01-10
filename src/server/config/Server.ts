import 'dotenv/config'
import * as http from 'http'
import MainApplication from './MainApplication'
import Database from './Database'
import { ExpressApplication } from '../types/types'
import ServerError from '../error/ServerError'
import { SERVER } from '../consts/constants'

/**
 * Classe que representa o servidor principal
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-10
 *
 *  A classe Server é responsável por configurar e iniciar o servidor HTTP
 *  utilizando a aplicação Express e a conexão com o banco de dados.
 *
 * @example new Server().server
 * @returns {Promise<http.Server>} O servidor HTTP configurado
 *
 */
export default class Server {
  private _application: ExpressApplication
  private _database: Database
  private _port: string | number | boolean
  private _server: Promise<http.Server>

  constructor() {
    this._application = new MainApplication().mainApplication
    this._database = new Database()
    this._port = this.normalizePort(process.env.PORT || '3000')
    this._server = this.configureMainApplication()
  }

  public get port(): string | number | boolean {
    return this._port
  }

  public get server(): Promise<http.Server> {
    return this._server
  }

  /**
   * Método que fecha a conexão com o banco de dados
   *
   */
  public closeDatabase(): void {
    this._application.get('database').closeConnection()
  }

  /**
   *  Método privado que normaliza a porta do servidor
   *
   * @param {string, boolean, number} val - A porta a ser normalizada
   * @returns {string, boolean, number} A porta normalizada
   */
  private normalizePort(val: string): string | number | boolean {
    const port: number = typeof val === 'string' ? parseInt(val, 10) : val
    if (isNaN(port)) return val
    else if (port >= 0) return port
    else return false
  }

  /**
   *  Método privado que configura a aplicação principal do servidor
   *
   * @returns {Promise<http.Server>} O servidor HTTP configurado
   */
  private async configureMainApplication(): Promise<http.Server> {
    try {
      await this._database.connection()
      this._application.set(SERVER.PORT, this.port)
      this._application.set(SERVER.DATABASE, this._database)
    } catch (error: unknown) {
      new ServerError(
        `Erro ao configurar o servidor: ${(error as Error).message}`
      )
    }

    return http.createServer(this._application)
  }
}
