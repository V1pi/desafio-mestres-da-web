import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator'

class CreateAlternativaDto {
  @IsString()
  @Length(1)
  nome: string
  @IsString()
  @Length(1)
  codigo: string
  @IsNumber()
  quantidade: number
  @IsNumber()
  valor: number
}
class CreateVariacaoDto {
  @IsString()
  @Length(1)
  descricao: string
  @IsDefined()
  alternativas: CreateAlternativaDto[]
}
export class CreateProdutoDto {
  @IsString()
  @Length(1)
  nome: string
  @IsString()
  @IsOptional()
  descricao: string
  @IsNumber()
  valorBase: number
  @IsString()
  @Length(1)
  codigo: string
  @IsOptional()
  variacoes: CreateVariacaoDto[]
}
