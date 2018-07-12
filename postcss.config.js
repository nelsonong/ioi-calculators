module.exports = {
	plugins: {
		"postcss-import": {},
		"autoprefixer": {},
		"postcss-simple-vars": {},
		'postcss-preset-env': {
			browsers: 'last 2 versions',
		},
	},
};