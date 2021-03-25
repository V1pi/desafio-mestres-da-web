import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import { NavBar } from '../components/NavBar'
import '../login/login.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { RouteComponentProps } from 'react-router'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import swal from '@sweetalert/with-react'
import { RegisterController } from '../../controllers/register_controller'
type Props = RouteComponentProps<any>
interface HomeRegistrarState {
  email: string
  senha: string
  nome: string
}
export class Home extends Component<Props, HomeRegistrarState> {
  constructor(props: Props) {
    super(props)
    this.handleRegister = this.handleRegister.bind(this)
    this.state = {
      email: '',
      senha: '',
      nome: '',
    }
  }

  async handleRegister(): Promise<void> {
    const registerController = new RegisterController()
    try {
      await registerController.register(
        this.state.email,
        this.state.senha,
        this.state.nome,
      )
      swal({
        title: 'Registro efetuado com sucesso!',
        text: 'Agora você pode fazer o login',
        icon: 'success',
        buttons: {
          produtos: { text: 'Fazer login', value: 'login' },
        },
      }).then((value: string) => {
        if (value === 'login') {
          this.props.history.replace('/')
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
            <h3>Registrar</h3>
            <p>Entre com as informações abaixo para se registrar</p>
          </div>
          <Form className="form">
            <Form.Group controlId="formBasicNome">
              <Form.Control
                type="text"
                placeholder="Nome"
                onChange={(event) =>
                  this.setState({ nome: event.target.value })
                }
              />
            </Form.Group>
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
              <Button onClick={this.handleRegister}>Registrar</Button>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}
