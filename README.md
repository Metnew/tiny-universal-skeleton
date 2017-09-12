# Tiny-universal-skeleton
> If you want full-featured advanced starter -> visit [Noir](https://github.com/Metnew/react-semantic.ui-starter). It's currently in progress, give me some time to finish it and "Watch" the repo.

### Server

#### Entry

```javascript
import express from 'express'

const server = express()
const PORT = 3000
const isProduction = process.env.NODE_ENV === 'production'
//
const pathToServerDecorator = isProduction ? '../webpack_config' : ''
// NOTE: Such dynamic imports is a bad practice!
// It's used here to show that our `serverDecorator` is a dynamic thing.
const serverDecorator = require(pathToServerDecorator)
serverDecorator(server) // Notice this line

server.listen(PORT, () => {
	console.log(`SERVER IS LISTENING ON ${PORT}`)
})
```

Did you notice `server()` function? Let's figure out what's the hack is this:

#### Main server decorator
```js
import addMiddlewares from './middlewares'
import API from './api'
import SSR from './ssr'
/**
 * Decorate express server with API, SSR and middlewares.
 * @param  {Object} app - Express server instance
 * @return {Object}     - Decorated server instance
 */
export default (app: Object): Object => {
	// Add global middlewares
	addMiddlewares(app)
	// Add API
	app.use('/api/v1', API)
	// Add SSR
	app.use(SSR)
	return app
}
```

This function decorates express server instance with your middlewares, API and SSR stuff. (e.g. make your server *yours*)

### Webpack
#### Bundle server with Webpack
I don't want to argue about **"Is it ok to bundle server-side code with Webpack?"**
Shortly, **it's a great idea.**
**Main features**: tree-shaking, code optimizations, high configuration possibilities with `webpack.DefinePlugin()`. There are other cool things that you could do with Webpack and server. Use your imagination :)   
**Main cons**: it's hard to work with dirs, because webpack supports `__dirname` not as you expected. Read more in webpack docs.

#### Webpack.config
Your webpack.config.js for server may looks like:

```javascript
import path from 'path'
import fs from 'fs'
import webpack from 'webpack'

const isProduction = process.env.NODE_ENV === 'production'
const distPath = 'my/dist/path'
// NOTE: Notice these lines also:
const entry = isProduction
	? path.join(config.srcPath, './server')
	: path.join(config.srcPath, './server/server')

// Read more about Webpack for server, if you don't know what this lines do.
let nodeModules = {}
fs
	.readdirSync('node_modules')
	.filter(x => {
		return ['.bin'].indexOf(x) === -1
	})
	.forEach(mod => {
		nodeModules[mod] = 'commonjs ' + mod
	})

const baseWebpackConfig = {
	name: 'server',
	entry,
	target: 'node',
	output: {
		path: path.join(distPath, './server'),
		filename: 'index.js',
    // NOTE: You should add this line:
		libraryTarget: 'commonjs2'
    // If you didn't add info about "libraryTarget", setup will not work.
	},
	externals: nodeModules,
	node: {
		__dirname: true,
		global: true
	}
}

export default baseWebpackConfig
```

There are 2 strange things inside our webpack config:
1. `"libraryTarget"` must be `"commonjs2"`
2. Dynamic `"entry"`: If you remember, we have
