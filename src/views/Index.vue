<template>
    <div id="index" class="container">
        <h1>Hello, and welcome back</h1>
        <div class="d-flex justify-content-start">
            <router-link :to="{name: 'home', params: {user: 'hugo'}}" class="btn btn-primary px-3 mr-3">/Hugo</router-link>
            <router-link :to="{name: 'home', params: {user: 'invalid'}}" class="btn btn-primary px-3 mr-3">/Invalid</router-link>
            <router-link :to="{name: 'home', params: {user: 'blvcklngs'}}" class="btn btn-primary px-3">/BLVCKLNGS</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Index',
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


