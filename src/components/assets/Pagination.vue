<template>
    <div class="paginate d-flex align-items-center py-3 container justify-content-between">
        <ul class="pagination mb-0">
            <li class="page-item controls first sm-font-size" v-if="controls" :class="{disabled: pagination.current_page == 1}">
                <router-link :to="{name: name}" class="page-link">&xlarr; First</router-link>
            </li>
            <li v-for="index in pagination.pages_count" 
                :key="index" 
                class="page-item d-flex align-items-center" 
                :class="{disabled: index == pagination.current_page, active: index == pagination.current_page}">
                <router-link :to="{name: name, params: {page: index}}" tag="a" class="page-link dots"></router-link>
            </li>
            <li class="page-item controls last sm-font-size" v-if="controls" :class="{disabled: pagination.current_page == pagination.pages_count}">
                <router-link :to="{name: name, params: {page: pagination.pages_count}}" class="page-link">Last &xrarr;</router-link>
            </li>
            <li class="pl-3 medium-font-weight" v-if="!controls">Page {{pagination.current_page}}</li>
        </ul>
        <div class="stats xs-font-size medium-color">
            From {{from}} to {{to}} — {{pagination.per_page}} items
        </div>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        pagination: {
            current_page: {type: Number, default: 1},
            pages_count: {type: Number, default: 1},
            per_page: {type: Number, default: 1},
        },
        controls: {type: Boolean, default: false},
        name: {type: String, default: ""}
    },
    computed: {
        from() {
            return this.pagination.per_page * (this.pagination.current_page - 1) + 1;
        },
        to() {
            return this.from + this.pagination.per_page - 1;
        }
    },
    watch: {
        pagination(to, from) {
            this.pagination.current_page = (to.current_page <= to.pages_count) ? to.current_page : to.pages_count;
            this.pagination.pages_count = to.pages_count;
            this.pagination.per_page = to.per_page;
        }
    },
    data() {
        return {

        }
    },
    mounted() {
        // console.log(this.pagination);
    }
}
</script>
