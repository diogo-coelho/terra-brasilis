import { Router, Request, Response } from 'express'
import GameController from '@/server/controllers/GameController'

export class GameRouter {
  private _router: Router

  constructor() {
    this._router = Router()
    this.init()
  }

  public get router(): Router {
    return this._router
  }

  private init(): void {
    this._router.get('/', this.startGame)
  }

  private startGame(req: Request, resp: Response): void {
    const gameController = new GameController()
    gameController.startGame(req, resp)
  }
}

const gameRouter = new GameRouter()
export default gameRouter.router
