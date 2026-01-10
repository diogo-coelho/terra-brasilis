import 'dotenv/config'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import { ExpressApplication, IMainApplication } from '../types/types'

/**
 * Classe que representa a aplicação principal do servidor Express
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-10
 *
 * A classe MainApplication é responsável por configurar a aplicação Express,
 * incluindo middlewares, arquivos estáticos e rotas.
 *
 * @example new MainApplication().mainApplication
 * @returns {express.Application} A aplicação Express configurada
 *
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
    this._express.use(bodyParser.urlencoded({ extended: true }))
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
    this._express.get('/', (req, res) => {
      console.log('Servidor rodando!')
    })
  }
}
