/**
 * @file
 */
import path from 'path'
import config from './config'
import webpack from 'webpack'

const {
	srcPath,
	rootPath,
	NODE_ENV
} = config

const definePluginArgs = {
	'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
}

export default {
	resolve: {
		extensions: ['.js', '.json', '.jsx'],
		modules: [srcPath, path.join(rootPath, 'node_modules')]
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				enforce: 'pre',
				use: [
					{
						loader: 'eslint-loader',
						options: {
							fix: true
						}
					}
				],
				exclude: [/node_modules/]
			},
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: [/node_modules/]
			}
		]
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.DefinePlugin(definePluginArgs)
	]
}
