import { Alternativa } from './alternativa.entity'

describe('Alternativa', () => {
  it('test json alternativa', () => {
    const mockUsuario = new Alternativa()
    mockUsuario.id = 1
    mockUsuario.quantidade = 1
    mockUsuario.nome = 'M'
    mockUsuario.valor = 100
    mockUsuario.codigo = 'M'
    expect(JSON.parse(JSON.stringify(mockUsuario))).toStrictEqual(
      JSON.parse(JSON.stringify(expectedJSON())),
    )
    expect(mockUsuario).toStrictEqual(Alternativa.fromJson(expectedJSON()))
  })
})

function expectedJSON() {
  return {
    nome: 'M',
    codigo: 'M',
    quantidade: 1,
    valor: 100,
    id: 1,
  }
}
