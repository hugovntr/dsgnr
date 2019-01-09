<template>
	<div id="topbar" class="py-3">
		<div class="row">
			<div class="col-10 px-0 offset-1 topbar">
				<div class="d-flex justify-content-between">
					<a @click="$router.back()" class="back control"><span class="highlight">⟵</span> back</a>
					<div class="author" v-if="isAuthor">
						<span class="medium-color">Posted on</span>
						<span class="dark-color"> {{ date }} — </span>
						<strong class="dark-color">{{ name }}</strong>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Topbar',
		props: {
			name: String,
			date: String,
			isAuthor: {type: Boolean, default: true}
		}
	}
</script>

<style lang="scss" scoped>
	#topbar {
	}
</style>