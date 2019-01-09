<template>
	<div id="navbar" class="container-fluid px-4" :class="{absolute: absolute}">
		<img src="../../assets/img/logo.svg" class="img-fluid branding" alt="DSGNR.">
		<ul class="main">
			<router-link tag="li" class="px-2" to="/">Index</router-link>
	      	<router-link tag="li" class="px-2" to="/about">About</router-link>
		</ul>
		<Menu />
	</div>
</template>

<script>
	import Menu from '@/components/Menu'

	export default {
		name: 'Navbar',
		components: {
			Menu
		},
		props: {
			absolute: {
				type: Boolean,
				default: false
			}
		}
	}
</script>