/**
 * Exceção customizada para erros relacionados a operações de imagem.
 *
 * @class ImageError
 * @extends Error
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * A classe ImageError representa erros específicos que ocorrem durante:
 * - Carregamento de arquivos de imagem
 * - Redimensionamento e transformações
 * - Acesso a propriedades antes do carregamento completo
 * - Parâmetros inválidos em operações de imagem
 * 
 * Estende Error nativo adicionando:
 * - Nome específico "ImageError" para identificação
 * - Encadeamento de stack trace quando causado por outro erro
 * - Contexto sobre falhas em operações de imagem
 * 
 * @example
 * ```typescript
 * // Erro de parâmetros
 * if (!targetWidth && !targetHeight) {
 *   throw new ImageError(
 *     'Largura ou altura alvo devem ser fornecidos'
 *   );
 * }
 * 
 * // Erro com causa original
 * try {
 *   image.resizeProportionally({ targetWidth: -100 });
 * } catch (err) {
 *   throw new ImageError(
 *     'Falha no redimensionamento',
 *     err as Error
 *   );
 * }
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
