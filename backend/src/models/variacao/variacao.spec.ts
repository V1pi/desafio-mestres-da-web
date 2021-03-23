import { Variacao } from './variacao.entity'
describe('Variacao', () => {
  it('test json variacao', () => {
    const mockVariacao = new Variacao()
    mockVariacao.id = 1
    mockVariacao.descricao = 'Modelo'
    mockVariacao.alternativas = []
    expect(JSON.parse(JSON.stringify(mockVariacao))).toStrictEqual(
      JSON.parse(JSON.stringify(expectedJSON())),
    )
    expect(mockVariacao).toStrictEqual(Variacao.fromJson(expectedJSON()))
  })
})

function expectedJSON() {
  return {
    descricao: 'Modelo',
    id: 1,
    alternativas: [],
  }
}
