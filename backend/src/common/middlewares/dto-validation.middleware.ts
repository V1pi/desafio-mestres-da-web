import { RequestHandler } from 'express'
import { plainToClass } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { sanitize } from 'class-sanitizer'
import { NextFunction, Request, Response } from 'express'
import { HttpException } from '../exceptions/http.exception'
import { TipoErro } from '../enums/tipo-erro.enum'

function dtoValidationMiddleware(type: any): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = plainToClass(type, req.body)

      const errors: ValidationError[] = await validate(dto)
      if (errors.length > 0) {
        const dtoErrors = errors
          .map((error: ValidationError) => Object.values(error.constraints))
          .join(', ')
        next(new HttpException(TipoErro.DADOS_INVALIDOS, dtoErrors))
      } else {
        sanitize(dto)
        req.body = dto
        next()
      }
    } catch (error) {
      next(new HttpException(TipoErro.DADOS_INVALIDOS))
    }
  }
}

export default dtoValidationMiddleware
