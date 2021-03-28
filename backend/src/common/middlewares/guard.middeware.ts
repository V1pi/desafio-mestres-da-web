import { Request, RequestHandler, Response } from 'express'
import * as admin from 'firebase-admin'
import { TipoErro } from '../enums/tipo-erro.enum'
import { HttpException } from '../exceptions/http.exception'
/** Função que verifica se foi recebido o cabeçalho authorization, verificando se é um token válido e se
 *  está na whitelist de determinada requisição
 * 0: papéis de administradores
 */
export function GuardMiddleware(whiteList: number[]): RequestHandler {
  return async (req: Request, res: Response, next: any) => {
    if (req.headers.authorization) {
      const authToken = req.headers.authorization.substring(7)
      try {
        const decodeId = await admin.auth().verifyIdToken(authToken)

        const auth = await admin.auth().getUser(decodeId.uid)
        if (
          auth.customClaims !== undefined &&
          (whiteList.includes(-1) || whiteList.includes(auth.customClaims.role))
        ) {
          return next()
        }
      } catch (error) {
        return next(new HttpException(TipoErro.SEM_AUTENTICACAO))
      }
    }
    return next(new HttpException(TipoErro.USUARIO_SEM_PERMISSAO))
  }
}
