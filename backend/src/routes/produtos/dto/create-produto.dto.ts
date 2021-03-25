import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator'

class CreateAlternativaDto {
  @IsString()
  nome: string
  @IsString()
  codigo: string
  @IsNumber()
  quantidade: number
  @IsNumber()
  valor: number
}
class CreateVariacaoDto {
  @IsString()
  descricao: string
  @IsDefined()
  alternativas: CreateAlternativaDto[]
}
export class CreateProdutoDto {
  @IsString()
  nome: string
  @IsString()
  @IsOptional()
  descricao: string
  @IsNumber()
  valorBase: number
  @IsString()
  codigo: string
  @IsOptional()
  variacoes: CreateVariacaoDto[]
}
