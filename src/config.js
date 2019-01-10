function getConfig() {
	this.API_LOCATION = 'http://127.0.0.1/dsgnr/api/v1/',
	this.ENDPOINTS = {
		portfolio: {
			_getImages: this.API_LOCATION + 'images',
			_getImage: (slug) => {
				return this.API_LOCATION + 'images/' + slug;
			},
			_getSlugs: this.API_LOCATION + 'images/slugs',
			_editImage: (slug) => {
				return this.API_LOCATION + 'images/edit/' + slug;
			}
		}
	}

	return (this);
}

export default { getConfig }