function getConfig() {
	this.API_LOCATION = 'http://127.0.0.1/dsgnr/api/v1/',
	this.api = {
		_getImages: {
			method: 'GET',
			url: this.API_LOCATION + 'images',
		},
		_getImage: (slug) => {
			return {
				method: 'GET',
				url: this.API_LOCATION + 'images/' + slug
			};
		},
		_getSlugs: {
			method: 'GET', 
			url: this.API_LOCATION + 'images/?type=slugs',
		},
		_editImage: (slug) => {
			return {
				method: 'PUT',
				url: this.API_LOCATION + 'images/' + slug
			};
		}
	}

	return (this);
}

export default { getConfig }