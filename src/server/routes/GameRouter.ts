import { Router, Request, Response } from 'express'
import GameController from '@/server/controllers/GameController'

/**
 * Classe que representa as rotas relacionadas ao jogo
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe GameRouter é responsável por definir as rotas
 * relacionadas ao jogo, utilizando o Express Router.
 * Ela mapeia as requisições HTTP para os métodos
 * do GameController.
 *
 *
 */
export default class GameRouter {
  private _router: Router

  constructor() {
    this._router = Router()
    this.initRoutes()
  }

  public get router(): Router {
    return this._router
  }

  private initRoutes(): void {
    this._router.get('/', this.startGame)
  }

  private startGame(req: Request, res: Response): void {
    const gameController = new GameController()
    gameController.startNewGame(req, res)
  }
}
