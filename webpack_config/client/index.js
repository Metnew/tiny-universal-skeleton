import path from 'path'
import childProcess from 'child_process'
import webpack from 'webpack'
import config from '../config'
import isomorphicWebpackConfig from '../webpack.isomorphic'
import AssetsPlugin from 'assets-webpack-plugin'
import WebpackAssetsManifest from 'webpack-assets-manifest'
const {
	CLIENT_DIST_PATH,
	NODE_ENV,
	srcPath,
	distPath,
	publicPath,
	isProduction,
	title
} = config

const exec = childProcess.execSync
exec(`rm -rf ${CLIENT_DIST_PATH}`)

const definePluginArgs = {
	'process.env.BROWSER': JSON.stringify(true)
}

const baseBuild = {
	name: 'client',
	entry: {
		client: path.join(srcPath, './client')
	},
	output: {
		filename: '[name].js',
		publicPath,
		path: CLIENT_DIST_PATH,
		chunkFilename: '[name].[chunkhash:6].js'
	},
	performance: {
		hints: false
	},
	resolve: {
		modules: isomorphicWebpackConfig.resolve.modules,
		extensions: isomorphicWebpackConfig.resolve.extensions.concat()
	},
	plugins: isomorphicWebpackConfig.plugins.concat([
		new webpack.DefinePlugin(definePluginArgs),
		new AssetsPlugin({
			path: CLIENT_DIST_PATH
		})
	]),
	target: 'web'
}

export default baseBuild
