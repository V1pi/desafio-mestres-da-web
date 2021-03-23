import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin'
import { Controller } from '@nestjs/common'
import { RegistrarService } from './registrar.service'

@Controller('registrar')
export class RegistrarController {
  constructor(
    private serv: RegistrarService,
    private auth: FirebaseAuthenticationService,
  ) {}
}
