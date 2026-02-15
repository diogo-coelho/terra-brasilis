/**
 * Erro customizado para erros de som.
 *
 * @class SoundError
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Classe de erro customizada para problemas relacionados ao carregamento
 * e reprodução de arquivos de áudio.
 *
 * @extends Error
 *
 * @remarks
 * Captura e encadeia erros originais para facilitar o debug de problemas com áudio.
 *
 * @example
 * ```typescript
 * throw new SoundError('Falha ao carregar arquivo de áudio');
 * ```
 */
export default class SoundError extends Error {
  private _message: string
  private _stack?: string

  constructor(message: string, originalError?: Error) {
    super(message)
    this._message = message
    this.name = 'SoundError'

    if (originalError?.stack) {
      this._stack += '\nCaused by:\n' + originalError.stack
    }
  }

  public get message(): string {
    return this._message
  }
}
