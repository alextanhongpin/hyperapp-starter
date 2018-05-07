import { app, h } from 'hyperapp'
import { Link, Route, location } from '@hyperapp/router'

import 'normalize.css'
import './index.css'

// Atoms
import Header from './atomic/atoms/Header'

// Pages
import HomePage from './atomic/pages/Home'
import AboutPage from './atomic/pages/About'

const state = {
  header: 'yourapp',
  // Register state for @hyperapp/router
  location: location.state
}

const actions = {
  // Register actions for @hyperapp/router
  location: location.actions
}

const view = (state, actions) => (
  <main>
    <Header header={state.header}/>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>

    <Route path="/" render={HomePage}/>
    <Route path="/about" render={AboutPage}/>
  </main>
)

const main = app(state, actions, view, document.body)

// Register @hyperapp/router
const unsubscribe = location.subscribe(main.location)
