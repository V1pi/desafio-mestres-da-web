import React, { Component } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { NavBar } from '../components/NavBar'
import './produtos.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { RouteComponentProps } from 'react-router'
import { Produto } from '../../models/produto.entity'
import { FirebaseHelper } from '../../helpers/firebase.helper'
import { ApiHelper } from '../../helpers/api.helper'
import { ProdutoController } from '../../controllers/produto_controller'

interface HomeProdutoState {
  produtos: Produto[]
}

type Props = RouteComponentProps<any>
export class Home extends Component<Props, HomeProdutoState> {
  constructor(props: Props) {
    super(props)
    this.renderProdutos = this.renderProdutos.bind(this)
    if (!FirebaseHelper.Instance.auth.currentUser) {
      this.props.history.replace('/')
    }
    this.state = {
      produtos: [],
    }
  }

  renderProdutos(): JSX.Element {
    const options: JSX.Element[] = this.state.produtos.map((produto, idx) => {
      return (
        <Row
          className="product"
          key={idx}
          onClick={() =>
            this.props.history.push('/produtos/' + produto.id + '/alterar')
          }
        >
          <Col className="info col-8">
            <Row>
              <p>
                {produto.codigo} - {produto.nome}
              </p>
            </Row>
            <Row>À partir de: R$ {produto.valorBase.toFixed(2)}</Row>
            <Row>
              Descrição:
              <br /> {produto.descricao}
            </Row>
          </Col>
          <Col className="click">
            <span>Clique para ver detalhes</span>
          </Col>
        </Row>
      )
    })
    if (options.length === 0) {
      return <p>Não há produtos cadastrados</p>
    }
    return <Col className="container-product">{options}</Col>
  }

  render(): JSX.Element {
    return (
      <div>
        <NavBar {...this.props}></NavBar>
        <Container>
          <div className="button-text">
            <span>Seus produtos cadastrados:</span>
            <span>
              <Button
                onClick={() => {
                  this.props.history.push('/produtos/adicionar')
                }}
              >
                Novo produto
              </Button>
            </span>
          </div>

          {this.renderProdutos()}
        </Container>
      </div>
    )
  }

  componentDidMount(): void {
    const produtoController = new ProdutoController()
    produtoController.getAllProdutos().then((produtos) => {
      this.setState({ produtos })
    })
  }
}
