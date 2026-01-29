/**
 * Exceção customizada para erros no gerenciamento de cenas.
 *
 * @class SceneManagerError
 * @extends Error
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe SceneManagerError representa erros específicos que ocorrem durante:
 * - Tentativa de acessar cena atual quando nenhuma está definida
 * - Tentativa de trocar para cena não mapeada
 * - Acesso a gameSceneState quando não inicializado
 * - Problemas na inicialização do SceneManager
 *
 * Estende Error nativo adicionando:
 * - Nome "SceneManagerError" para identificação clara
 * - Encadeamento de stack trace para rastreamento de causa raiz
 * - Mensagens descritivas sobre o estado inválido do gerenciador
 *
 * Estes erros geralmente indicam problemas na inicialização do jogo
 * ou lógica incorreta de navegação entre cenas.
 *
 * @example
 * ```typescript
 * // Erro ao acessar cena não existente
 * const scene = scenesMap.get('invalid');
 * if (!scene) {
 *   throw new SceneManagerError(
 *     ErrorState.NO_MAPPED_SCENES
 *   );
 * }
 *
 * // Erro com contexto adicional
 * if (!currentScene) {
 *   throw new SceneManagerError(
 *     'Nenhuma cena definida como atual'
 *   );
 * }
 * ```
 */
export default class SceneManagerError extends Error {
  private _message: string
  private _stack?: string

  constructor(message: string, originalError?: Error) {
    super(message)
    this._message = message
    this.name = 'SceneManagerError'

    if (originalError?.stack) {
      this._stack += '\nCaused by:\n' + originalError.stack
    }
  }

  public get message(): string {
    return this._message
  }
}
