<template>
	<div id="project">
		<div class="container-fluid">
			<Topbar :isAuthor="false" name="Hugo" date="13/12/2019"/>
			<div class="row px-3 px-sm-0">
				<div class="d-none d-sm-flex col-1 justify-content-center">
					<router-link v-if="controls.prev.status" :to="'/project/' + controls.prev.slug" class="item prev control">
						<div>Previous — <span class="highlight">{{controls.prev.title}}</span></div>
					</router-link>
				</div>
				<div class="col-xs-12 col-sm-10 px-0 content">
					<div class="d-flex flex-column flex-sm-column flex-md-column flex-lg-row">
						<h1 class="d-flex d-lg-none">{{project.title}}</h1>
						<div class="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-6 px-0">
							<DSGNRImage :key="project.url" :lazy-src="project.url | resize(800)" v-if="project.url" />
						</div>
						<div class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-6 px-0 px-lg-3">
							<h1 class="d-none d-lg-flex">{{project.title}}</h1>
							<div class="description" v-html="project.content">{{project.content}}</div>
						</div>
					</div>
				</div>
				<div class="d-none d-sm-flex col-1 justify-content-center">
					<router-link v-if="controls.next.status" 
					:to="'/project/' + controls.next.slug" class="item next control">
						<div>Next — <span class="highlight">{{controls.next.title}}</span></div>
					</router-link>
				</div>
			</div>

			<div class="d-flex d-sm-none justify-content-around py-3">
				<router-link v-if="controls.prev.status" :to="'/project/' + controls.prev.slug" class="control">
					<div><span class="highlight">←</span> Previous</div>
				</router-link>
				<router-link v-if="controls.next.status" 
					:to="'/project/' + controls.next.slug" class="control">
					<div>Next <span class="highlight">→</span></div>
				</router-link>
			</div>
			
		</div>
	</div>
</template>

<script>
	import Topbar from '@/components/Topbar';
	import DSGNRImage from '@/components/assets/Image'

	export default {
		name: 'Project',
		components: {
			Topbar,
			DSGNRImage,
		},
		watch: {
			'$route'(to, from) {
				this.slug = to.params.slug;
				this.controls.next.id = Number(to.params.id) + 1;
				this.controls.prev.id = Number(to.params.id) - 1;
				this.getProject();
				this.getSlugList();
			}
		},
		data() {
			return {
				slug: this.$route.params.slug,
				slugList: [],
				controls: {
					next: {
						id: Number(this.$route.params.id) + 1,
						slug: null,
						status: true,
						title: null
					},
					prev: {
						id: Number(this.$route.params.id) - 1,
						slug: null,
						status: true,
						title: null
					}
				},
				project: []
			}
		},
		methods: {
			getProject() {
				this.$http.get(this.$config.api._getImage(this.slug).url)
				.then(res => {
					this.project = res.data.data;
				})
				.catch(err => console.log('Request failed', err));
			},
			getSlugList() {
				this.$http.get(this.$config.api._getSlugs.url)
				.then(res => {
					this.slugList = res.data;
					this.controls.next.slug = this.slugList[this.slugList.indexOf(this.slug) + 1];
					this.controls.prev.slug = this.slugList[this.slugList.indexOf(this.slug) - 1];

					this.checkControls();
				})
				.catch(err => console.log('Slug List Request Failed', err));
			},
			checkProject(_slug, _ctrl) {
				fetch(this.$config.api._getImage(_slug).url)
				.then(res => {
					if (_ctrl === "next")
						this.controls.next.status = res.ok;
					else
						this.controls.prev.status = res.ok;

					if (res.status === 404) {
						throw new Error(res.statusText);
					}

					return res.json();
				})
				.then(res => {
					if (_ctrl === "next" && this.controls.next.status) {
						this.controls.next.title = res.data.title;
						this.controls.next.slug = res.data.slug;
					}
					if (_ctrl === "prev" && this.controls.prev.status) {
						this.controls.prev.title = res.data.title;
						this.controls.prev.slug = res.data.slug;
					}
				})
				.catch(err => console.log('Request failed:', err));
			},
			checkControls()
			{
				this.checkProject(this.controls.next.slug, "next");
				this.checkProject(this.controls.prev.slug, "prev");
			}
		},
		mounted() {
			this.$http.get(this.$config.api._getImage(this.slug).url)
			.then(res => {
				this.project = res.data.data;
			})
			.catch(err => console.log('Request failed', err));
			this.getSlugList();
		}
	}
</script>

<style scoped lang="scss">
.content {
}
.item {
	position: fixed;
	top: 50%;
	&:hover {
		cursor: pointer;
	}
	&.prev > * { writing-mode: vertical-lr; transform: rotate(-180deg); }
	&.next > * { writing-mode: vertical-rl; transform: rotate(0deg); }
}	
</style>