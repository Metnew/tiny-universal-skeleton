// Application
import React from 'react'
import {render} from 'react-dom'
import Root from 'common'

render(<Root />, document.getElementById('app'))

if (module.hot) {
	module.hot.accept()
}
