import * as http from 'http'
import date from '@/server/utils/FormattedDate'
import Server from '@/server/config/Server'

const httpServer = new Server()

httpServer.server.then((server: http.Server) => {
  server.listen(httpServer.port)
  server.on('error', onError)
  server.on('listening', () => onListening(server))
})

const onError = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== 'listen') throw error

  const bind =
    typeof httpServer.port === 'string'
      ? `Pipe ${httpServer.port}`
      : `Porta ${httpServer.port}`

  httpServer.closeDatabase()

  switch (error.code) {
    case 'EACCESS':
      console.log(
        `[ ${date.formattedDate} ] : ${bind} requer privilégios elevados de acesso`
      )
      break

    case `EADDRESS`:
      console.log(`[ ${date.formattedDate} ] : ${bind} já está em uso`)
      break

    default:
      throw error
  }
}

const onListening = (server: http.Server): void => {
  const address = server.address()
  const bind =
    typeof address === 'string' ? `Pipe ${address}` : `Porta ${address?.port}`

  console.log(`[ ${date.formattedDate} ] : Servidor rodando em ${bind}`)
}
