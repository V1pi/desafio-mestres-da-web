import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home } from './Home'
export class Registrar extends Component {
  render(): JSX.Element {
    return (
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    )
  }
}
