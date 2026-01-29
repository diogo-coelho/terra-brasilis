import 'dotenv/config'
import * as http from 'http'
import MainApplication from '@/server/config/MainApplication'
import Database from '@/server/config/Database'
import { ExpressApplication } from '@/server/types/types'
import ServerError from '@/server/error/ServerError'
import { SERVER } from '@/server/consts/constants'

/**
 * Servidor HTTP principal que integra Express, MongoDB e configurações da aplicação.
 *
 * @class Server
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-10
 *
 * @description
 * A classe Server orquestra a inicialização completa do servidor do jogo:
 * - Configura aplicação Express com middlewares e rotas
 * - Estabelece conexão com banco de dados MongoDB
 * - Cria servidor HTTP
 * - Normaliza e valida porta de execução
 * - Gerencia ciclo de vida do servidor e banco de dados
 * 
 * **Processo de Inicialização:**
 * 1. Carrega variáveis de ambiente (.env)
 * 2. Inicializa aplicação Express (MainApplication)
 * 3. Cria instância de Database
 * 4. Normaliza porta (padrão: 3000)
 * 5. Conecta ao MongoDB
 * 6. Configura aplicação Express com porta e database
 * 7. Cria servidor HTTP
 * 
 * A configuração é assíncrona para garantir que o banco de dados
 * esteja conectado antes de aceitar requisições.
 * 
 * @throws {ServerError} Lança erro se falhar ao conectar com o banco de dados
 * 
 * @example
 * ```typescript
 * const server = new Server();
 * 
 * server.server.then(httpServer => {
 *   httpServer.listen(server.port, () => {
 *     console.log(`Servidor rodando na porta ${server.port}`);
 *   });
 * });
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
