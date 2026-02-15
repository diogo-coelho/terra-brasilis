/**
 * Sistema de calendário do jogo.
 *
 * @class GameCalendar
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Converte tempo real em tempo de jogo usando um calendário acelerado.
 * Um ano no jogo equivale a 1 hora real (3600 segundos), dividido em 12 meses.
 *
 * @remarks
 * Utilizado para criar progressão temporal no jogo, permitindo que eventos
 * e recursos sejam baseados em anos e meses do jogo.
 *
 * @example
 * ```typescript
 * const calendar = new GameCalendar();
 * const date = calendar.getDate(timerMs);
 * console.log(calendar.toString(date)); // "Janeiro, Ano 1"
 * ```
 */
export default class GameCalendar {
  private msPerYear = 3600 * 1000 // 1 hora em ms
  private monthsPerYear = 12
  private msPerMonth = this.msPerYear / this.monthsPerYear

  /**
   * Converte tempo de timer em data do jogo.
   *
   * @param {number} timerMs - Tempo decorrido em milissegundos
   *
   * @returns {{ year: number; month: number }} Objeto contendo ano e mês do jogo
   *
   * @example
   * ```typescript
   * const date = calendar.getDate(7200000); // 2 horas
   * // Retorna { year: 3, month: 1 }
   * ```
   */
  public getDate(timerMs: number): { year: number; month: number } {
    const year = Math.floor(timerMs / this.msPerYear) + 1
    const month = Math.floor((timerMs % this.msPerYear) / this.msPerMonth) + 1
    return { year, month }
  }

  /**
   * Converte uma data do jogo em string formatada.
   *
   * @param {{ year: number; month: number }} date - Data do jogo
   *
   * @returns {string} Data formatada como "Mês, Ano X"
   *
   * @example
   * ```typescript
   * calendar.toString({ year: 2, month: 3 }); // "Março, Ano 2"
   * ```
   */
  public toString(date: { year: number; month: number }): string {
    switch (date.month) {
      case 1:
        return `Janeiro, Ano ${date.year}`
      case 2:
        return `Fevereiro, Ano ${date.year}`
      case 3:
        return `Março, Ano ${date.year}`
      case 4:
        return `Abril, Ano ${date.year}`
      case 5:
        return `Maio, Ano ${date.year}`
      case 6:
        return `Junho, Ano ${date.year}`
      case 7:
        return `Julho, Ano ${date.year}`
      case 8:
        return `Agosto, Ano ${date.year}`
      case 9:
        return `Setembro, Ano ${date.year}`
      case 10:
        return `Outubro, Ano ${date.year}`
      case 11:
        return `Novembro, Ano ${date.year}`
      case 12:
        return `Dezembro, Ano ${date.year}`
      default:
        return `Mês inválido, Ano ${date.year}`
    }
  }
}
