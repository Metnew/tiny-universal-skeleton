import express from 'express'
import morgan from 'morgan'

export default (app: Object) => {
	app.use(morgan('dev'))
	app.use(
		express.static(process.env.CLIENT_DIST_PATH, {
			index: false
		})
	)
}
