import { TipoErro } from '../enums/tipo-erro.enum'
import { COMMON_ERRORS } from '../constants/exceptions'
import { TipoErroDados } from './interfaces/tipo-erro-dados.interface'
import { HttpStatus } from '../enums/http-status.enum'

export class HttpException extends Error {
  public tipoErroDado: TipoErroDados
  constructor(errorId: TipoErro, message?: string, httpStatus?: HttpStatus) {
    super()
    let newTipoErroDado: TipoErroDados =
      message && httpStatus
        ? { errorId: errorId, message, httpStatus }
        : message
        ? {
            errorId: errorId,
            message,
            httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
          }
        : {
            errorId,
            message: 'Erro desconhecido',
            httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
          }

    for (const error of COMMON_ERRORS) {
      if (errorId == error.errorId) {
        newTipoErroDado = error
      }
    }
    if (message) {
      newTipoErroDado.message = message
    }

    this.tipoErroDado = newTipoErroDado
  }
}
