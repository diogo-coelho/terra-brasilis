import * as http from 'http'
import FormattedDate from './utils/FormattedDate'
import Server from '@/server/config/Server'
import ServerError from './error/ServerError'
import { SERVER } from './consts/constants'

/**
 * Instância do servidor HTTP.
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * Este módulo inicializa e configura o servidor HTTP, lidando com eventos
 * de erro e de escuta. Utiliza a classe Server para configurar o servidor
 * e gerenciar conexões.
 *
 * @example
 * ```ts
 * import './src/server/index.ts'
 * ```
 *
 */
const serverInstance: Server = new Server()

serverInstance.server
  .then(async (server: http.Server) => {
    server.listen(serverInstance.port)
    server.on(SERVER.ERROR, onError)
    server.on(SERVER.LISTENING, () => onListening(server))
  })
  .catch((error: Error) => {
    console.error(
      `[${new FormattedDate().formatted}] - Erro ao iniciar o servidor: ${error.message}`
    )
  })

/**
 * Manipulador de erros do servidor.
 *
 * @param error - O erro ocorrido no servidor.
 * @throws {ServerError} - Lança um ServerError em caso de erro não tratado.
 * @description
 * Esta função lida com erros que ocorrem durante a operação do servidor HTTP.
 * Dependendo do código do erro, ela registra mensagens específicas no console
 * ou lança um ServerError para erros não tratados.
 *
 */
const onError = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== 'listen')
    throw new ServerError(`Erro no servidor: ${error.message}`)

  const bind =
    typeof serverInstance.port === 'string'
      ? `Pipe ${serverInstance.port}`
      : `Porta ${serverInstance.port}`

  serverInstance.closeDatabase()

  switch (error.code) {
    case SERVER.EACCESS:
      console.log(
        `[ ${new FormattedDate().formatted} ] : ${bind} requer privilégios elevados de acesso`
      )
      break

    case SERVER.EADDRESS:
      console.log(
        `[ ${new FormattedDate().formatted} ] : ${bind} já está em uso`
      )
      break

    default:
      throw new ServerError(`Erro no servidor: ${error.message}`)
  }
}

/**
 * Manipulador de evento de escuta do servidor.
 *
 * @param server - A instância do servidor HTTP.
 * @description
 * Esta função é chamada quando o servidor HTTP começa a escutar por conexões.
 * Ela registra uma mensagem no console indicando que o servidor está rodando
 * e em qual porta ou pipe ele está escutando.
 *
 */
const onListening = (server: http.Server): void => {
  const address = server.address()
  const bind =
    typeof address === 'string' ? `Pipe ${address}` : `Porta ${address?.port}`

  console.log(
    `[ ${new FormattedDate().formatted} ] : Servidor rodando em ${bind}`
  )
}
