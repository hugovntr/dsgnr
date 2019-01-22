<template>
    <div class="paginate d-flex align-items-center py-3 container justify-content-between">
        <ul class="pagination mb-0">
            <li class="page-item controls first sm-font-size" v-if="controls" :class="{disabled: pagination.meta.current_page == 1}">
                <router-link :to="{name: name}" class="page-link">&xlarr; First</router-link>
            </li>
            <li v-for="index in pagination.meta.last_page" 
                :key="index" 
                class="page-item d-flex align-items-center" 
                :class="{disabled: index == pagination.meta.current_page, active: index == pagination.meta.current_page}">
                <router-link :to="{name: name, params: {page: index}}" tag="a" class="page-link dots"></router-link>
            </li>
            <li class="page-item controls last sm-font-size" v-if="controls" :class="{disabled: pagination.meta.current_page == pagination.meta.last_page}">
                <router-link :to="{name: name, params: {page: pagination.meta.last_page}}" class="page-link">Last &xrarr;</router-link>
            </li>
            <li class="pl-3 medium-font-weight" v-if="!controls">Page {{pagination.meta.current_page}}</li>
        </ul>
        <div class="stats xs-font-size medium-color">
            From {{pagination.meta.from}} to {{pagination.meta.to}} — {{pagination.meta.total}} items
        </div>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        pagination: {type: Object, default: {}},
        controls: {type: Boolean, default: false},
        name: {type: String, default: ""}
    },
    data() {
        return {

        }
    },
    mounted() {

    }
}
</script>
