import 'dotenv/config'
import * as http from 'http'
import MainApplication from '@/server/config/MainApplication'
import Database from '@/server/config/Database'
import { ExpressApplication } from '@/server/types/types'
import ServerError from '@/server/error/ServerError'
import { SERVER } from '@/server/consts/constants'

/**
 * Servidor HTTP principal da aplicação.
 *
 * @class Server
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Gerencia o servidor HTTP do jogo, incluindo configuração da aplicação Express,
 * conexão com banco de dados e inicialização do servidor.
 *
 * @remarks
 * Esta classe integra a aplicação Express com o banco de dados MongoDB
 * e configura o servidor HTTP na porta especificada.
 *
 * @example
 * ```typescript
 * const server = new Server();
 * const httpServer = await server.server;
 * httpServer.listen(server.port);
 * ```
 *
 * @see MainApplication
 * @see Database
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
   * Fecha a conexão com o banco de dados.
   *
   * @remarks
   * Deve ser chamado ao encerrar o servidor para garantir
   * que as conexões sejam fechadas adequadamente.
   */
  public closeDatabase(): void {
    this._application.get('database').closeConnection()
  }

  /**
   * Normaliza o valor da porta para um formato válido.
   *
   * @param {string} val - Valor da porta a ser normalizado
   *
   * @returns {string | number | boolean} Porta normalizada
   *
   * @remarks
   * Converte string para número, valida se é uma porta válida (>= 0).
   */
  private normalizePort(val: string): string | number | boolean {
    const port: number = typeof val === 'string' ? parseInt(val, 10) : val
    if (isNaN(port)) return val
    else if (port >= 0) return port
    else return false
  }

  /**
   * Configura a aplicação principal conectando ao banco de dados.
   *
   * @returns {Promise<http.Server>} Servidor HTTP configurado
   *
   * @throws {ServerError} Quando falha ao conectar ao banco de dados
   *
   * @remarks
   * Estabelece conexão com MongoDB antes de criar o servidor HTTP.
   * Define configurações da aplicação como porta e referência ao banco.
   */
  private async configureMainApplication(): Promise<http.Server> {
    return new Promise((resolve, reject) => {
      this._database
        .connection()
        .then(async () => {
          this._application.set(SERVER.PORT, this._port)
          this._application.set(SERVER.DATABASE, await this._database.database)
          resolve(http.createServer(this._application))
        })
        .catch((error: unknown | Error) =>
          reject(
            new ServerError(`Erro ao conectar ao banco de dados: ${error}`)
          )
        )
    })
  }
}
