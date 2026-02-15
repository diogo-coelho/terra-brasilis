import { Router, Request, Response } from 'express'
import GameController from '@/server/controllers/GameController'

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
    this._router.post('/insert-username', this.insertUserName)
  }

  private startGame(req: Request, res: Response): void {
    const gameController = new GameController()
    gameController.startNewGame(req, res)
  }

  private insertUserName(req: Request, res: Response): void {
    const gameController = new GameController()
    gameController.insertUserName(req, res)
  }
}
