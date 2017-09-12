import addMiddlewares from './middlewares'
import API from './api'
import SSR from './ssr'

/**
 * Mount API, SSR and middlewares to app.
 * @param  {Object} app - Express server instance
 * @return {Object}     - Decorated server instance
 */
export default function (app) {
	// Add global middlewares
	addMiddlewares(app)
	// Add API
	app.use('/api/v1', API)
	// Add SSR
	app.use(SSR)
	return app
}
