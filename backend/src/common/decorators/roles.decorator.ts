import { Request, Response } from 'express'
import * as admin from 'firebase-admin'
import { TipoErro } from '../enums/tipo-erro.enum'
import { HttpException } from '../exceptions/http.exception'
/** Função que verifica se foi recebido o cabeçalho authorization, verificando se é um token válido e se
 *  está na whitelist de determinada requisição
 * 0-99: papéis de administradores
 * 100-199: papéis de prestadores
 * 200-infinity: papéis de clientes
 */
async function acceptedRoles(
  req: Request,
  res: Response,
  next: (
    req: Request,
    res: Response,
    auth: admin.auth.UserRecord,
  ) => Promise<Response>,
  whiteList: number[],
): Promise<Response> {
  if (req.headers.authorization) {
    const authToken = req.headers.authorization.substring(7)
    try {
      const decodeId = await admin.auth().verifyIdToken(authToken)

      const auth = await admin.auth().getUser(decodeId.uid)
      if (
        auth.customClaims !== undefined &&
        (whiteList.includes(-1) || whiteList.includes(auth.customClaims.role))
      ) {
        return next(req, res, auth)
      }
    } catch (error) {
      throw new HttpException(TipoErro.SEM_AUTENTICACAO)
    }
  }
  throw new HttpException(TipoErro.USUARIO_SEM_PERMISSAO)
}
/** Decorator que verifica se o usuário está na whitelist para fazer determinada requisição */
export function Role(
  whiteList: number[],
): (
  target: any,
  key: string,
  descriptor: PropertyDescriptor,
) => PropertyDescriptor {
  return function (
    target: any,
    key: string,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const originalMethod = descriptor.value

    descriptor.value = function (
      req: Request,
      res: Response,
    ): Promise<Response> {
      return acceptedRoles(req, res, originalMethod, whiteList)
    }

    return descriptor
  }
}
