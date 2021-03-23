import { Variacao } from '../variacao/variacao.entity'
import { Produto } from './produto.entity'

describe('Produto', () => {
  it('test json produto', () => {
    const mockUsuario = new Produto()
    const mockVariacao = new Variacao()
    mockVariacao.descricao = 'Modelo'
    mockVariacao.alternativas = []
    mockVariacao.id = 1
    mockUsuario.id = 1
    mockUsuario.descricao = 'Produto bom'
    mockUsuario.nome = 'Camisa T-Shirt'
    mockUsuario.valorBase = 100
    mockUsuario.variacoes = [mockVariacao]
    mockUsuario.codigo = 'CAS-'
    expect(JSON.parse(JSON.stringify(mockUsuario))).toStrictEqual(
      JSON.parse(JSON.stringify(expectedJSON())),
    )
    expect(mockUsuario).toStrictEqual(Produto.fromJson(expectedJSON()))
  })
})

function expectedJSON() {
  return {
    nome: 'Camisa T-Shirt',
    codigo: 'CAS-',
    descricao: 'Produto bom',
    valorBase: 100,
    id: 1,
    variacoes: [
      {
        descricao: 'Modelo',
        id: 1,
        alternativas: [],
      },
    ],
  }
}
