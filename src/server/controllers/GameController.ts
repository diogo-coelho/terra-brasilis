import path from 'path'
import { Request, Response } from 'express'
import FormattedDate from '@/server/utils/FormattedDate'
import { VIEW_PATH } from '../consts/constants'

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
  public async startNewGame(req: Request, res: Response): Promise<void> {
    console.log(`[ ${new FormattedDate().formatted} ] : Novo jogo iniciado`)

    // Redireciona para a view onde o game vai rodar
    res.sendFile(path.join(__dirname, `${VIEW_PATH.GAME}/index.html`))
  }
}
