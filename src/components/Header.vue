<template>
	<div id="header" class="mb-4">
		<div class="container mb-4">
			<h1><span class="primary-font">Welcome to,</span><br/>DSNGRLab</h1>
		</div>
		<div class="vertical-line"></div>

		<div class="mouse-wrapper">
			<div class="mouse-scroll"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Header',
	}
</script>

<style lang="scss" scoped>
	#header {
		&:before {
			position: absolute;
			content: "";
			top: 0; right: 0; bottom: 0; left: 0;
			background: url('https://images.unsplash.com/photo-1459695452562-46cc57bef5f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1080&q=75') center fixed;
			background-size: cover;
			z-index: -1;
		}
		position: relative;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		background-color: rgba($dsgnr-black-color, .0);
		height: 100vh;

		color: $dsgnr-white-color;

		.vertical-line {
			height: 80px;
			width: 1px;
			background-color: $dsgnr-white-color;
		}


		.mouse-wrapper {
			position: absolute;
			bottom: 1.2rem;
			width: 20px;
			height: 35px;

			.mouse-scroll {
				position: relative;
				height: 35px;
				width: 20px;
				border-radius: 10px;
				border: 2px solid $dsgnr-light-color;
				&:after {
					position: absolute; content: "";
					height: 4px; width: 4px;
					background-color: $dsgnr-light-color;
					border-radius: 50%;
					bottom: 8px;
					left: 6px;
				}
			}
			
		}
	}
</style>