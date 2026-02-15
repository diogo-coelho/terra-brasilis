/**
 * Erro customizado para erros de entrada.
 *
 * @class InputError
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Classe de erro customizada para problemas relacionados a campos de entrada,
 * validação e posicionamento de inputs.
 *
 * @extends Error
 *
 * @remarks
 * Utilizado quando parâmetros necessários para inputs não são fornecidos.
 *
 * @example
 * ```typescript
 * throw new InputError('É necessário informar a coordenada X');
 * ```
 */
export default class InputError extends Error {
  private _message: string
  private _stack?: string

  constructor(message: string, originalError?: Error) {
    super(message)
    this._message = message
    this.name = 'InputError'
    if (originalError?.stack) {
      this._stack += '\nCaused by:\n' + originalError.stack
    }
  }

  public get message(): string {
    return this._message
  }
}
