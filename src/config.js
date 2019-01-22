function getConfig() {
	this.API_LOCATION = (process.env.NODE_ENV === "staging") 
		? 'http://api.dsgnr.lab/v1/'
		: 'http://127.0.0.1/dsgnr/api/v1',
	this.api = {
		_getImages: (page = 1) => {
			return {
				method: 'GET',
				url: this.API_LOCATION + 'images',
				pages: this.API_LOCATION + 'images?page=' + page,
			};
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