import { Scene } from '@/arcade/interfaces'
import { SceneManagerError } from '@/arcade/errors'
import { ErrorState } from '@/arcade/enums'
import { NamedScene } from '@/arcade/types'

/**
 * Classe singleton responsável pelo gerenciamento centralizado de cenas do jogo.
 *
 * @class SceneManager
 * @author Diogo Coelho
 * @version 1.1.0
 * @since 2026-01-29
 *
 * @description
 * O SceneManager implementa o padrão Scene Management, sendo o núcleo do fluxo de navegação do jogo.
 * Suas principais responsabilidades são:
 * - Registrar e mapear todas as cenas do jogo em um Map indexado por nome
 * - Controlar e expor a cena ativa atual
 * - Gerenciar transições seguras entre cenas, invocando os métodos onExit/onEnter
 * - Manter o estado global da cena ativa (gameSceneState)
 * - Garantir integridade e consistência do fluxo, lançando erros apropriados
 *
 * O SceneManager é utilizado por todo o ciclo de vida do jogo, garantindo que sempre exista uma cena ativa
 * e que as transições sejam ordenadas e seguras.
 *
 * @throws {SceneManagerError} Se tentar acessar ou transitar para uma cena não registrada
 *
 * @example
 * // Instanciação e uso típico:
 * const sceneManager = SceneManager.getInstance();
 * sceneManager.setScenesMap([
 *   { name: 'boot', scene: new BootScene() },
 *   { name: 'menu', scene: new MenuScene() }
 * ]);
 * sceneManager.setCurrentScene('boot');
 */
export default class SceneManager {
  private static _currentScene: Scene | undefined
  private static _gameSceneState: string | undefined
  private static _scenesMap: Map<string, Scene> = new Map()
  private static _instance: SceneManager

  private constructor() {
    }

  public static getInstance(): SceneManager {
    if (!this._instance) {
      this._instance = new SceneManager()
    }
    return this._instance
  }

  public get scenesMap(): Map<string, Scene> {
    return SceneManager._scenesMap
  }

  public get gameSceneState(): string | undefined {
    if (!SceneManager._gameSceneState)
      throw new SceneManagerError(ErrorState.NO_GAME_SCENE_STATE)
    return SceneManager._gameSceneState
  }

  public get currentScene(): Scene {
    if (!SceneManager._currentScene)
      throw new SceneManagerError(ErrorState.NO_CURRENT_SCENE)
    return SceneManager._currentScene
  }

  /**
   * Registra todas as cenas disponíveis no jogo criando um mapeamento nome-cena.
   *
   * @param {NamedScene[]} scenes - Array de objetos contendo o nome e a instância da cena
   *
   * @returns {void}
   *
   * @remarks
   * Este método deve ser chamado durante a inicialização do jogo para registrar todas
   * as cenas que serão utilizadas. Utiliza o método reduce para popular o Map interno,
   * permitindo acesso rápido às cenas pelo nome (O(1) complexity).
   *
   * @example
   * ```typescript
   * sceneManager.setScenesMap([
   *   { name: 'boot', scene: new BootScene() },
   *   { name: 'intro', scene: new IntroScene() },
   *   { name: 'mainMenu', scene: new MainMenuScene() },
   *   { name: 'game', scene: new GameScene() }
   * ]);
   * ```
   */
  public setScenesMap(scenes: NamedScene[]): void {
    scenes.reduce(
      (map, scene) => map.set(scene.name, scene.scene),
      SceneManager._scenesMap
    )
  }

  /**
   * Realiza a transição para uma nova cena ativa.
   *
   * @param {string} name - Nome identificador da cena destino (deve estar registrada no scenesMap)
   *
   * @returns {void}
   *
   * @throws {SceneManagerError} Lança erro se a cena não estiver mapeada no scenesMap
   *
   * @remarks
   * O processo de transição segue esta sequência:
   * 1. Busca a cena pelo nome no Map de cenas
   * 2. Valida se a cena existe, lançando erro caso contrário
   * 3. Atualiza o estado da cena do jogo (gameSceneState)
   * 4. Invoca o callback onExit da cena anterior (se existir e se implementado)
   * 5. Atualiza a referência da cena atual
   * 6. Invoca o callback onEnter da nova cena (se implementado)
   *
   * Este método garante que os recursos sejam limpos adequadamente e que a nova
   * cena seja inicializada corretamente.
   *
   * @example
   * ```typescript
   * // Transição do boot para a intro
   * sceneManager.setCurrentScene('intro');
   * ```
   */
  public setCurrentScene(name: string): void {
    const scene = SceneManager._scenesMap.get(name)
    if (!scene) throw new SceneManagerError(ErrorState.NO_MAPPED_SCENES)

    SceneManager._gameSceneState = name as string
    SceneManager._currentScene?.onExit?.()
    SceneManager._currentScene = scene
    SceneManager._currentScene.onEnter?.()
  }
}
