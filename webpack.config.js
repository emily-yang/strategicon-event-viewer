const path = require('path');
const webpack = require('webpack');

const config = {
	target: 'node',
	entry: './start-server.js',
	devtool: 'eval-source-map',
	output: {
		path: path.resolve(__dirname, 'public', 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{ 
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}
		]
	}
};

process.noDeprecation = true;

module.exports = config;