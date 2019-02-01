function getConfig() {
	let API_LOCATION = process.env.VUE_APP_API_URL || 'http://127.0.0.1/dsgnr/api/v1/';
	
	this.api = {
		_getImages: (page = 1) => {
			return {
				method: 'GET',
				url: API_LOCATION + 'images',
				pages: API_LOCATION + 'images?page=' + page,
			};
		},
		_getImage: (slug) => {
			return {
				method: 'GET',
				url: API_LOCATION + 'images/' + slug
			};
		},
		_getSlugs: {
			method: 'GET', 
			url: API_LOCATION + 'images/?type=slugs',
		},
		_editImage: (slug) => {
			return {
				method: 'PUT',
				url: API_LOCATION + 'images/' + slug
			};
		}
	}

	return (this);
}

export default { getConfig }