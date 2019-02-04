<template>
	<div id="project">
		<div class="container-fluid">
			<Topbar :isAuthor="false" name="Hugo" date="13/12/2019"/>
			<div class="row px-3 px-sm-0">
				<div class="d-none d-sm-flex col-1 justify-content-center">
					<router-link v-if="controls.prev.status" :to="{name: 'project', params: {slug: controls.prev.slug}}" class="item prev control">
						<div>Previous — <span class="highlight">{{controls.prev.title}}</span></div>
					</router-link>
				</div>
				<div class="col-xs-12 col-sm-10 px-0 content">
					<div class="d-flex flex-column flex-sm-column flex-md-column flex-lg-row">
						<h1 class="d-flex d-lg-none">{{project.title}}</h1>
						<div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 px-0 pt-sm-4 pt-0 pb-sm-4 pb-0">
							<DSGNRImage :key="project.url" :lazy-src="project.url | resize(800)" v-if="project.url" />
						</div>
						<div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 px-0 px-lg-3">
							<h1 class="d-none d-lg-flex">{{project.title}}</h1>
							<div class="description" v-html="project.content">{{project.content}}</div>
						</div>
					</div>
				</div>
				<div class="d-none d-sm-flex col-1 justify-content-center">
					<router-link v-if="controls.next.status" 
					:to="{name: 'project', params: {slug: controls.next.slug}}" class="item next control">
						<div>Next — <span class="highlight">{{controls.next.title}}</span></div>
					</router-link>
				</div>
			</div>

			<div class="d-flex d-sm-none justify-content-around py-3">
				<router-link v-if="controls.prev.status" :to="{name: 'project', params: {slug: controls.prev.slug}}" class="control">
					<div><span class="highlight">←</span> Previous</div>
				</router-link>
				<router-link v-if="controls.next.status" :to="{name: 'project', params: {slug: controls.next.slug}}" class="control">
					<div>Next <span class="highlight">→</span></div>
				</router-link>
			</div>
			
		</div>
	</div>
</template>

<script>
	import Topbar from '@/components/Topbar';
	import DSGNRImage from '@/components/assets/Image'
	import { mapGetters } from 'vuex';

	export default {
		name: 'Project',
		components: {
			Topbar,
			DSGNRImage,
		},
		watch: {
			'$route'(to, from) {
				this.slug = to.params.slug;
				this.validateProject();
			}
		},
		data() {
			return {
				slug: this.$route.params.slug,
				controls: {
					next: {
						slug: null,
						status: false,
						title: null
					},
					prev: {
						slug: null,
						status: false,
						title: null
					}
				},
				project: []
			}
		},
		computed: {
			...mapGetters('user', {
				projectBySlug: 'projectBySlug',
				projectById: 'projectById',
				projects: 'projects',
			})
		},
		methods: {
			validateProject() {
				if (this.projectBySlug(this.slug)) {
					this.project = this.projectBySlug(this.slug);
					let prev = this.projectById(this.project.id - 1),
						next = this.projectById(this.project.id + 1);
	
					this.controls = {
						prev: {
							slug: (prev) ? prev.slug : null,
							title: (prev) ? prev.title : null,
							status: (prev) ? true : false,
						},
						next: {
							slug: (next) ? next.slug : null,
							title: (next) ? next.title : null,
							status: (next) ? true : false,
						}
					}
				}
				else {
					this.$router.back();
				}

			},
		},
		mounted() {
			this.validateProject();

			document.onkeydown = evt => {
		      evt = evt || window.event;
		      if (evt.keyCode == 37) {
				  if (this.controls.prev.slug)
		        	this.$router.push({name: 'project', params: {slug: this.controls.prev.slug}});
		      }
		      if (evt.keyCode == 39) {
				  if (this.controls.next.slug)
		      		this.$router.push({name: 'project', params: {slug: this.controls.next.slug}});
		      }

		      if (evt.keyCode == 76) { flash('You\'ve liked this project', 'like'); }
		    };
		}
	}
</script>

<style scoped lang="scss">
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