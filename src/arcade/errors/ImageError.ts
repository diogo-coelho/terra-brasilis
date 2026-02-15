/**
 * Erro customizado para erros de imagem.
 *
 * @class ImageError
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Classe de erro customizada para problemas relacionados ao carregamento
 * e manipulação de imagens.
 *
 * @extends Error
 *
 * @remarks
 * Captura erros de carregamento, redimensionamento e renderização de imagens.
 *
 * @example
 * ```typescript
 * throw new ImageError('Falha ao carregar imagem');
 * ```
 */
export default class ImageError extends Error {
  private _message: string
  private _stack?: string

  constructor(message: string, originalError?: Error) {
    super(message)
    this._message = message
    this.name = 'ImageError'

    if (originalError?.stack) {
      this._stack += '\nCaused by:\n' + originalError.stack
    }
  }

  public get message(): string {
    return this._message
  }
}
