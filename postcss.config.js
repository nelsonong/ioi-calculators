module.exports = {
	plugins: {
		"postcss-import": {},
		"autoprefixer": {},
		"postcss-mixins": {},
		"postcss-simple-vars": {},
		"postcss-nested": {},
		'postcss-preset-env': {
			browsers: 'last 2 versions',
		},
	},
};