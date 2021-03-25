import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Adicionar } from './Adicionar'
import { Alterar } from './Alterar'
import { Home } from './Home'
export class Produto extends Component {
  render(): JSX.Element {
    return (
      <Switch>
        <Route exact path="/produtos" component={Home} />
        <Route path="/produtos/adicionar/" component={Adicionar} />
        <Route path="/produtos/:id/alterar/" component={Alterar} />
      </Switch>
    )
  }
}
