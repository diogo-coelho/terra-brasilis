import { Scene } from '@/arcade/interfaces'
import { SceneManagerError } from '@/arcade/errors'
import { ErrorState } from '@/arcade/enums'
import { NamedScene } from '@/arcade/types'

/**
 * Gerenciador central responsável pelo controle e transição entre cenas do jogo.
 *
 * @class SceneManager
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe SceneManager implementa o padrão de gerenciamento de cenas (Scene Management),
 * sendo responsável por:
 * - Armazenar e organizar todas as cenas disponíveis em um Map indexado por nome
 * - Controlar qual cena está ativa atualmente
 * - Gerenciar transições entre cenas, invocando callbacks onExit e onEnter
 * - Manter o estado atual da cena ativa (game scene state)
 * - Garantir segurança com validações e lançamento de erros apropriados
 * 
 * O gerenciador garante que sempre exista uma cena ativa e que as transições sejam
 * realizadas de forma ordenada, evitando estados inconsistentes.
 * 
 * @throws {SceneManagerError} Lança erro quando tenta acessar cena não definida
 * 
 * @example
 * ```typescript
 * const sceneManager = new SceneManager();
 * 
 * sceneManager.setScenesMap([
 *   { name: 'boot', scene: new BootScene() },
 *   { name: 'menu', scene: new MenuScene() }
 * ]);
 * 
 * sceneManager.setCurrentScene('boot');
 * ```
 */
export default class SceneManager {
  private _currentScene: Scene | undefined
  private _gameSceneState: string | undefined
  private _scenesMap: Map<string, Scene> = new Map()

  public get scenesMap(): Map<string, Scene> {
    return this._scenesMap
  }

  public get gameSceneState(): string | undefined {
    if (!this._gameSceneState)
      throw new SceneManagerError(ErrorState.NO_GAME_SCENE_STATE)
    return this._gameSceneState
  }

  public get currentScene(): Scene {
    if (!this._currentScene)
      throw new SceneManagerError(ErrorState.NO_CURRENT_SCENE)
    return this._currentScene
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
      this._scenesMap
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
    const scene = this._scenesMap.get(name)
    if (!scene) throw new SceneManagerError(ErrorState.NO_MAPPED_SCENES)

    this._gameSceneState = name as string
    this._currentScene?.onExit?.()
    this._currentScene = scene
    this._currentScene.onEnter?.()
  }
}
