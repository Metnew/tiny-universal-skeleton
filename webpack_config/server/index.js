import path from 'path'
import fs from 'fs'
import webpack from 'webpack'
import config from '../config'
import isomorphicWebpackConfig from '../webpack.isomorphic'
import childProcess from 'child_process'

const {
	SENTRY_DSN,
	CLIENT_DIST_PATH,
	JWT_SECRET,
	ANALYZE_BUNDLE,
	PORT,
	isProduction
} = config

// Cleare dist dir before run
const exec = childProcess.execSync
exec(`rm -rf ${config.distPath}/server`)

const definePluginArgs = {
	'process.env.BROWSER': JSON.stringify(false),
	'process.env.CLIENT_DIST_PATH': JSON.stringify(CLIENT_DIST_PATH)
}

const devtool = isProduction ? 'cheap-source-map' : 'source-map'
const entry = isProduction
	? path.join(config.srcPath, './server')
	: path.join(config.srcPath, './server/decorator')

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
		path: path.join(config.distPath, './server'),
		filename: 'index.js',
		libraryTarget: 'commonjs2'
	},
	externals: nodeModules,
	performance: {
		hints: false
	},
	resolve: {
		extensions: isomorphicWebpackConfig.resolve.extensions,
		modules: isomorphicWebpackConfig.resolve.modules,
		alias: {
			'webpack-assets': `${CLIENT_DIST_PATH}/webpack-assets.json`
		}
	},
	plugins: isomorphicWebpackConfig.plugins.concat([
		new webpack.DefinePlugin(definePluginArgs)
	]),
	node: {
		__dirname: true,
		global: true
	}
}

export default baseWebpackConfig
