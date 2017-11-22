const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const outputPath = path.resolve(__dirname, './public');
const { createReadStream } = require('fs');
const autoprefixer = require('autoprefixer');


const webpackConfig = {
	entry: {
		app: [
			path.resolve(__dirname, './src/index.js')
		]
	},
	output: {
		path: path.resolve(__dirname, './public'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								autoprefixer({
									browsers:['ie >= 10', 'last 2 version']
								})
							]
						}
					},
					'sass-loader'
				]
			},
			{
				test: /\.(gif|png|jpg|jpeg|svg)$/,
				exclude: /node_modules/,
				include: path.resolve(__dirname, './src/assets/'),
				use: 'url-loader?limit=10000&name=assets/[name]-[hash].[ext]'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './src/assets/index.html'),
			filename: 'index.html',
			path: outputPath
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: `"${process.env.NODE_ENV}"`,
			},
		}),
	],

	devServer: {
		contentBase: path.resolve(__dirname, './public'),
		port: 9000,
		historyApiFallback: true,
		inline: true,
		hot: true,
		host: '0.0.0.0',
		setup(app) {
			app.get('/api/tiles', function(req, res)  {
				res.writeHead(200, { 'Content-Type' : 'application/json' });
				createReadStream(path.join(process.cwd(), 'api/tiles.json'), { encoding: 'utf-8' })
					.pipe(res);
			});
		},
	}
}

module.exports = webpackConfig;