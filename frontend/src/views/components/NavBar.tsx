import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, Navbar } from 'react-bootstrap'
import './navbar.css'
import Dafiti from './dafiti.svg'
import { RouteComponentProps } from 'react-router'
type Props = RouteComponentProps<any>
export class NavBar extends Component<Props> {
  render(): JSX.Element {
    return (
      <div>
        <Navbar collapseOnSelect bg="light">
          <Navbar.Brand onClick={() => this.props.history.push('/')}>
            <img
              src={Dafiti}
              width="75"
              height="75"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={() => this.props.history.push('/registrar')}>
                Registrar
              </Nav.Link>
              <Nav.Link onClick={() => this.props.history.push('/produtos')}>
                Produtos
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
