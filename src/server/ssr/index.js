import React from 'react'
import {renderToString} from 'react-dom/server'
import Html from './Html'
import Root from 'common'
import fs from 'fs'

export default (req, res, next) => {
	const App = renderToString(<Root />)
	const assets = JSON.parse(fs.readFileSync(`webpack-assets`, 'utf8'))
	const html = Html({App, assets: JSON.parse(assets)})
	res.send(html)
}
