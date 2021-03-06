const path = require("path");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = [
	{
		mode: process.env.NODE_ENV,
		...defaultConfig,
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /(node_modules|bower_components)/,
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
						plugins: [
							"@babel/plugin-proposal-class-properties",
							"@babel/plugin-transform-arrow-functions",
						],
					},
				},
				{
					test: /\.(png|jpg|gif)(\?v=\d+\.\d+\.\d+)?$/,
					exclude: /(node_modules|bower_components)/,
					use: [
						{
							loader: "file-loader",
							options: {
								name: "[name].[ext]",
								outputPath: "images/",
								esModule: false,
							},
						},
					],
				},
				{
					test: /\.scss$/,
					exclude: /(node_modules|bower_components)/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
						},
						{
							loader: "css-loader",
							options: {
								sourceMap: true,
								url: false,
							},
						},
						"sass-loader",
					],
				},
			],
		},
		devtool: "source-map",
		externals: {
			// Use external version of React
			react: "React",
			"react-dom": "ReactDOM",
			lodash: "lodash",
			'@wordpress': 'wp',
			'@wordpress/blocks': 'wp.blocks',
			'@wordpress/element': 'wp.element',
			"@wordpress/components": 'wp.components',
			"@wordpress/block-editor": 'wp.blockEditor',
			"@wordpress/i18n": 'wp.i18n',
		},
		plugins: [
			new MiniCssExtractPlugin(),
		],
	},
	{
		mode: process.env.NODE_ENV,
		entry: {
			blockstyles: ["./src/block/style.scss"],
			admin: ["./src/scss/admin.scss"],
		},
		output: {},
		module: {
			rules: [
				{
					test: /\.scss$/,
					exclude: /(node_modules|bower_components)/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
						},
						{
							loader: "css-loader",
							options: {
								sourceMap: true,
								url: false,
							},
						},
						"sass-loader",
					],
				},
				{
					test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
					exclude: /(node_modules|bower_components)/,
					use: [
						{
							loader: "file-loader",
							options: {
								name: "[name].[ext]",
								outputPath: "fonts/",
								esModule: false,
							},
						},
					],
				},
			],
		},
		plugins: [
			new FixStyleOnlyEntriesPlugin(),
			new MiniCssExtractPlugin(),
		],
	},
];
