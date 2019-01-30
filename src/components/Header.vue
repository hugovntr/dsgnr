<template>
	<div id="header" class="mb-4">
		<div class="vertical-line hidden"/>
		<div class="container mb-4">
			<h1><span class="primary-font bold-font-weight">Welcome to,</span><br/>DSNGRLab</h1>
		</div>
		<div class="vertical-line"/>

		<div class="mouse-wrapper mt-4 mb-4">
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
			background: url('https://images.unsplash.com/photo-1531736275454-adc48d079ce9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80') center fixed;
			background-size: cover;
			z-index: -1;
		}
		position: relative;
		display: flex;
		flex-flow: column;
		justify-content: space-between;
		@include breakpoint(xs) {justify-content: center;}
		align-items: center;
		background-color: rgba($dsgnr-black-color, .0);
		height: 100vh;

		color: $dsgnr-white-color;

		.vertical-line {
			@include breakpoint(xs) {display: none;}
			height: 100%;
			width: 1px;
			background-color: $dsgnr-white-color;
			&.hidden {width: 0px; margin-top: 83px;}
		}


		.mouse-wrapper {
			@include breakpoint(xs) {display: none;}
			width: 20px;
			height: 35px;

			.mouse-scroll {
				position: relative;
				height: 35px;
				width: 20px;
				border-radius: 10px;
				border: 2px solid $dsgnr-white-color;
				&:after {
					position: absolute; content: "";
					height: 4px; width: 4px;
					background-color: $dsgnr-white-color;
					border-radius: 50%;
					bottom: 8px;
					left: 6px;
				}
			}
			
		}
	}
</style>