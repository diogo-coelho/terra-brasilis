import SoundError from '@/arcade/errors/SoundError'
import { ErrorState } from '../enums'

/**
 * Gerenciador de áudio com suporte a reprodução, controle de volume e efeitos de fade.
 *
 * @class Sound
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe Sound encapsula toda a funcionalidade de áudio do jogo, oferecendo:
 * - Carregamento e pré-carregamento de arquivos de áudio
 * - Controle de reprodução (play, pause, stop)
 * - Gerenciamento de volume com clamping automático (0-1)
 * - Efeitos de fade in/out com duração configurvel
 * - Sistema de loop
 * - Listeners de eventos personalizados
 * - Limpeza adequada de recursos (destroy)
 *
 * A classe utiliza HTMLAudioElement internamente e fornece uma API
 * mais amigável e robusta com tratamento de erros.
 *
 * Os efeitos de fade são implementados com animações suaves em 50 passos,
 * garantindo transições naturais de volume.
 *
 * @remarks
 * Use preload() para carregar áudios críticos antes de iniciar o jogo,
 * evitando delays durante a gameplay.
 *
 * @example
 * ```typescript
 * const bgMusic = new Sound('assets/music/theme.mp3');
 *
 * // Pré-carregar e configurar
 * await bgMusic.preload();
 * bgMusic.loop(true);
 * bgMusic.setVolume(0.5);
 *
 * // Iniciar com fade in
 * await bgMusic.play();
 * bgMusic.fadeIn(2000, 0.7);
 *
 * // Parar com fade out
 * bgMusic.fadeOut(1500, true);
 * ```
 *
 * @see HTMLAudioElement
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
   * Inicia a reprodução do áudio.
   *
   * @returns {Promise<void>} Promise que resolve quando a reprodução inicia com sucesso
   *
   * @remarks
   * Este método é assíncrono devido às políticas de autoplay do navegador.
   * Erros são capturados e logados, mas não lançam exceções para evitar
   * quebra da aplicação em casos onde o navegador bloqueia o autoplay.
   *
   * Em ambientes modernos, a reprodução automática pode requerer interação
   * prévia do usuário.
   *
   * @example
   * ```typescript
   * // Com await
   * await sound.play();
   *
   * // Com then/catch
   * sound.play()
   *   .then(() => console.log('Tocando'))
   *   .catch(err => console.error('Erro ao tocar:', err));
   * ```
   */
  public async play(): Promise<void> {
    try {
      await this._audio.play()
    } catch (error: unknown | Error) {
      console.log('Erro ao reproduzir áudio:', error)
      //throw new SoundError(ErrorState.AUDIO_FAILED_TO_LOAD, error instanceof Error ? error : undefined);
    }
  }

  public pause(): void {
    this._audio.pause()
  }

  public stop(): void {
    this._audio.pause()
    this._audio.currentTime = 0
  }

  /**
   * Define o volume do áudio com clamping automático.
   *
   * @param {number} volume - Valor do volume entre 0 (mudo) e 1 (máximo)
   *
   * @returns {void}
   *
   * @remarks
   * Valores fora do intervalo 0-1 são automaticamente ajustados:
   * - Valores < 0 são definidos como 0
   * - Valores > 1 são definidos como 1
   *
   * Isso previne erros e garante comportamento consistente.
   *
   * @example
   * ```typescript
   * sound.setVolume(0.5);  // 50% do volume
   * sound.setVolume(0);    // Mudo
   * sound.setVolume(1);    // Volume máximo
   * sound.setVolume(1.5);  // Automaticamente ajustado para 1
   * ```
   */
  public setVolume(volume: number): void {
    const clampedVolume = Math.max(0, Math.min(1, volume))
    this._audio.volume = clampedVolume
  }

  public isPlaying(): boolean {
    return !this._audio.paused
  }

  public loop(enable: boolean): void {
    this._audio.loop = enable
  }

  /**
   * Pré-carrega o áudio na memória antes da reprodução.
   *
   * @returns {Promise<void>} Promise que resolve quando o áudio está pronto
   *
   * @remarks
   * Este método garante que o arquivo de áudio esteja completamente carregado
   * antes de tentar reproduzi-lo, evitando delays durante a gameplay.
   *
   * Aguarda o evento 'canplaythrough' que indica que o áudio pode ser
   * reproduzido sem interrupções para buffering.
   *
   * Rejeita a Promise se houver erro no carregamento.
   *
   * @example
   * ```typescript
   * const criticalSounds = [
   *   new Sound('click.wav'),
   *   new Sound('explosion.wav')
   * ];
   *
   * // Pré-carregar todos
   * await Promise.all(
   *   criticalSounds.map(sound => sound.preload())
   * );
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
   * Aumenta gradualmente o volume do áudio criando efeito de fade in.
   *
   * @param {number} duration - Duração do fade em milissegundos
   * @param {number} [targetVolume=1] - Volume final ao término do fade (0-1)
   *
   * @returns {void}
   *
   * @remarks
   * O fade é implementado em 50 passos para suavidade:
   * - Cada passo dura duration/50 milissegundos
   * - O volume aumenta linearmente de 0 até targetVolume
   * - Cancela qualquer fade anterior em andamento
   *
   * Útil para introduções suaves de música de fundo.
   *
   * @example
   * ```typescript
   * await backgroundMusic.play();
   * // Fade in por 3 segundos até 70% do volume
   * backgroundMusic.fadeIn(3000, 0.7);
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
   * Diminui gradualmente o volume do áudio criando efeito de fade out.
   *
   * @param {number} duration - Duração do fade em milissegundos
   * @param {boolean} [stopAfterFade=false] - Se `true`, pausa o áudio ao final do fade
   *
   * @returns {void}
   *
   * @remarks
   * O fade é implementado em 50 passos para suavidade:
   * - Cada passo dura duration/50 milissegundos
   * - O volume diminui linearmente do valor atual até 0
   * - Cancela qualquer fade anterior em andamento
   * - Opcionalmente para a reprodução ao final
   *
   * Útil para términos suaves de música ou efeitos sonoros.
   *
   * @example
   * ```typescript
   * // Fade out por 2 segundos e parar
   * backgroundMusic.fadeOut(2000, true);
   *
   * // Fade out sem parar (volume vai para 0 mas continua tocando)
   * sound.fadeOut(1000, false);
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
   * Adiciona um listener de evento ao elemento de áudio.
   * @param event - Nome do evento (ex: 'ended', 'error', 'canplay')
   * @param callback - Função a ser chamada quando o evento ocorrer
   */
  public on(event: string, callback: EventListener): void {
    this._audio.addEventListener(event, callback)
  }

  /**
   * Remove um listener de evento do elemento de áudio.
   * @param event - Nome do evento
   * @param callback - Função a ser removida
   */
  public off(event: string, callback: EventListener): void {
    this._audio.removeEventListener(event, callback)
  }

  /**
   * Limpa qualquer fade em andamento.
   */
  private clearFade(): void {
    if (this._fadeInterval !== undefined) {
      clearInterval(this._fadeInterval)
      this._fadeInterval = undefined
    }
  }

  /**
   * Libera recursos e limpa a instância do som.
   *
   * @returns {void}
   *
   * @remarks
   * Processo de destruição:
   * 1. Limpa qualquer fade em andamento
   * 2. Para a reprodução
   * 3. Remove a fonte do áudio
   * 4. Força recarregamento (libera memória)
   *
   * Chame este método quando o som não for mais necessário para
   * evitar vazamento de memória, especialmente em jogos com muitos
   * efeitos sonoros dinâmicos.
   *
   * @example
   * ```typescript
   * // Ao trocar de cena
   * onExit() {
   *   this.backgroundMusic.destroy();
   * }
   * ```
   */
  public destroy(): void {
    this.clearFade()
    this.stop()
    this._audio.src = ''
    this._audio.load()
  }
}
