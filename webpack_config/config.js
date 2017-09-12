/**
 * @file for config stuff that's used for webpack configuration, but isn't passed to webpack compiler
 */

import path from 'path'

// Paths
const rootPath = path.join(__dirname, '../') // = "/"
const distPath = path.join(rootPath, './dist') // = "/dist"
const srcPath = path.join(rootPath, './src') // = "/src"
const srcCommonPath = path.join(srcPath, './common') // = "/src/common"

const NODE_ENV = process.env.NODE_ENV || 'development'
const CLIENT_DIST_PATH = path.join(distPath, './client')

// compute isProduction based on NODE_ENV
const isProduction = NODE_ENV === 'production'

export default {
	title: 'Tiny-universal-skeleton',
	publicPath: '/',
	// i18n object
	isProduction,
	// Env vars
	NODE_ENV,
	CLIENT_DIST_PATH,
	// It's better to define pathes in one file
	// and then use everywhere across app
	srcPath,
	srcCommonPath,
	distPath,
	rootPath
}
