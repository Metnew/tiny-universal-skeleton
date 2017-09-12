import webpack from 'webpack'
import baseWebpackConfig from './webpack.base.babel'
import WriteFilePlugin from 'write-file-webpack-plugin'

baseWebpackConfig.entry.client = [
	'react-hot-loader/patch',
	'webpack-hot-middleware/client?reload=true',
	baseWebpackConfig.entry.client
]

// add dev plugins
baseWebpackConfig.plugins.push(
	new webpack.HotModuleReplacementPlugin(),
	new WriteFilePlugin()
)

export default baseWebpackConfig
