import React, { Component } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { NavBar } from '../components/NavBar'
import './produtos.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { RouteComponentProps } from 'react-router'
import { Produto } from '../../models/produto.entity'
import { Variacao } from '../../models/variacao.entity'
import { Alternativa } from '../../models/alternativa.entity'
import { FirebaseHelper } from '../../helpers/firebase.helper'
import { ProdutoController } from '../../controllers/produto_controller'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import swal from '@sweetalert/with-react'

interface AlterarProdutoState {
  produto: Produto
  variacoes: Variacao[]
  carregando: boolean
}

type Props = RouteComponentProps<any>
export class Alterar extends Component<Props, AlterarProdutoState> {
  constructor(props: Props) {
    super(props)
    if (!FirebaseHelper.Instance.auth.currentUser) {
      this.props.history.replace('/')
    }
    this.renderVariacao = this.renderVariacao.bind(this)
    this.renderAlternativa = this.renderAlternativa.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.getProdutoById = this.getProdutoById.bind(this)
    this.state = {
      produto: new Produto(),
      variacoes: [],
      carregando: true,
    }
    this.getProdutoById(this.props.match.params.id)
  }

  async getProdutoById(id: number): Promise<void> {
    const produtoController = new ProdutoController()
    const newProduto = await produtoController.getProdutoById(id)
    if (newProduto) {
      this.setState({
        produto: newProduto,
        variacoes: newProduto.variacoes ? newProduto.variacoes : [],
      })
    }
  }

  renderAlternativa(variacao: Variacao): JSX.Element {
    const alternativas = variacao.alternativas
    if (!alternativas) {
      return (
        <Row>
          <Col>Não há alternativas</Col>
        </Row>
      )
    }
    const options: JSX.Element[] = alternativas.map((alternativa, idx) => {
      return (
        <Row className="alternativa" key={idx}>
          <Col className="input-alternativa">
            <Form.Group controlId="formBasicCodigoAlternativa">
              <Form.Control
                type="text"
                placeholder="SKU"
                defaultValue={alternativa.codigo}
                onChange={(value) => {
                  alternativa.codigo = value.target.value
                }}
              />
            </Form.Group>
          </Col>
          <Col className="input-alternativa">
            <Form.Group controlId="formBasicNomeAlternativa">
              <Form.Control
                type="text"
                placeholder="Nome da alternativa"
                defaultValue={alternativa.nome}
                onChange={(value) => {
                  alternativa.nome = value.target.value
                }}
              />
            </Form.Group>
          </Col>
          <Col className="input-alternativa">
            <Form.Group controlId="formBasicQuantidadeAlternativa">
              <Form.Control
                type="text"
                placeholder="Quantidade"
                defaultValue={alternativa.quantidade}
                onChange={(value) => {
                  alternativa.quantidade = Number(value.target.value)
                }}
              />
            </Form.Group>
          </Col>
          <Col className="input-alternativa">
            <Form.Group controlId="formBasicvalorAlternativa">
              <Form.Control
                type="text"
                placeholder="Valor adicional ao base"
                defaultValue={alternativa.valor}
                onChange={(value) => {
                  alternativa.valor = Number(value.target.value)
                }}
              />
            </Form.Group>
          </Col>
          <Col className="alternativa-deletar">
            <Button
              onClick={() => {
                variacao.alternativas = variacao.alternativas.filter(
                  (a) => a !== alternativa,
                )
                this.setState({
                  variacoes: [...this.state.variacoes],
                })
              }}
              className="delete-btn"
            >
              Deletar
            </Button>
          </Col>
        </Row>
      )
    })
    if (options.length === 0) {
      return (
        <Row>
          <Col>Não há alternativas</Col>
        </Row>
      )
    }
    return <div className="container-alternativa">{options}</div>
  }

  renderVariacao(): JSX.Element {
    const options: JSX.Element[] = this.state.variacoes.map((variacao, idx) => {
      return (
        <Col className="variacao" key={idx}>
          <Row className="info">
            <div className="button-text">
              <div className="text-input">
                <span>Nome da variação:</span>
                <Form.Group controlId="formBasicVariacaoDescricaoo">
                  <Form.Control
                    type="text"
                    placeholder="Nome da variação"
                    defaultValue={variacao.descricao}
                    onChange={(value) => {
                      variacao.descricao = value.target.value
                    }}
                  />
                </Form.Group>
              </div>
              <Button
                className="delete-btn"
                onClick={() =>
                  this.setState({
                    variacoes: this.state.variacoes.filter(
                      (v) => v !== variacao,
                    ),
                  })
                }
              >
                Deletar
              </Button>
            </div>
          </Row>
          <Col className="click">
            <div className="button-text">
              <span>Alternativas:</span>
              <Button
                onClick={() => {
                  if (!variacao.alternativas) {
                    variacao.alternativas = []
                  }
                  variacao.alternativas.push(new Alternativa())
                  this.setState({
                    variacoes: [...this.state.variacoes],
                  })
                }}
                className="btn-border-black"
              >
                Nova alternativa
              </Button>
            </div>
            {this.renderAlternativa(variacao)}
          </Col>
        </Col>
      )
    })
    if (options.length === 0) {
      return <p>Não há variações</p>
    }
    return <Col className="container-variacao">{options}</Col>
  }

  async handleSave(): Promise<void> {
    const produto = this.state.produto
    produto.variacoes = this.state.variacoes
    const produtoController = new ProdutoController()
    try {
      await produtoController.updateProduto(produto)
      swal({
        title: 'Sucesso',
        text: 'Seu produto foi alterado com sucesso',
        icon: 'success',
        buttons: {
          produtos: { text: 'Ver produtos', value: 'produtos' },
        },
      }).then((value: string) => {
        if (value === 'produtos') {
          this.props.history.replace('/produtos')
        } else {
          this.props.history.goBack()
        }
      })
    } catch (error) {
      swal({
        title: 'Ops, houve algum problema',
        text: error.message,
        icon: 'error',
        buttons: {
          cancel: 'Fechar',
        },
      })
    }
  }

  async handleDelete(): Promise<void> {
    const produto = this.state.produto
    produto.variacoes = this.state.variacoes
    const produtoController = new ProdutoController()
    try {
      await produtoController.deleteProdutoById(produto.id)
      swal({
        title: 'Sucesso',
        text: 'Seu produto foi deletado com sucesso',
        icon: 'success',
        buttons: {
          produtos: { text: 'Ver produtos', value: 'produtos' },
        },
      }).then((value: string) => {
        if (value === 'produtos') {
          this.props.history.replace('/produtos')
        } else {
          this.props.history.goBack()
        }
      })
    } catch (error) {
      swal({
        title: 'Ops, houve algum problema',
        text: error.message,
        icon: 'error',
        buttons: {
          cancel: 'Fechar',
        },
      })
    }
  }

  render(): JSX.Element {
    return (
      <div>
        <NavBar {...this.props}></NavBar>
        <Container>
          <div className="center-text">
            <p>Entre com as informações</p>
          </div>
          <Form className="form">
            <Form.Group controlId="formBasicNome">
              <Form.Control
                type="text"
                placeholder="Nome"
                defaultValue={this.state.produto.nome}
                onChange={(value) => {
                  const produto = this.state.produto
                  produto.nome = value.target.value
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCodigo">
              <Form.Control
                type="text"
                placeholder="Codigo"
                defaultValue={this.state.produto.codigo}
                onChange={(value) => {
                  const produto = this.state.produto
                  produto.codigo = value.target.value
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicDescricao">
              <Form.Control
                type="text"
                placeholder="Descrição"
                defaultValue={this.state.produto.descricao}
                onChange={(value) => {
                  const produto = this.state.produto
                  produto.descricao = value.target.value
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicValorBase">
              <Form.Control
                type="number"
                placeholder="ValorBase"
                defaultValue={this.state.produto.valorBase}
                onChange={(value) => {
                  const produto = this.state.produto
                  produto.valorBase = Number(value.target.value)
                }}
              />
            </Form.Group>
            <hr></hr>
            <div className="all-variacoes">
              <div className="button-text">
                <p>Adicione variações do produto</p>
                <Button
                  className="btn-border-black"
                  onClick={() =>
                    this.setState({
                      variacoes: [...this.state.variacoes, new Variacao()],
                    })
                  }
                >
                  Nova variação
                </Button>
              </div>
              {this.renderVariacao()}
            </div>
            <div className="two-center-btn">
              <Button className="black-btn" onClick={this.handleSave}>
                Alterar
              </Button>
              <Button className="delete-btn" onClick={this.handleDelete}>
                Excluir
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    )
  }
}
