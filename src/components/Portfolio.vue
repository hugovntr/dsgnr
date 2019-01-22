<template>
	<section id="portfolio">
		<div class="container heading" v-if="title">
			<h1>Portfolio</h1>
			<p class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat vero corporis modi <a href="#">laudantium</a> eveniet facilis incidunt expedita blanditiis mollitia, animi explicabo autem omnis repellat dolorem quaerat, dicta labore repellendus. Repellendus!</p>
		</div>

		<div v-if="$route.name == 'portfolio'">
			<Pagination :pagination="pagination" controls name="portfolio"/>
		</div>

		<div class="wrapper container-fluid">
			<div class="row">
				<div class="card-columns">
					<div class="card p-0 m-0" v-for="(item, index) in items" :key="index">
						<div class="card-body m-0 p-0">
							<div class="card-img">
								<div class="overlay p-4 d-flex justify-content-center align-items-center">
									<div class="w-100 d-flex justify-content-center flex-column">
										<h2 class="secondary-font">{{item.title}}</h2>
										<div class="d-flex w-100 justify-content-start pt-3">
											<router-link class="btn btn-primary-outline" :to="{name: 'project', params: {slug: item.slug}}">Watch project</router-link>
										</div>
									</div>
								</div>
								<DSGNRImage :key="item.url" :lazy-src="item.url | resize(500)" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="row" v-if="$route.name != 'portfolio'">
				<div class="d-flex w-100 py-4 my-4 justify-content-center">
					<router-link :to="{name: 'portfolio'}" class="btn btn-black-outline">See more</router-link>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import DSGNRImage from '@/components/assets/Image'
	import Pagination from "@/components/assets/Pagination"

	export default {
		name: "Portfolio",
		components: {
			DSGNRImage,
			Pagination
		},
		props: {
			title: {type: Boolean, default: true},
			page: {type: Number, default: 1}
		},
		watch: {
			page(to, from) {
				this.getPage(to);
			}
		},
		data() {
			return {
				items: [],
				pagination: {
					links: {},
					meta: {}
				},
				controls: true,
			}
		},
		methods: {
			getPage(page = 1) {
				this.$http.get(this.$config.api._getImages(page).pages)
				.then(res => {
					this.items = res.data.data;
					this.pagination.links = res.data.links;
					this.pagination.meta = res.data.meta;
				})
				.catch(err => console.log('Request failed', err));
			}
		},
		mounted() {
			this.getPage(this.page);
		},
	}
</script>

<style scoped lang="scss">
	.card-columns {
		@include column-count(4);
		column-gap: 0;
		line-height: 0;
		@include breakpoint(xs) {@include column-count(1);}
		@include breakpoint(sm) {@include column-count(2);}
		@include breakpoint(md) {@include column-count(3);}
		@include breakpoint(lg) {@include column-count(3);}
		.card {
			display: inline-block;
			border: none;
			.card-img {
				position: relative;
				overflow: hidden;
				border-radius: 0;
				.overlay {
					background-color: rgba($dsgnr-black-color, .8);
					color: $dsgnr-white-color;
					z-index: -3;
					position: absolute;
					height: 100%;
					max-width: 100%;
					left: -200%;
					@include transition(left $transition-md-duration, z-index $transition-lg-duration);
				}
				&:hover {
					.overlay{
						left:0;
						z-index: 2;
					}
				}
			}
		}

	}
</style>