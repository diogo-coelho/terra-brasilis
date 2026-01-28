import { Router, Request, Response } from 'express'
import GameController from '@/server/controllers/GameController'

/**
 * Roteador Express que define endpoints HTTP para operações do jogo.
 *
 * @class GameRouter
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe GameRouter configura rotas HTTP usando Express Router:
 * - Define mapeamento entre URLs e métodos do controlador
 * - Inicializa GameController para cada requisição
 * - Fornece interface RESTful para o cliente
 * 
 * **Rotas Configuradas:**
 * 
 * - **GET /**
 *   - Inicia novo jogo
 *   - Serve interface HTML do cliente
 *   - Handler: GameController.startNewGame
 * 
 * - **POST /insert-username**
 *   - Salva nome do usuário
 *   - Espera JSON: { userName: string }
 *   - Retorna: { message: string } ou erro
 *   - Handler: GameController.insertUserName
 * 
 * O router é registrado na aplicação Express principal
 * no caminho raiz ("/").
 * 
 * @example
 * ```typescript
 * const gameRouter = new GameRouter();
 * app.use('/', gameRouter.router);
 * 
 * // Requisições:
 * // GET http://localhost:3000/
 * // POST http://localhost:3000/insert-username
 * //   Body: { "userName": "João Silva" }
 * ```
 *
 * @see GameController
 * @see Express.Router
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
