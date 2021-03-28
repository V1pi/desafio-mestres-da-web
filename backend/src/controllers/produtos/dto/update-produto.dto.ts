import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator'

class UpdateAlternativaDto {
  @IsNumber()
  @IsOptional()
  id: number
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
class UpdateVariacaoDto {
  @IsNumber()
  @IsOptional()
  id: number
  @IsString()
  @Length(1)
  descricao: string
  @IsDefined()
  alternativas: UpdateAlternativaDto[]
}
export class UpdateProdutoDto {
  @IsNumber()
  @IsOptional()
  id: number
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
  variacoes: UpdateVariacaoDto[]
}
