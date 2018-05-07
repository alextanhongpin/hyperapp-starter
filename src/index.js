import { app, h } from 'hyperapp'
import { Link, Route, location } from '@hyperapp/router'

import './index.css'

const state = {
  count: 0,
  // Register state for @hyperapp/router
  location: location.state
}

const actions = {
  reset: () => ({ count: 0 }),
  sum: data => ({ count }) => ({ count: count + data }),
  // Register actions for @hyperapp/router
  location: location.actions
}

// Pages
const Home = () => <div>Home</div>
const About = () => <div>About</div>

const view = (state, actions) => (
  <main>
    <h1>{state.count}</h1>
    <div>
      <button onclick={(e) => actions.sum(-1)}>Sub</button>
      <button onclick={(e) => actions.reset(1)}>Reset</button>
      <button onclick={(e) => actions.sum(1)}>Add</button>
    </div>

    <Link to="/">Home</Link>
    <Link to="/about">About</Link>

    <Route path="/" render={Home}/>
    <Route path="/about" render={About}/>
  </main>
)

const main = app(state, actions, view, document.body)

// Register @hyperapp/router
const unsubscribe = location.subscribe(main.location)
