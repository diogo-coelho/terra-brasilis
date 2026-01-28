import path from 'path'
import { Request, Response } from 'express'
import FormattedDate from '@/server/utils/FormattedDate'
import { VIEW_PATH } from '../consts/constants'
import User from '../model/UserModel'
import MongoDBError from '../error/MongoDB'

/**
 * Controlador HTTP para operações relacionadas ao jogo.
 *
 * @class GameController
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe GameController gerencia requisições HTTP relacionadas ao jogo:
 * - Iniciar novo jogo (servir interface HTML)
 * - Salvar nome do usuário no MongoDB
 * - Logging de operações com timestamps
 * - Tratamento de erros de banco de dados
 * 
 * **Endpoints Implementados:**
 * 
 * **startNewGame (GET /):**
 * - Serve arquivo index.html do cliente
 * - Inicia interface do jogo no navegador
 * - Loga início de nova partida
 * 
 * **insertUserName (POST /insert-username):**
 * - Recebe nome do usuário via JSON
 * - Cria documento no MongoDB
 * - Retorna confirmação ou erro
 * - Loga operação com timestamp
 * 
 * Todos os métodos utilizam FormattedDate para logging consistente
 * e tratam erros de forma apropriada com mensagens descritivas.
 * 
 * @throws {MongoDBError} Lança erro se falhar ao salvar no banco de dados
 * 
 * @example
 * ```typescript
 * const controller = new GameController();
 * 
 * // Em uma rota Express
 * router.get('/', (req, res) => {
 *   controller.startNewGame(req, res);
 * });
 * 
 * router.post('/insert-username', (req, res) => {
 *   controller.insertUserName(req, res);
 * });
 * ```
 *
 * @see User
 * @see FormattedDate
 */
export default class GameController {
  /**
   * Inicia um novo jogo.
   * @param {Request} req - Solicitação HTTP
   * @param {Response} res - Resposta HTTP
   */
  public async startNewGame(req: Request, res: Response): Promise<void> {
    console.log(`[ ${new FormattedDate().formatted} ] : Novo jogo iniciado`)

    // Redireciona para a view onde o game vai rodar
    res.sendFile(path.join(__dirname, `${VIEW_PATH.GAME}/index.html`))
  }

  /**
   * Insere o nome de usuário no banco de dados.
   * @param {Request} req - Solicitação HTTP
   * @param {Response} res - Resposta HTTP
   */
  public async insertUserName(req: Request, res: Response): Promise<void> {
    try {
      const { userName } = req.body

      console.log(
        `[ ${new FormattedDate().formatted} ] : Nome de usuário recebido - ${userName}`
      )
      const userModel = new User({
        name: userName,
      })

      await userModel.save()

      console.log(
        `[ ${new FormattedDate().formatted} ] : Nome de usuário salvo no banco de dados - ${userName}`
      )
      res.status(200).json({ message: 'Nome de usuário salvo com sucesso.' })
    } catch (error: any | unknown) {
      console.error(
        `[ ${new FormattedDate().formatted} ] : Erro ao salvar nome de usuário - ${error.message}`
      )
      throw new MongoDBError(
        'Erro ao salvar nome de usuário no banco de dados.'
      )
    }
  }
}
