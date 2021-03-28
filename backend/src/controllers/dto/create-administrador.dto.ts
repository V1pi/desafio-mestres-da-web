import { IsOptional, IsString, Length } from 'class-validator'
export class CreateAdministradorDto {
  @IsString()
  @Length(1)
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
