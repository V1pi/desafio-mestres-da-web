import { RequestHandler } from 'express'
import { plainToClass } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { sanitize } from 'class-sanitizer'
import { HttpException } from '../exceptions/http.exception'
import { TipoErro } from '../enums/tipo-erro.enum'

function dtoValidationMiddleware(
  type: any,
  skipMissingProperties = false,
): RequestHandler {
  return async (req, res, next) => {
    const dtoObj = plainToClass(type, req.body)
    try {
      const errors: ValidationError[] = await validate(dtoObj, {
        skipMissingProperties,
      })
      if (errors.length > 0) {
        const dtoErrors = errors
          .map((error: ValidationError) => Object.values(error.constraints))
          .join(', ')
        next(new HttpException(TipoErro.DADOS_INVALIDOS, dtoErrors))
      } else {
        sanitize(dtoObj)
        req.body = dtoObj
        next()
      }
    } catch (error) {
      next(new HttpException(TipoErro.DADOS_INVALIDOS))
    }
  }
}

export default dtoValidationMiddleware
