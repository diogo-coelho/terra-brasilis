import 'dotenv/config'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import { ExpressApplication, IMainApplication } from '@/server/types/types'
import GameRouter from '@/server/routes/GameRouter'

/**
 * Aplicação Express principal.
 *
 * @class MainApplication
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Configura e gerencia a aplicação Express, incluindo middlewares,
 * arquivos estáticos e rotas da API.
 *
 * @implements IMainApplication
 *
 * @remarks
 * Esta classe centraliza toda a configuração do servidor Express,
 * incluindo body-parser para processar requisições e servir arquivos estáticos.
 *
 * @example
 * ```typescript
 * const app = new MainApplication();
 * const expressApp = app.mainApplication;
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

  public get mainApplication(): ExpressApplication {
    return this._express
  }

  /**
   * Configura os middlewares da aplicação.
   *
   * @remarks
   * Adiciona body-parser para processar JSON e URL-encoded data.
   */
  private middlewares(): void {
    this._express.use(bodyParser.json())
    this._express.use(bodyParser.urlencoded({ extended: false }))
  }

  /**
   * Configura o diretório de arquivos estáticos.
   *
   * @remarks
   * Serve arquivos estáticos do diretório especificado em variáveis de ambiente.
   */
  private staticFiles(): void {
    this._express.use(
      express.static(path.resolve(__dirname, process.env.EXPRESS_STATIC_FILES!))
    )
  }

  /**
   * Configura as rotas da aplicação.
   *
   * @remarks
   * Adiciona o roteador do jogo na raiz da aplicação.
   */
  private routes(): void {
    this._express.use('/', new GameRouter().router)
  }
}
