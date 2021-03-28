import { HttpException } from './http.exception'
import { TipoErro } from '../enums/tipo-erro.enum'
import { Request, Response } from 'express'
import { HttpStatus } from '../enums/http-status.enum'
export async function allExceptionsFilter(
  err,
  req: Request,
  res: Response,
  next,
) {
  if (err instanceof Promise) {
    try {
      err = await err
    } catch (error) {
      err = error
    }
  }
  if (res.headersSent) {
    return next(err, req, res)
  }
  const status =
    err instanceof HttpException
      ? err.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR
  if (err instanceof HttpException) {
    res.status(status).json({
      error: true,
      error_id: err.tipoErroDado.errorId,
      data: [],
      message: err.tipoErroDado.message,
    })
  } else {
    res.status(status).json({
      error: true,
      error_id: TipoErro.ERROR_DESCONHECIDO,
      data: [],
      message: err.message,
    })
  }
}
