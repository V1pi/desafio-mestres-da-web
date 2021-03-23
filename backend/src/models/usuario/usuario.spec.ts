import { Usuario } from './usuario.entity'
describe('Usuario', () => {
  it('test json usuario', () => {
    const mockUsuario = new Usuario()
    mockUsuario.id = 1
    mockUsuario.uid = 'SERTVHijmouHINURVta'
    mockUsuario.nome = 'Joao Oliveira'
    mockUsuario.papel = 100
    expect(JSON.parse(JSON.stringify(mockUsuario))).toStrictEqual(
      JSON.parse(JSON.stringify(expectedJSON())),
    )
    expect(mockUsuario).toStrictEqual(Usuario.fromJson(expectedJSON()))
  })
})

function expectedJSON() {
  return {
    nome: 'Joao Oliveira',
    uid: 'SERTVHijmouHINURVta',
    papel: 100,
    id: 1,
  }
}
