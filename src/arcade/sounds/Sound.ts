import SoundError from "@/arcade/errors/SoundError";
import { ErrorState } from "../enums";

/**
 * Classe que representa um som no jogo.
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 * 
 * @description
 * A classe Sound encapsula a funcionalidade de reprodução de áudio,
 * permitindo carregar, reproduzir, pausar e controlar o volume de sons no jogo.
 * 
 * @example
 * ```typescript
 * const sound = new Sound('path/to/sound.mp3');
 * await sound.preload();
 * sound.play();
 * sound.fadeOut(1000);
 * ```
 * 
 */
export default class Sound {

  private _audio: HTMLAudioElement;
  private _fadeInterval?: number;

  constructor(src: string) {
    this._audio = new Audio(src);
  }

  public get audio(): HTMLAudioElement {
    return this._audio;
  }

  public get currentTime(): number {
    return this._audio.currentTime;
  }

  public set currentTime(time: number) {
    this._audio.currentTime = time;
  }

  public get duration(): number {
    return this._audio.duration;
  }

  public get volume(): number {
    return this._audio.volume;
  }

  public set volume(value: number) {
    this.setVolume(value);
  }

  /**
   * Reproduz o áudio.
   * @returns Promise que resolve quando a reprodução inicia com sucesso
   * @throws SoundError se a reprodução falhar
   */
  public async play(): Promise<void> {
    try {
      await this._audio.play();
    } catch (error: unknown | Error) {
      console.log('Erro ao reproduzir áudio:', error);
      //throw new SoundError(ErrorState.AUDIO_FAILED_TO_LOAD, error instanceof Error ? error : undefined);
    }
  }

  public pause(): void {
    this._audio.pause();
  }

  public stop(): void {
    this._audio.pause();
    this._audio.currentTime = 0;
  }

  /**
   * Define o volume do áudio.
   * @param volume - Valor entre 0 (mudo) e 1 (volume máximo)
   */
  public setVolume(volume: number): void {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    this._audio.volume = clampedVolume;
  }

  public isPlaying(): boolean {
    return !this._audio.paused;
  }

  public loop(enable: boolean): void {
    this._audio.loop = enable;
  }

  /**
   * Pré-carrega o áudio.
   * @returns Promise que resolve quando o áudio está pronto para reprodução
   */
  public preload(): Promise<void> {
    return new Promise((resolve, reject) => {
      const canPlayHandler = () => {
        this._audio.removeEventListener('canplaythrough', canPlayHandler);
        this._audio.removeEventListener('error', errorHandler);
        resolve();
      };

      const errorHandler = (event: Event) => {
        this._audio.removeEventListener('canplaythrough', canPlayHandler);
        this._audio.removeEventListener('error', errorHandler);
        reject(new Error(`Erro ao carregar áudio: ${this._audio.error?.message || 'Erro desconhecido'}`));
      };

      this._audio.addEventListener('canplaythrough', canPlayHandler);
      this._audio.addEventListener('error', errorHandler);
      this._audio.load();
    });
  }

  /**
   * Aumenta gradualmente o volume do áudio (fade in).
   * @param duration - Duração do fade em milissegundos
   * @param targetVolume - Volume final (padrão: 1)
   */
  public fadeIn(duration: number, targetVolume: number = 1): void {
    this.clearFade();
    const startVolume = 0;
    this._audio.volume = startVolume;
    const steps = 50;
    const stepTime = duration / steps;
    const volumeIncrement = (targetVolume - startVolume) / steps;
    let currentStep = 0;

    this._fadeInterval = window.setInterval(() => {
      currentStep++;
      const newVolume = startVolume + (volumeIncrement * currentStep);
      this.setVolume(newVolume);

      if (currentStep >= steps) {
        this.clearFade();
        this.setVolume(targetVolume);
      }
    }, stepTime);
  }

  /**
   * Diminui gradualmente o volume do áudio (fade out).
   * @param duration - Duração do fade em milissegundos
   * @param stopAfterFade - Se true, pausa o áudio ao final do fade
   */
  public fadeOut(duration: number, stopAfterFade: boolean = false): void {
    this.clearFade();
    const startVolume = this._audio.volume;
    const steps = 50;
    const stepTime = duration / steps;
    const volumeDecrement = startVolume / steps;
    let currentStep = 0;

    this._fadeInterval = window.setInterval(() => {
      currentStep++;
      const newVolume = startVolume - (volumeDecrement * currentStep);
      this.setVolume(newVolume);

      if (currentStep >= steps) {
        this.clearFade();
        this.setVolume(0);
        if (stopAfterFade) {
          this.stop();
        }
      }
    }, stepTime);
  }

  /**
   * Adiciona um listener de evento ao elemento de áudio.
   * @param event - Nome do evento (ex: 'ended', 'error', 'canplay')
   * @param callback - Função a ser chamada quando o evento ocorrer
   */
  public on(event: string, callback: EventListener): void {
    this._audio.addEventListener(event, callback);
  }

  /**
   * Remove um listener de evento do elemento de áudio.
   * @param event - Nome do evento
   * @param callback - Função a ser removida
   */
  public off(event: string, callback: EventListener): void {
    this._audio.removeEventListener(event, callback);
  }

  /**
   * Limpa qualquer fade em andamento.
   */
  private clearFade(): void {
    if (this._fadeInterval !== undefined) {
      clearInterval(this._fadeInterval);
      this._fadeInterval = undefined;
    }
  }

  /**
   * Destrói a instância do som, limpando recursos.
   */
  public destroy(): void {
    this.clearFade();
    this.stop();
    this._audio.src = '';
    this._audio.load();
  }

}