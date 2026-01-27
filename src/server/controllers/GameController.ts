import path from 'path'
import { Request, Response } from 'express'
import FormattedDate from '@/server/utils/FormattedDate'
import { VIEW_PATH } from '../consts/constants'
import User from '../model/UserModel'
import MongoDBError from '../error/MongoDB'

/**
 * Classe que representa o controlador do jogo
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe GameController é responsável por gerenciar
 * as operações relacionadas ao jogo, incluindo
 * o início de um novo jogo.
 *
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
