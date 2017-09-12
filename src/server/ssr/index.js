import React from 'react'
import {renderToString} from 'react-dom/server'
import assets from 'webpack-assets'
import Html from './Html'
import Root from 'common'

export default (req, res, next) => {
	const App = renderToString(<Root />)
	const html = Html({App, assets})
	res.send(html)
}
