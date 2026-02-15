/**
 * Classe para formatação de datas.
 *
 * @class FormattedDate
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Formata a data e hora atuais no padrão brasileiro (DD/MM/AAAA - HH:MM:SS).
 * Utilizada principalmente para logs do servidor.
 *
 * @remarks
 * A data é formatada no momento da criação da instância.
 *
 * @example
 * ```typescript
 * const formattedDate = new FormattedDate();
 * console.log(formattedDate.formatted); // "14/02/2026 - 15:30:45"
 * ```
 */
export default class FormattedDate {
  private _date: Date
  private _formatted: string

  constructor() {
    this._date = new Date()
    this._formatted = this.setFormattedDate()
  }

  /**
   * Formata a data no padrão DD/MM/AAAA - HH:MM:SS.
   *
   * @returns {string} Data formatada
   *
   * @remarks
   * Adiciona zeros à esquerda quando necessário para manter dois dígitos.
   */
  private setFormattedDate(): string {
    const day = ('0' + this._date.getDate()).slice(-2)
    const month = ('0' + (this._date.getMonth() + 1)).slice(-2)
    const year = this._date.getFullYear()

    const hours = ('0' + this._date.getHours()).slice(-2)
    const minutes = ('0' + this._date.getMinutes()).slice(-2)
    const seconds = ('0' + this._date.getSeconds()).slice(-2)

    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`
  }

  public get formatted(): string {
    return this._formatted
  }
}
