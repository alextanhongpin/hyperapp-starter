import { h } from 'hyperapp'
import { Link } from '@hyperapp/router'
import './index.css'


const component = ({ header }) => (
	<header>
		<Link class="header-brand" to="/">{header}</Link>
	</header>
)

export default component