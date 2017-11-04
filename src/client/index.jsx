// Application
import React from 'react'
import {hydrate} from 'react-dom'
import Root from 'common'

hydrate(<Root />, document.getElementById('app'))

if (module.hot) {
	module.hot.accept()
}
