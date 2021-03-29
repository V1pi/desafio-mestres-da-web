import { HttpException } from './http.exception'
import { TipoErro } from '../enums/tipo-erro.enum'
import { NextFunction, Request, ErrorRequestHandler, Response } from 'express'
import { HttpStatus } from '../enums/http-status.enum'
export function allExceptionsFilter(): ErrorRequestHandler {
  return async (err: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next()
    }
    const status =
      err instanceof HttpException
        ? err.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR
    if (err instanceof HttpException) {
      return res.status(status).json({
        error: true,
        error_id: err.tipoErroDado.errorId,
        data: [],
        message: err.tipoErroDado.message,
      })
    } else {
      return res.status(status).json({
        error: true,
        error_id: TipoErro.ERROR_DESCONHECIDO,
        data: [],
        message: err.message,
      })
    }
  }
}
