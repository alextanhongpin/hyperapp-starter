import { h } from 'hyperapp'

import './index.css'

const component = ({ footer = 'Copyright © 2018 yourapp' }) => (
	<footer class="footer">{footer}</footer>
)

export default component