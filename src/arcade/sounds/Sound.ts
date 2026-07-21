import SoundError from '@/arcade/errors/SoundError'
import { ErrorState } from '../enums'

/**
 * Gerenciador de áudio do jogo.
 *
 * @class Sound
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Classe responsável por carregar, reproduzir e controlar arquivos de áudio.
 * Oferece funcionalidades avançadas como fade in/out, loop, controle de volume
 * e pré-carregamento de áudio.
 *
 * @remarks
 * Encapsula HTMLAudioElement fornecendo uma API mais amigável e funcionalidades
 * adicionais para uso em jogos.
 *
 * @example
 * ```typescript
 * const bgMusic = new Sound('music/background.mp3');
 * await bgMusic.preload();
 * bgMusic.loop(true);
 * bgMusic.fadeIn(2000, 0.5);
 * await bgMusic.play();
 * ```
 */
export default class Sound {
  private _audio: HTMLAudioElement
  private _fadeInterval?: number

  constructor(src: string) {
    this._audio = new Audio(src)
  }

  public get audio(): HTMLAudioElement {
    return this._audio
  }

  public get currentTime(): number {
    return this._audio.currentTime
  }

  public set currentTime(time: number) {
    this._audio.currentTime = time
  }

  public get duration(): number {
    return this._audio.duration
  }

  public get volume(): number {
    return this._audio.volume
  }

  public set volume(value: number) {
    this.setVolume(value)
  }

  /**
   * Reproduz o áudio.
   *
   * @returns {Promise<void>} Promise que resolve quando a reprodução inicia
   *
   * @throws {SoundError} Quando falha ao reproduzir o áudio
   *
   * @example
   * ```typescript
   * await sound.play();
   * ```
   */
  public async play(): Promise<void> {
    try {
      await this._audio.play()
    } catch (error: unknown | Error) {
      throw new SoundError(
        ErrorState.AUDIO_FAILED_TO_LOAD,
        error instanceof Error ? error : undefined
      )
    }
  }

  /**
   * Pausa a reprodução do áudio.
   */
  public pause(): void {
    this._audio.pause()
  }

  /**
   * Para o áudio e reinicia do início.
   *
   * @remarks
   * Pausa a reprodução e reseta currentTime para 0.
   */
  public stop(): void {
    this._audio.pause()
    this._audio.currentTime = 0
  }

  /**
   * Define o volume do áudio.
   *
   * @param {number} volume - Volume entre 0.0 (mudo) e 1.0 (máximo)
   *
   * @remarks
   * O valor é automaticamente limitado entre 0 e 1.
   */
  public setVolume(volume: number): void {
    const clampedVolume = Math.max(0, Math.min(1, volume))
    this._audio.volume = clampedVolume
  }

  /**
   * Verifica se o áudio está sendo reproduzido.
   *
   * @returns {boolean} true se estiver tocando, false caso contrário
   */
  public isPlaying(): boolean {
    return !this._audio.paused
  }

  /**
   * Ativa ou desativa a repetição em loop.
   *
   * @param {boolean} enable - true para ativar loop, false para desativar
   */
  public loop(enable: boolean): void {
    this._audio.loop = enable
  }

  /**
   * Pré-carrega o áudio antes de reproduzir.
   *
   * @returns {Promise<void>} Promise que resolve quando o áudio está pronto
   *
   * @throws {Error} Quando falha ao carregar o arquivo
   *
   * @remarks
   * Recomendado chamar antes de play() para evitar atrasos na reprodução.
   *
   * @example
   * ```typescript
   * await sound.preload();
   * await sound.play();
   * ```
   */
  public preload(): Promise<void> {
    return new Promise((resolve, reject) => {
      const canPlayHandler = () => {
        this._audio.removeEventListener('canplaythrough', canPlayHandler)
        this._audio.removeEventListener('error', errorHandler)
        resolve()
      }

      const errorHandler = (event: Event) => {
        this._audio.removeEventListener('canplaythrough', canPlayHandler)
        this._audio.removeEventListener('error', errorHandler)
        reject(
          new Error(
            `Erro ao carregar áudio: ${this._audio.error?.message || 'Erro desconhecido'}`
          )
        )
      }

      this._audio.addEventListener('canplaythrough', canPlayHandler)
      this._audio.addEventListener('error', errorHandler)
      this._audio.load()
    })
  }

  /**
   * Aumenta gradualmente o volume do áudio (fade in).
   *
   * @param {number} duration - Duração do fade em milissegundos
   * @param {number} targetVolume - Volume final (padrão: 1.0)
   *
   * @remarks
   * Inicia com volume 0 e aumenta gradualmente até o volume alvo.
   *
   * @example
   * ```typescript
   * sound.fadeIn(3000, 0.7); // Fade de 3s até 70% do volume
   * ```
   */
  public fadeIn(duration: number, targetVolume: number = 1): void {
    this.clearFade()
    const startVolume = 0
    this._audio.volume = startVolume
    const steps = 50
    const stepTime = duration / steps
    const volumeIncrement = (targetVolume - startVolume) / steps
    let currentStep = 0

    this._fadeInterval = window.setInterval(() => {
      currentStep++
      const newVolume = startVolume + volumeIncrement * currentStep
      this.setVolume(newVolume)

      if (currentStep >= steps) {
        this.clearFade()
        this.setVolume(targetVolume)
      }
    }, stepTime)
  }

  /**
   * Diminui gradualmente o volume do áudio (fade out).
   *
   * @param {number} duration - Duração do fade em milissegundos
   * @param {boolean} stopAfterFade - Se deve parar o áudio após o fade (padrão: false)
   *
   * @remarks
   * Reduz o volume gradualmente até 0.
   *
   * @example
   * ```typescript
   * sound.fadeOut(2000, true); // Fade de 2s e para o áudio
   * ```
   */
  public fadeOut(duration: number, stopAfterFade: boolean = false): void {
    this.clearFade()
    const startVolume = this._audio.volume
    const steps = 50
    const stepTime = duration / steps
    const volumeDecrement = startVolume / steps
    let currentStep = 0

    this._fadeInterval = window.setInterval(() => {
      currentStep++
      const newVolume = startVolume - volumeDecrement * currentStep
      this.setVolume(newVolume)

      if (currentStep >= steps) {
        this.clearFade()
        this.setVolume(0)
        if (stopAfterFade) {
          this.stop()
        }
      }
    }, stepTime)
  }

  /**
   * Adiciona um ouvinte de evento ao elemento de áudio.
   *
   * @param {string} event - Nome do evento (ex: 'ended', 'timeupdate')
   * @param {EventListener} callback - Função a ser executada no evento
   */
  public on(event: string, callback: EventListener): void {
    this._audio.addEventListener(event, callback)
  }

  /**
   * Remove um ouvinte de evento do elemento de áudio.
   *
   * @param {string} event - Nome do evento
   * @param {EventListener} callback - Função a ser removida
   */
  public off(event: string, callback: EventListener): void {
    this._audio.removeEventListener(event, callback)
  }

  private clearFade(): void {
    if (this._fadeInterval !== undefined) {
      clearInterval(this._fadeInterval)
      this._fadeInterval = undefined
    }
  }

  /**
   * Destrói a instância do som e libera recursos.
   *
   * @remarks
   * Limpa fades ativos, para o áudio e descarrega o arquivo.
   */
  public destroy(): void {
    this.clearFade()
    this.stop()
    this._audio.src = ''
    this._audio.load()
  }
}
