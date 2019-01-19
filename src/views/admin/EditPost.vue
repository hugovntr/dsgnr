<template>
	<div id="edit" class="container">
		<div class="row">
			<div class="col-xs-12 col-sm-4 col-md-4">
				<label for="thumbnail"><strong>Image</strong></label>
				<img :src="thumbnail" alt="" class="img-fluid">
				
				<div class="pt-3">
					<label class="label-file d-flex justify-content-between align-items-center">
						<span v-if="mediaToPost">{{ mediaToPost.name }}</span>
						<span v-else>Choose a file...</span>
						<span class="btn">Browse</span>
						<input type="file" ref="file" name="file" v-on:change="onFileChange" class="d-none"/>
					</label>
				</div>
			</div>
			<div class="col-xs-12 col-sm-8 col-md-8">
				<div class="form d-flex flex-column">
					<div class="title d-flex flex-column mb-3 pb-3">
						<label for="title"><strong>Title</strong></label>
						<input type="text" class="secondary-font dark-color input-text h1-xs-font-size" placeholder="Enter a title..." v-model="post.title"/>
					</div>
					<div class="description d-flex flex-column py-3 mt-3">
						<label for="description"><strong>Description</strong></label>
						<editor id="desc" :item="post" @updated="onEditorUpdate"/>
					</div>
				</div>
				
				<div class="controls d-flex justify-content-end">
					
					<button class="btn btn-secondary" @click="submit">Save</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	.label-file {
		cursor: pointer;
	}
</style>

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
				thumbnail: '',
				mediaToPost: ''
			}
		},
		methods: {
			getProject() {
				this.$http.get(this.$config.api._getImage(this.slug).url)
				.then(res => {
					this.post = res.data.data;
					this.thumbnail = this.post.url;
				})
				.catch(err => console.log('Request failed', err));
			},
			onFileChange(e) {
				
				this.mediaToPost = this.$refs.file.files[0];

				let files = e.target.files || e.dataTransfer.files;
				if (!files.length) return ;
				this.createImage(files[0]);
			},
			createImage(file) {
				let reader = new FileReader();
				let vm = this;
				reader.onload = (e) => {
					vm.thumbnail = e.target.result;
				};
				reader.readAsDataURL(file);
			},
			submit() {
				let data = new FormData();
				data.append('title', this.post.title);
				data.append('content', this.post.content);
				data.append('_method', this.$config.api._editImage(this.slug).method);
				data.append('media', this.mediaToPost);

				this.$http.post(this.$config.api._editImage(this.slug).url, data, {
	                headers: {
	                    'Content-Type': 'multipart/form-data'
	                }
				})
				.then ((res) => {
					flash("Project saved succesfuly", "success");
					this.$router.push({name: 'adminEditPost', params: {slug: res.data.data.slug}});
				})
				.catch((err) => {
					flash("An unknown error occured, please try again later", "error");
					console.log(err)
				});
			},
			onEditorUpdate(value) {
				this.post.content = value;
			}
		},
		created() {
			this.getProject();
		}
	}
</script>