<template>
    <div>
        <keep-alive>
            <component :is="component" :page="page" v-if="component" />
        </keep-alive>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: "hello"
        }
    },
    watch: {
        name: function(to, from) {
            this.loadComponent();
        }
    },
    data() {
        return {
            component: null,
            page: +this.$route.params.page,
        }
    },
    computed: {
        loader() {
            if (!this.name) { return null}
            return () => import(`@/components/${this.name}`)
        },
    },
    methods: {
        loadComponent() {
            this.loader()
            .then(() => {
                this.component = () => this.loader()
            })
            .catch(() => {
                this.component = null
            });
        }
    },
    mounted() {
        this.loadComponent();
    },
    beforeRouteUpdate (to, from, next) {
        this.page = +to.params.page;
        next();
    },

}
</script>
