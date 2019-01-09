<template>
	<div id="portfolio">
		<div class="container" v-if="title">
			<h1>Portfolio</h1>
			<p class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat vero corporis modi <a href="#">laudantium</a> eveniet facilis incidunt expedita blanditiis mollitia, animi explicabo autem omnis repellat dolorem quaerat, dicta labore repellendus. Repellendus!</p>
		</div>

		<div class="wrapper container-fluid">
			<div class="row">
				<div class="card-columns">
					<div class="card p-0 m-0" v-for="item in items">
						<div class="card-body p-0">
							<div class="card-img">
								<div class="overlay p-4 d-flex justify-content-center align-items-center">
									<div class="w-100 d-flex justify-content-center flex-column">
										<h2 class="secondary-font">{{item.title}}</h2>
										<div class="d-flex w-100 justify-content-start pt-3">
											<router-link class="btn btn-primary-outline" :to="{name: 'project', params: {slug: item.slug}}">Watch project</router-link>
										</div>
									</div>
								</div>
								<img :src="item.url" alt="" class="img-fluid"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Portfolio",
		props: {
			title: {type: Boolean, default: true}
		},
		data() {
			return {
				items: []
			}
		},
		mounted() {
			this.$http.get(this.$config.ENDPOINTS.portfolio._getImages)
			.then(res => {
				this.items = res.data;
			})
			.catch(err => console.log('Request failed', err));
		}
	}
</script>

<style scoped lang="scss">
	.card-columns {
		@include column-count(4);
		column-gap: 0;
		@include breakpoint(xs) {@include column-count(1);}
		@include breakpoint(sm) {@include column-count(2);}
		@include breakpoint(md) {@include column-count(3);}
		@include breakpoint(lg) {@include column-count(3);}
		.card {
			border: none;
			.card-img {
				position: relative;
				overflow: hidden;
				border-radius: 0;
				.overlay {
					background-color: rgba($dsgnr-black-color, .8);
					color: $dsgnr-white-color;
					position: absolute;
					height: 100%;
					max-width: 100%;
					left: -200%;
					@include transition(left $transition-md-duration);
				}
				&:hover {
					.overlay{left:0;}
				}
			}
		}

	}
</style>