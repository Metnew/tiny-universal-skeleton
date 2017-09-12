// Application
import React from 'react'
import ReactDOM, {render} from 'react-dom'
import Root from 'common'

render(<Root />, document.getElementById('app'))

if (module.hot) {
	module.hot.accept()
}
