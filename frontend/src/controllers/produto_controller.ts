import { ApiHelper } from '../helpers/api.helper'
import { FirebaseHelper } from '../helpers/firebase.helper'
import { Produto } from '../models/produto.entity'

export class ProdutoController {
  public async getAllProdutos(): Promise<Produto[]> {
    const produtos: Produto[] = []
    const user = FirebaseHelper.Instance.auth.currentUser
    if (user) {
      const token = await user.getIdToken()
      const response = await ApiHelper.Instance.Request(
        token,
        'produtos',
        'GET',
      )
      for (const produto of response.data.produtos) {
        const newProduto = Produto.fromJson(produto)
        produtos.push(newProduto)
      }
    }
    return produtos
  }

  public async addNewProduto(produto: Produto): Promise<Produto | undefined> {
    const user = FirebaseHelper.Instance.auth.currentUser
    if (user) {
      const token = await user.getIdToken()
      const response = await ApiHelper.Instance.Request(
        token,
        'produtos/novo',
        'POST',
        produto,
      )
      if (response.data.produto) {
        const newProduto = Produto.fromJson(response.data.produto)
        return newProduto
      }
    }
  }

  public async updateProduto(produto: Produto): Promise<Produto | undefined> {
    const user = FirebaseHelper.Instance.auth.currentUser
    if (user) {
      const token = await user.getIdToken()
      const response = await ApiHelper.Instance.Request(
        token,
        `produtos/${produto.id}/alterar`,
        'PUT',
        produto,
      )
      if (response.data.produto) {
        const newProduto = Produto.fromJson(response.data.produto)
        return newProduto
      }
    }
  }

  public async getProdutoById(id: number): Promise<Produto | undefined> {
    const user = FirebaseHelper.Instance.auth.currentUser
    if (user) {
      const token = await user.getIdToken()
      const response = await ApiHelper.Instance.Request(
        token,
        `produtos/${id}/info`,
        'GET',
      )
      if (response.data.produto) {
        const newProduto = Produto.fromJson(response.data.produto)
        return newProduto
      }
    }
  }

  public async deleteProdutoById(id: number): Promise<void> {
    const user = FirebaseHelper.Instance.auth.currentUser
    if (user) {
      const token = await user.getIdToken()
      await ApiHelper.Instance.Request(token, `produtos/${id}`, 'DELETE')
    }
  }
}
