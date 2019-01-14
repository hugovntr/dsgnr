<template>
	<section id="blog">
		<div class="container" v-if="title">
			<h1>Blog</h1>
			<p class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat vero corporis modi <a href="#">laudantium</a> eveniet facilis incidunt expedita blanditiis mollitia, animi explicabo autem omnis repellat dolorem quaerat, dicta labore repellendus. Repellendus!</p>
		</div>

		<div class="wrapper container-fluid">
			<div class="row">
				
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		name: "Blog",
		props: {
			title: {type: Boolean, default: true}
		},
		data() {
			return {
				items: []
			}
		},
		mounted() {
			
		}
	}
</script>

<style scoped lang="scss">
	#blog {

	}
</style>