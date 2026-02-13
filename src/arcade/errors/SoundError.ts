/**
 * Exceção customizada para erros relacionados a operações de áudio.
 *
 * @class SoundError
 * @extends Error
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe SoundError representa erros específicos que ocorrem durante:
 * - Carregamento de arquivos de áudio
 * - Falhas na reprodução (autoplay bloqueado, formato não suportado)
 * - Erros de decodificação de áudio
 * - Problemas de configuração de áudio
 *
 * Estende Error nativo do JavaScript adicionando:
 * - Nome específico "SoundError" para identificação no stack trace
 * - Encadeamento de erros originais preservando contexto completo
 * - Mensagens descritivas sobre falhas de áudio
 *
 * Especialmente útil para debugar problemas com políticas de autoplay
 * do navegador e formatos de áudio não suportados.
 *
 * @example
 * ```typescript
 * // Erro de carregamento
 * try {
 *   await sound.play();
 * } catch (error) {
 *   throw new SoundError(
 *     'Falha ao reproduzir áudio',
 *     error as Error
 *   );
 * }
 *
 * // Erro de validação
 * if (!audioContext) {
 *   throw new SoundError('AudioContext não disponível');
 * }
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
