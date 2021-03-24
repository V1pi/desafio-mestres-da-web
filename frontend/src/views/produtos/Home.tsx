import React, { Component } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { NavBar } from '../components/NavBar'
import './produtos.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { RouteComponentProps } from 'react-router'
import { Produto } from '../../models/produto.entity'

interface HomeProdutoState {
  produtos: Produto[]
}

type Props = RouteComponentProps<any>
export class Home extends Component<Props, HomeProdutoState> {
  constructor(props: Props) {
    super(props)
    this.renderProdutos = this.renderProdutos.bind(this)
    const p1 = new Produto()
    p1.nome = 'Camisa extra top'
    p1.valorBase = 200
    p1.descricao = 'Gostava de usar pra sair mas agora nao quero mais'
    p1.codigo = '15415'
    this.state = {
      produtos: [p1, p1],
    }
  }

  renderProdutos(): JSX.Element {
    const options: JSX.Element[] = this.state.produtos.map((produto, idx) => {
      return (
        <Row className="product" key={idx}>
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
}
