import { h } from 'hyperapp'
import { Link } from '@hyperapp/router'
import './index.css'

const component = () => (
	<navbar class="navbar">
    <Link class="navbar-link" to="/">Home</Link>
    <Link class="navbar-link" to="/about">About</Link>
	</navbar>
)

export default component