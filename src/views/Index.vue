<template>
    <div id="index" class="container ">
        <h1>Hello, and welcome back</h1>
        <div class="d-flex justify-content-start w-100 row">
            <router-link v-for="(user, index) in users" :key="index" :to="{name: 'home', params: {user: user.username}}" class="btn btn-primary px-3 m-2">/{{user.username}}</router-link>
            <router-link :to="{name: 'home', params: {user: 'hugo'}}" class="btn btn-primary px-3 m-2">/hugo (invalid)</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Index',
    data() {
        return {
            users: []
        }
    },
    created() {
        this.$http.get(this.$config.api._getUsers().url)
        .then((res) => {
            this.users = res.data.data;
        })
        .catch((err) => { console.error(err);})
    }
}
</script>

<style lang="scss" scoped>
#index {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>


