<template>
	<div class="home">
		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-sm-6 col-md-4 my-2" v-for="(item, index) in projects" :key="index">
					<div class="card h-100">
						<img :src="item.url | resize(300)" alt="" style="height: 200px; object-fit: cover;" class="card-img-top img-fluid">
						<div class="card-body d-flex flex-column justify-content-between">
							<p class="secondary-font">{{ item.title }}</p>
							<div class="mb-2">{{ item.content | stripHTML | truncate(30) }}</div>
							<div class="d-flex justify-content-between">
								<router-link class="btn btn-black" :to="{name: 'adminEditPost', params: {slug: item.slug}}">Edit Project</router-link>
								<router-link class="btn btn-black-text" :to="{name: 'adminDeletePost', params: {slug: item.slug}}"><i class="fas fa-trash"></i></router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'index',
  data() {
		return {
			toSend: null
		}
  },
  computed: {
	  ...mapGetters('user', {
		  projects: 'projects'
	  }),
  },
  methods: {
	  ...mapActions('portfolio', {
		  fetch: 'fetchPage'
	  }),
  },
}
</script>
