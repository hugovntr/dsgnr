<template>
	<div class="sidemenu" @keyup.esc="close" tabindex="0">
		<div @click="open" style="height: 20px; width: 20px;" class="d-flex justify-content-center align-items-center">
			<span class="burger"></span>
		</div>

		<div class="menu p-0" :class="{open: isOpen}">
			<div class="d-flex justify-content-center flex-column align-items-end px-4" style="height: 60px;">
				<div @click="close" class="close-wrapper" style="height: 20px; width: 20px;">
					<span class="close" title="Esc. to close"></span>
				</div>
			</div>
			<ul>
				<router-link tag="li" @click.native="close" to="/blog">Blog</router-link>
				<router-link tag="li" @click.native="close" to="/admin">Admin</router-link>
				<router-link tag="li" @click.native="close" to="/portfolio">Portfolio</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Menu',
		data() {
			return {
				isOpen: false
			}
		},
		methods: {
			close() {
				this.isOpen = false;
			},
			open() {
				this.isOpen = true;
			}
		}
	}
</script>