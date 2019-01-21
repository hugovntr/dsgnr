<template>
	<div class="home">
		<div class="container">
			<div class="row">
				<div class="col-sm-4 my-2" v-for="item in items">
					<div class="card h-100">
						<img :src="item.url | resize(300)" alt="" style="height: 200px; object-fit: cover;" class="card-img-top img-fluid">
						<div class="card-body d-flex flex-column justify-content-between">
							<p class="secondary-font">{{ item.title }}</p>
							<div class="mb-2">{{ item.content | stripHTML | truncate(30) }}</div>
							<div class="d-flex justify-content-between">
								<router-link class="btn" :to="{name: 'adminEditPost', params: {slug: item.slug}}">Edit Project</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<router-view/>
			</div>

			<!-- <div class="row">
				<editor :item="toSend"/>
			</div> -->

		</div>
	</div>
</template>

<script>
import Editor from '@/components/assets/Editor'

export default {
  name: 'index',
  components: {
	Editor,
  },
  data() {
	return {
		items: [],
	  toSend: null
	}
  },
  created() {
	this.$http.get(this.$config.api._getImages.url)
	.then(res => {
		this.items = res.data.data;
	})
	.catch(err => console.log('Request failed', err));
  }
}
</script>
