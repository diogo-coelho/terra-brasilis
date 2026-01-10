/**
 * Classe responsável por formatar a data atual em uma string legível
 * 
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-10
 * 
 * A classe FormattedDate pega o valor corrente da classe Date do JavaScript
 * e a transforma em uma string formatada no padrão dd/mm/YYYY - hh:mm:ss
 * 
 * @example new FormattedDate().formatted
 * 
 * @returns {string} Data formatada no padrão dd/mm/YYYY - hh:mm:ss *
 */
export default class FormattedDate {
  private _date: Date
  private _formatted: string

  constructor() {
    this._date = new Date()
    this._formatted = this.setFormattedDate()
  }

  private setFormattedDate(): string {
    const day = ('0' + this._date.getDate()).slice(-2)
    const month = ('0' + (this._date.getMonth() + 1)).slice(-2)
    const year = this._date.getFullYear()

    const hours = ('0' + this._date.getHours()).slice(-2)
    const minutes = ('0' + this._date.getMinutes()).slice(-2)
    const seconds = ('0' + this._date.getSeconds()).slice(-2)

    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`
  }

  /**
   * 
   * @returns {string} Retorna a data formatada no padrão dd/mm/YYY - hh:mm:ss
   */
  public get formatted(): string {
    return this._formatted
  }
}