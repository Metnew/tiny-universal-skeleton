import express from 'express'

const app = express()
const PORT = 3000
const isProduction = process.env.NODE_ENV === 'production'
const pathToServerDecorator = isProduction
	? './decorator'
	: '../../webpack_config/devServer'
// NOTE: Such dynamic imports is a bad practice!
// It's used here to show that our `serverDecorator` is a dynamic thing.
const serverDecorator = require(pathToServerDecorator).default
serverDecorator(app)

app.listen(PORT, () => {
	console.log(`SERVER IS LISTENING ON ${PORT}`)
})
