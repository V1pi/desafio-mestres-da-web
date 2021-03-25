import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Navbar } from 'react-bootstrap'
import './navbar.css'
import Dafiti from './dafiti.svg'
import { RouteComponentProps } from 'react-router'
import { FirebaseHelper } from '../../helpers/firebase.helper'
type Props = RouteComponentProps<any>
export class NavBar extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.renderSignout = this.renderSignout.bind(this)
  }

  renderSignout(): JSX.Element {
    if (!FirebaseHelper.Instance.auth.currentUser) {
      return <span></span>
    }
    if (
      this.props.history.location.pathname === '/' ||
      this.props.history.location.pathname === '/registrar'
    ) {
      this.props.history.replace('/produtos')
    }
    return (
      <Navbar.Text className="signout">
        <Nav.Link
          onClick={async () => {
            await FirebaseHelper.Instance.auth.signOut()
            this.props.history.replace('/')
          }}
        >
          Sair
        </Nav.Link>
      </Navbar.Text>
    )
  }

  render(): JSX.Element {
    return (
      <div>
        <Navbar collapseOnSelect bg="light">
          <Navbar.Brand
            onClick={() => this.props.history.push('/')}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={Dafiti}
              width="75"
              height="75"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="mr-auto">
              <Nav.Link onClick={() => this.props.history.push('/registrar')}>
                Registrar
              </Nav.Link>
              <Nav.Link onClick={() => this.props.history.push('/produtos')}>
                Produtos
              </Nav.Link>
            </Nav>
            {this.renderSignout()}
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
