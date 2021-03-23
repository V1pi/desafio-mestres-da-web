import { IsOptional, IsString } from 'class-validator'
export class CreateAdministradorDto {
  @IsString()
  nome: string
  @IsOptional()
  papel: number
  @IsOptional()
  uid: string
  @IsString()
  email: string
  @IsString()
  senha: string
}
