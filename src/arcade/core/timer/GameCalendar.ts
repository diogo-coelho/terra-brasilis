export default class GameCalendar {
  private msPerYear = 3600 * 1000 // 1 hora em ms
  private monthsPerYear = 12
  private msPerMonth = this.msPerYear / this.monthsPerYear

  // Recebe o tempo total do Timer em ms
  public getDate(timerMs: number): { year: number; month: number } {
    const year = Math.floor(timerMs / this.msPerYear) + 1
    const month = Math.floor((timerMs % this.msPerYear) / this.msPerMonth) + 1
    return { year, month }
  }

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
