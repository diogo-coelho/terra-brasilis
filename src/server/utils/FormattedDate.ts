/**
 * Classe responsável por formatar a data informada para
 * o padrão dd/mm/aaaa - hh:mm:ss
 */
class FormattedDate {
  public _date: Date
  public _formattedDate: string

  constructor() {
    this._date = new Date()
    this._formattedDate = this.setFormattedDate()
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

  public get formattedDate(): string {
    return this._formattedDate
  }
}

export default new FormattedDate()
