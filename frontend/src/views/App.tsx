import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Login } from './login/Login'
import { Produto } from './produtos/Produto'
import { Registrar } from './registrar/Registrar'
export class App extends Component {
  render(): JSX.Element {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/registrar" component={Registrar} />
          <Route path="/produtos" component={Produto} />
        </Switch>
      </Router>
    )
  }
}
