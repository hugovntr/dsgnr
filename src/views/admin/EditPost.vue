<template>
	<div id="edit" class="container">
		<div class="row">
			<div class="col-xs-12 col-sm-12 col-md-4">
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
			<div class="col-xs-12 col-sm-12 col-md-8">
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
	import { mapGetters, mapActions } from 'vuex';

	export default {
		name: "adminEditPost",
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
		computed: {
			...mapGetters('user', {
				projectBySlug: 'projectBySlug',
			}),
		},
		methods: {
			...mapActions('user', {
				editProject: 'editProject'
			}),
			getProject() {
				if (this.projectBySlug(this.slug)) {
					this.post = this.projectBySlug(this.slug);
					this.thumbnail = this.post.url;
				}
				else {
					console.error('Invalid project');
					this.$router.back();
				}
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
				data.append('site_id', this.post.site_id);
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
					this.editProject({slug: this.slug, project: res.data.data})
					flash("Project saved succesfuly", "success");
					this.$router.push({name: 'adminEditPost', params: {slug: res.data.data.slug}});
				})
				.catch((err) => {
					flash("This project can not be updated as it is, may be it has the same title as an other one?", "error");
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