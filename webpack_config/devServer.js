/**
 * @file
 */
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackGetCodeOnDone from 'webpack-get-code-on-done'
import client from './client/webpack.dev.babel'
import server from './server/webpack.dev.babel'
// Configs for MultiCompiler
const webpackConfig = [client, server]
// Get MultiCompiler
const compiler = webpack(webpackConfig)
// Create devMiddleWare
const devMiddleWare = webpackDevMiddleware(compiler, {
	serverRenderer: true,
	publicPath: webpackConfig[0].output.publicPath,
	quiet: false,
	noInfo: true
})

// NOTE: Every time we apply our compiled code to development server
// We add new middlewares from new code, but don't remove old middlewares from old code
// Number of middlewares that Express app should have out-of-box
let prevSize = null
/**
 * @desc Adds dev middlewares + your code to an express server instance
 * @param {ExpressServer} app - Express dev server to which compiled code will be applied
 */
export default function (app) {
	/**
	 * @desc Function that executes after your server-side code compiles
	 * @param  {Function}  serverSideCode - compiled server-side code
	 */
	const done = serverSideCode => {
		// Get current stack of the app (e.g. applied to Express server middlewares)
		const {stack} = app._router
		// get current lenght of stack
		const {length} = stack
		// When we run server first time we don't have any applied middlewares from compiled code
		prevSize = prevSize || length
		if (length > prevSize) {
			// TL;DR: Remove already compiled code
			// That means that we already applied our code to devServer
			// And we can remove already applied middlewares from the last compilation
			app._router.stack = stack.slice(0, prevSize)
		}
		// Apply newly compiled code to our app
		serverSideCode(app)
	}

	// webpack Compiler for server
	const serverCompiler = compiler.compilers.find(
		compiler => compiler.name === 'server'
	)
	// webpack Compiler for client
	const clientCompiler = compiler.compilers.find(
		compiler => compiler.name === 'client'
	)
	// Add webpack-dev-middleware
	app.use(devMiddleWare)
	// Add webpack-hot-middleware
	app.use(
		webpackHotMiddleware(clientCompiler, {
			log: console.log
		})
	)
	// Run `done` after serverCompiler emits `done` with a newly compiled code as argument
	webpackGetCodeOnDone(serverCompiler, done)
}
