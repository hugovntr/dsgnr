<template>
	<div id="home">
		<Header/>
		<Portfolio :title="true"/>
 		<Blog :title="true"/>
	</div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header'
import Portfolio from '@/components/Portfolio'
import Blog from '@/components/Blog'

export default {
	name: 'home',
	components: {
		Header,
		Portfolio,
		Blog
	}
}
</script>
