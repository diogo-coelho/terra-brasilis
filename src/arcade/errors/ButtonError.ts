/**
 * Exceção customizada para erros relacionados a operações de botões.
 *
 * @class ButtonError
 * @extends Error
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * A classe ButtonError representa erros específicos que ocorrem durante:
 * - Posicionamento inválido de botões (coordenadas faltando)
 * - Configuração incorreta de propriedades
 * - Falhas em operações de renderização
 * - Problemas com eventos de botão
 * 
 * Esta classe estende Error nativo do JavaScript, adicionando:
 * - Nome específico "ButtonError" para identificação
 * - Encadeamento de stack trace quando causado por outro erro
 * - Mensagens personalizadas e descritivas
 * 
 * O encadeamento de erros permite rastrear a causa raiz quando um
 * ButtonError é lançado devido a outro erro.
 * 
 * @example
 * ```typescript
 * // Uso simples
 * throw new ButtonError('Parâmetros de posicionamento inválidos');
 * 
 * // Com erro original
 * try {
 *   button.setPosition({ canvas });
 * } catch (originalError) {
 *   throw new ButtonError(
 *     'Falha ao posicionar botão',
 *     originalError as Error
 *   );
 * }
 * ```
 */
export default class ButtonError extends Error {
  private _message: string
  private _stack?: string

  constructor(message: string, originalError?: Error) {
    super(message)
    this._message = message
    this.name = 'ButtonError'
    if (originalError?.stack) {
      this._stack += '\nCaused by:\n' + originalError.stack
    }
  }

  public get message(): string {
    return this._message
  }
}
