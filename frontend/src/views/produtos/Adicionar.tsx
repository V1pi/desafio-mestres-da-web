import React, { Component } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { NavBar } from '../components/NavBar'
import './produtos.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { RouteComponentProps } from 'react-router'
import { Produto } from '../../models/produto.entity'

interface AdicionarProdutoState {
  produtos: Produto[]
}

type Props = RouteComponentProps<any>
export class Adicionar extends Component<Props, AdicionarProdutoState> {
  constructor(props: Props) {
    super(props)
    const p1 = new Produto()
    p1.nome = 'Camisa extra top'
    p1.valorBase = 200
    p1.descricao = 'Gostava de usar pra sair mas agora nao quero mais'
    p1.codigo = '15415'
    this.state = {
      produtos: [p1],
    }
  }

  render(): JSX.Element {
    return (
      <div>
        <NavBar {...this.props}></NavBar>
        <Container>
          <p>Vadias</p>
        </Container>
      </div>
    )
  }
}
