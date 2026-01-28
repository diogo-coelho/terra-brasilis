import 'dotenv/config'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import { ExpressApplication, IMainApplication } from '../types/types'
import GameRouter from '@/server/routes/GameRouter'

/**
 * Configuração principal da aplicação Express com middlewares, rotas e arquivos estáticos.
 *
 * @class MainApplication
 * @implements IMainApplication
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-10
 *
 * @description
 * A classe MainApplication centraliza toda configuração do Express:
 * - Inicializa instância do Express
 * - Configura middlewares (body-parser para JSON e URL-encoded)
 * - Define diretório de arquivos estáticos (cliente do jogo)
 * - Registra rotas da aplicação (GameRouter)
 * 
 * **Middlewares Configurados:**
 * - body-parser.json(): Parse de requisições JSON
 * - body-parser.urlencoded(): Parse de formulários
 * - express.static(): Servir arquivos estáticos do cliente
 * 
 * **Arquivos Estáticos:**
 * O diretório configurado via EXPRESS_STATIC_FILES contém:
 * - HTML do cliente do jogo
 * - JavaScript bundled (Webpack)
 * - Assets (imagens, sons)
 * 
 * **Rotas:**
 * Todas as rotas são gerenciadas por GameRouter:
 * - GET /: Inicia jogo
 * - POST /insert-username: Salva nome do jogador
 * 
 * @example
 * ```typescript
 * const app = new MainApplication();
 * const expressApp = app.mainApplication;
 * 
 * expressApp.listen(3000, () => {
 *   console.log('Servidor rodando!');
 * });
 * ```
 *
 * @see GameRouter
 */
export default class MainApplication implements IMainApplication {
  public _express: ExpressApplication

  constructor() {
    this._express = express()
    this.middlewares()
    this.staticFiles()
    this.routes()
  }

  /**
   * Método que retorna a aplicação
   *
   * @returns {express.Application} A aplicação Express configurada
   *
   */
  public get mainApplication(): ExpressApplication {
    return this._express
  }

  /**
   * Método privado que configura os middlewares da aplicação
   *
   */
  private middlewares(): void {
    this._express.use(bodyParser.json())
    this._express.use(bodyParser.urlencoded({ extended: false }))
  }

  /**
   * Método privado que configura os arquivos estáticos da aplicação
   *
   */
  private staticFiles(): void {
    this._express.use(
      express.static(path.resolve(__dirname, process.env.EXPRESS_STATIC_FILES!))
    )
  }

  /**
   * Método privado que configura as rotas da aplicação
   *
   */
  private routes(): void {
    this._express.use('/', new GameRouter().router)
  }
}
