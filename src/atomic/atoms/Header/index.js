import { h } from 'hyperapp'
import { Link } from '@hyperapp/router'
import './index.css'


const component = ({ header, username = 'john doe' }) => (
	<header class="header">
		<Link class="header-brand" to="/">{header}</Link>
		<div class="header-photo-holder">
			<div class="header-photo"></div>
			<div class="header-username">{username}</div>
		</div>
	</header>
)

export default component