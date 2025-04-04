import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import GameRouter from '@/server/routes/GameRouter'

class MainApplication {
  public _express: express.Application

  constructor() {
    this._express = express()
    this.middleware()
    this.staticFiles()
    this.routes()
  }

  public get express(): express.Application {
    return this._express
  }

  private middleware(): void {
    this._express.use(bodyParser.json())
    this._express.use(bodyParser.urlencoded({ extended: false }))
  }

  private staticFiles(): void {
    this._express.use(express.static(process.env.EXPRESS_STATIC_FILES!))
  }

  private routes(): void {
    this.express.use('/', GameRouter)
  }
}

export default new MainApplication().express
