<template>
	<img 
		:data-src="lazySrc"
		:data-srcset="lazySrcSet"
		:style="style"
		class="img-fluid animated"
	/>
</template>

<script>
	import lozad from 'lozad'

	export default {
		name: "DSGNRImage",
		props: {
			lazySrc: {type: String, default: null},
			lazySrcSet: {type: String, default: null},
			backgroundColor: {type: String, default: "#EFEFEF"},
			height: {type: Number, default: null},
			width: {type: Number, default: null},
		},
		data() {
			return {
				loading: true,
			}
		},
		computed: {
			aspectRatio() {
				if (!this.width || !this.height) return null;
				return (this.height / this.width) * 100;
			},
			style() {
				const style = {backgroundColor: this.backgroundColor};

				if (this.width)
					style.width = `${this.width}px`;

				const applyAspectRatio = this.loading && this.aspectRatio;
				if (applyAspectRatio) {
					style.height = 0;
					style.paddingTop = `${this.aspectRatio}%`;
				}

				return (style);
			},
		},
		mounted() {
			const setLoadingState = function() {
				this.loading = false;
			}

			this.$el.addEventListener('load', setLoadingState);

			this.$once('hook:destroyed', () => {
				this.$el.removeEventListener('load', setLoadingState);
			});

			lozad(this.$el, {
				load: function(el) {
					el.src = el.dataset.src;
					el.onload = function() {
						el.classList.add('fadeIn')
						el.parentElement.classList.add('loaded')
					}
				}
			}).observe();
		},
	};
</script>