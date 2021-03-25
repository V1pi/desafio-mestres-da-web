import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import { NavBar } from '../components/NavBar'
import './login.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { RouteComponentProps } from 'react-router'
import { FirebaseHelper } from '../../helpers/firebase.helper'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import swal from '@sweetalert/with-react'
type Props = RouteComponentProps<any>
interface HomeLoginState {
  email: string
  senha: string
}
export class Home extends Component<Props, HomeLoginState> {
  constructor(props: Props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.state = {
      email: '',
      senha: '',
    }
  }

  async handleLogin(): Promise<void> {
    try {
      await FirebaseHelper.Instance.auth.signInWithEmailAndPassword(
        this.state.email,
        this.state.senha,
      )
      swal({
        title: 'Login efetuado com sucesso',
        text: 'Agora você pode alterar seus dados',
        icon: 'success',
        buttons: {
          produtos: { text: 'Ver produtos', value: 'produtos' },
        },
      }).then((value: string) => {
        if (value === 'produtos') {
          this.props.history.replace('/produtos')
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
        <div className="center-content">
          <div className="center-text">
            <h3>Seja bem-vindo a dafiti</h3>
            <p>Faça login para acessar as funcionalidades do site</p>
          </div>
          <Form className="form">
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(event) =>
                  this.setState({ email: event.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formBasicSenha">
              <Form.Control
                type="password"
                placeholder="Senha"
                onChange={(event) =>
                  this.setState({ senha: event.target.value })
                }
              />
            </Form.Group>
            <div className="center-text">
              <Button onClick={this.handleLogin}>Entrar</Button>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}
