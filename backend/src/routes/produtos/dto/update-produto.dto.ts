import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator'

class UpdateAlternativaDto {
  @IsNumber()
  @IsOptional()
  id: number
  @IsString()
  nome: string
  @IsString()
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
  descricao: string
  @IsDefined()
  alternativas: UpdateAlternativaDto[]
}
export class UpdateProdutoDto {
  @IsNumber()
  @IsOptional()
  id: number
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
  variacoes: UpdateVariacaoDto[]
}
