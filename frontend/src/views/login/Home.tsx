import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import { NavBar } from '../components/NavBar'
import './login.css'
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
            <h3>Seja bem-vindo a dafiti</h3>
            <p>Faça login para acessar as funcionalidades do site</p>
          </div>
          <Form className="form">
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>
            <Form.Group controlId="formBasicSenha">
              <Form.Control type="password" placeholder="Senha" />
            </Form.Group>
            <div className="center-text">
              <Button>Entrar</Button>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}
