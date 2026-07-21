import path from 'path'
import { Request, Response } from 'express'
import FormattedDate from '@/server/utils/FormattedDate'
import { VIEW_PATH } from '@/server/consts/constants'
import User from '@/server/model/UserModel'
import MongoDBError from '@/server/error/MongoDB'

/**
 * Controlador de rotas do jogo.
 *
 * @class GameController
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Gerencia as requisições HTTP relacionadas ao jogo, incluindo
 * inicialização de novas partidas e cadastro de jogadores.
 *
 * @remarks
 * Este controlador processa as requisições de início de jogo e
 * persistência de dados de usuários no MongoDB.
 *
 * @example
 * ```typescript
 * const controller = new GameController();
 * app.get('/new-game', controller.startNewGame);
 * ```
 *
 * @see User
 * @see GameRouter
 */
export default class GameController {
  /**
   * Inicia um novo jogo.
   *
   * @param {Request} req - Objeto de requisição Express
   * @param {Response} res - Objeto de resposta Express
   *
   * @returns {Promise<void>}
   *
   * @remarks
   * Envia o arquivo HTML principal do jogo para o cliente.
   */
  public async startNewGame(req: Request, res: Response): Promise<void> {
    console.log(`[ ${new FormattedDate().formatted} ] : Novo jogo iniciado`)

    // Redireciona para a view onde o game vai rodar
    res.sendFile(path.join(__dirname, `${VIEW_PATH.GAME}/index.html`))
  }

  /**
   * Salva o nome do usuário no banco de dados.
   *
   * @param {Request} req - Objeto de requisição Express contendo userName no body
   * @param {Response} res - Objeto de resposta Express
   *
   * @returns {Promise<void>}
   *
   * @throws {MongoDBError} Quando falha ao salvar no banco de dados
   *
   * @remarks
   * Recebe o nome do usuário via POST, cria um novo documento no MongoDB
   * e retorna status 200 em caso de sucesso.
   *
   * @example
   * ```typescript
   * // POST /insert-username
   * // Body: { userName: "Dom Pedro II" }
   * ```
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
