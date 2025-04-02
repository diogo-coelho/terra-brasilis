import path from 'path'
import { Request, Response } from 'express'
import date from '@/server/utils/FormattedDate'

class GameController {
  public async startGame(req: Request, resp: Response): Promise<void> {
    console.log(`[ ${date.formattedDate} ] : Novo jogo iniciado`)

    // Redireciona para a view onde o game vai rodar
    resp.render(path.join(__dirname, '../game/view/index'))
  }
}

export default GameController