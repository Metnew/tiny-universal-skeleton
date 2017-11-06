import React from 'react'
import {renderToString} from 'react-dom/server'
import Html from './Html'
import Root from 'common'
import fs from 'fs'
// const assets = require(`${process.env.CLIENT_DIST_PATH}/webpack-assets.json`)
// const assets = fs.readFileSync(`${process.env.CLIENT_DIST_PATH}/webpack-assets.json`, 'utf8')

export default (req, res, next) => {
	const App = renderToString(<Root />)
	const assets = fs.readFileSync(`${process.env.CLIENT_DIST_PATH}/webpack-assets.json`, 'utf8')
	const html = Html({App, assets: JSON.parse(assets)})
	res.send(html)
}
