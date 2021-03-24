import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import { NavBar } from '../components/NavBar'
import '../login/login.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { RouteComponentProps } from 'react-router'
type Props = RouteComponentProps<any>
export class Home extends Component<Props> {
  render(): JSX.Element {
    return (
      <div>
        <NavBar {...this.props}></NavBar>
        <div className="center-content">
          <div className="center-text">
            <h3>Registrar</h3>
            <p>Entre com as informações abaixo para se registrar</p>
          </div>
          <Form className="form">
            <Form.Group controlId="formBasicNome">
              <Form.Control type="text" placeholder="Nome" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>
            <Form.Group controlId="formBasicSenha">
              <Form.Control type="password" placeholder="Senha" />
            </Form.Group>
            <div className="center-text">
              <Button>Registrar</Button>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}
