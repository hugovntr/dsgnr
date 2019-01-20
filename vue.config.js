const devServer = {
	host: 'dsgnr.lab',
	port: 8080,
	https: false
};

module.exports = {
	css: {
		loaderOptions: {
			sass: {
				data: '@import "@/assets/scss/dsgnr.scss";'
			}
		}
	},
	devServer: (process.env.NODE_ENV === "staging") ? devServer : {},
};