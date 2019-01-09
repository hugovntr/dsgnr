<template>
	<div id="edit" class="container">
		<div class="row">
			<div class="col-xs-12 col-sm-6">
				<img :src="post.url" alt="" class="img-fluid">
			</div>
			<div class="col-xs-12 col-sm-6">
				<input type="text" class="secondary-font" v-model="post.title"/>
				<editor :item="post" @updated="onEditorUpdate"/>

				<button class="btn" @click="submit">Save</button>
			</div>
		</div>
	</div>
</template>

<script>

	import Editor from '@/components/assets/Editor'

	export default {
		name: "Edit",
		components: {
			Editor
		},
		watch: {
			'$route'(to, from) {
				this.slug = to.params.slug;
				this.getProject();
			}
		},
		data() {
			return {
				slug: this.$route.params.slug,
				post: {},
			}
		},
		methods: {
			getProject() {
				this.$http.get(this.$config.ENDPOINTS.portfolio._getImage(this.slug))
				.then(res => {
					this.post = res.data[0];
				})
				.catch(err => console.log('Request failed', err));
			},
			submit() {
				let params = new URLSearchParams();
				params.append('title', this.post.title);
				params.append('description', this.post.description);

				this.$http.post(this.$config.ENDPOINTS.portfolio._editImage(this.slug), params)
				.then ((res) => console.log(res))
				.catch((err) => console.log(err));
			},
			onEditorUpdate(value) {
				this.post.description = value;
			}
		},
		created() {
			this.getProject();
		}
	}
</script>