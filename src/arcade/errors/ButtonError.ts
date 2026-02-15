/**
 * Erro customizado para erros de botão.
 *
 * @class ButtonError
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Classe de erro customizada para problemas relacionados à configuração
 * e posicionamento de botões.
 *
 * @extends Error
 *
 * @remarks
 * Utilizado quando parâmetros necessários para botões não são fornecidos.
 *
 * @example
 * ```typescript
 * throw new ButtonError('É necessário informar a posição do botão');
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
