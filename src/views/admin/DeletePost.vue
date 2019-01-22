<template>
    <div class="container">
        <div class="row">
            <h2>Are you sure you want to delete {{ this.project.title }} ?</h2>
            <div class="card">
                <div class="card-body d-flex justify-content-between row">
                    <div class="d-block col-4">
                    <DSGNRImage 
                        :key="project.url" 
                        :lazy-src="project.url | resize(400)" 
                        v-if="project.url" />
                    </div>
                    <div class="d-flex flex-column col-8">
                        <p class="secondary-font lg-font-size">{{ this.project.title }}</p>
                        <p class="content">{{ this.project.content | stripHTML | truncate(150)  }}</p>
                        <div class="pt-3">
                            <router-link :to="{name: 'project', params: {slug: slug}}" tag="button" class="btn btn-primary-text px-0">View the project</router-link>
                        </div>
                    </div>
                </div>

                <div class="card-footer d-flex justify-content-end">
                    <button @click="$router.back()" class="btn btn-black-text mr-3">⟵&nbsp;&nbsp;No, take me back</button>
                    <button class="btn btn-primary">Yes</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import DSGNRImage from '@/components/assets/Image'

export default {
    name: "DeletePost",
    components: {
        DSGNRImage
    },
    data() {
        return {
            slug: this.$route.params.slug,
            project: {},
        }
    },
    watch: {
        '$route'(to, from) {
            this.slug = to.params.slug;
            this.getProject();
        }
    },
    methods: {
        getProject() {
            this.$http.get(this.$config.api._getImage(this.slug).url)
            .then(res => {
                this.project = res.data.data;
            })
            .catch(err => {
                console.log('Request failed', err);
                this.$router.back();
            });
        },
    },
    mounted() {
        this.getProject();
    }
}
</script>

