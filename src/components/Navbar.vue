<template>
	<div id="navbar" class="container-fluid px-4" :class="{absolute: absolute}">
		<img src="../../assets/img/logo.svg" class="img-fluid branding" alt="DSGNR.">
		<ul class="main">
			<router-link tag="li" class="px-2" :to="{name: 'home'}">Index</router-link>
	      	<router-link tag="li" class="px-2" :to="{name: 'about'}">About</router-link>
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

<style lang="scss">
#navbar {
	z-index: 2;
	display: flex;
	justify-content: space-between;
	align-items: center;

	min-height: 60px;
	margin-bottom: 1.2rem;

	&.absolute {
		position: absolute;
		top: 0; left: 0; right: 0;
		background: linear-gradient(to bottom, rgba($dsgnr-black-color, .0), rgba($dsgnr-black-color, 0));
		.sidemenu {
			.burger, .burger:after, .burger:before {background-color: $dsgnr-light-color;}
		}
		.main {
			li {
				color: $dsgnr-light-color;
			}
		}
	}

	.branding {
		max-height: 40px;
	}

	.main {
		display: flex;
		list-style-type: none;
		padding: 0;
		margin-bottom: 0px;
		li {
			color: $dsgnr-medium-color;
			font-weight: bold;
			@include transition(all $transition-duration);	
			&:hover {
				color: $dsgnr-dark-color;
				cursor: pointer;
			}
			&.router-link-exact-active {
				color: $dsgnr-primary-color;
			}
		}
	}

	.sidemenu {
		height: 60px;
		display: flex;
		align-items: center;
		
		&:focus {
			outline: none;
		}

		.burger {
			&:before, &:after {
				position: absolute;
				content: "";
				width: 20px;
				height: 2px;
				border-radius: 3px;
				background-color: $dsgnr-medium-color;
			}
			&:before {bottom: 5px;}
			&:after {top: 5px; width: 18px;}
			position: relative;
			width: 14px;
			height: 2px;
			border-radius: 2px;
			background-color: $dsgnr-medium-color;
			writing-mode: vertical-rl; // Easy trick
			@include transition(background-color $transition-duration $transition-property);

		}

		.menu {
			position: fixed;
			right: -100%;
			top: 0;
			height: 100%;
			width: 100%;
			background-color: $dsgnr-white-color;
			z-index: 9999;
			@include transition(right $transition-lg-duration);
			&.open {
				right: 0;
			}
			.close-wrapper {
				position: relative;
				&:hover {
					cursor: pointer;
					color: $dsgnr-black-color;
				}
				.close {
					&:before, &:after {
						position: absolute;
						content: "";
						width: 20px;
						height: 2px;
						border-radius: 2px;
						background-color: $dsgnr-dark-color;
					}
					&:before {transform: rotate(-45deg);}
					&:after {transform: rotate(45deg);}
					width: 20px;
					height: 20px;
					transform: translateY(50%);
				}
			}
			ul {
				display: flex;
				list-style: none;
				padding: 0;
				flex-flow: column;
				align-items: center;

				li {
					@extend h1;
					line-height: 1.4;
					font-family: $primary-font-family;
					// font-size: $h1-font-size;
					// @include breakpoint(xs) {font-size: $h1-xs-font-size;}
					font-weight: 700;
					color: $dsgnr-medium-color;
					@include transition(color $transition-duration);
					&:hover {
						cursor: pointer;
						color: $dsgnr-dark-color;
					}
				}
			}
		}
		&:hover {
			.burger {
				cursor: pointer;
				background-color: $dsgnr-dark-color;
				&:before, &:after {background-color: $dsgnr-dark-color;}
			}
		}
	}
}
</style>
