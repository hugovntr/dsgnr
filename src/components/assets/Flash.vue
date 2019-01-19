<template>
	<div class="alert-wrap" v-if="notifications">
        <transition-group 
        	:name="transition"
        	enter-active-class="animated bounceInRight"
        	leave-active-class="animated bounceOutRight" 
        	tag="div"
        >
            <div :class="item.typeObject" role="alert" :key="index + 0" v-for="(item, index) in notifications" class="d-flex justify-content-between">
            	<div v-if="displayIcons" class="icon d-flex align-items-center justify-content-center p-3">
                	<i :class="item.iconObject"></i>
            	</div>
				<div class="content d-flex py-3 pr-3" :class="{'pl-3': !displayIcons}">
	                <span v-html="item.message" class="message"></span>
				</div>
				<div @click="hide" class="closable pt-1 pr-2">
					<i class="fas fa-times"></i>
				</div>
            </div>
        </transition-group>
    </div>
</template>

<script>
    export default {
        props: {
            timeout: {
                type: Number,
                default: 3000
            },
            transition: {
                type: String,
                default: 'custom-classes-transition'
            },
            types: {
                type: Object,
                default: () => ({
                    base:    'alert',
                    success: 'alert-success',
                    error:   'alert-danger',
                    warning: 'alert-warning',
                    info:    'alert-info',
                    like:    'alert-like'
                })
            },
            displayIcons: {
                type: Boolean,
                default: false
            },
            icons: {
                type: Object,
                default: () => ({
                    base:    'fas',
                    error:   'fa-exclamation-circle',
                    success: 'fa-check-circle',
                    info:    'fa-info-circle',
                    warning: 'fa-exclamation-circle',
                    like:    'fa-heart',
                })
            },
        },
        data() {
        	return {
        		notifications: []
        	}
        },
        created() {
        	// DEbug
        	// this.flash("You have succesfuly saved the internet from destruction", "success");
        	// this.flash("Please check your credentials and try again", "error");
        	// this.flash("This is some informational flash message, right ?", "info");
        	// this.flash("You have lost connection to the interwebs", "warning");
        	// this.flash("You liked this project", "like");
        	// END
            window.events.$on(
                'flash', (message, type) => {
                	this.flash(message, type);
                }
            );
        },
        methods: {
            flash(message, type) {
                this.notifications.push({
                    message: message,
                    type: type,
                    typeObject: this.classes(this.types, type),
                    iconObject: this.classes(this.icons, type)
                });
                setTimeout(this.hide, this.timeout);
            },
            classes(propObject, type) {
                let classes = {};
                if(propObject.hasOwnProperty('base')) {
                    classes[propObject.base] = true;
                }
                if (propObject.hasOwnProperty(type)) {
                    classes[propObject[type]] = true;
                }
                return classes;
            },
            hide(item = this.notifications[0]) {
                let key = this.notifications.indexOf(item);
                this.notifications.splice(key, 1);
            }
        },
    }
</script>

<style lang="scss" scoped>
	.alert-wrap {
        position: fixed;
        right: 25px;
        bottom: 25px;
        z-index:9999;
    }
    /**
     * Fade transition styles
     */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
        opacity: 0
    }
    /**
     * Bounce transition styles
     */
    .bounce-enter-active {
        animation: bounce-in .5s;
    }
    .bounce-leave-active {
        animation: bounce-in .5s reverse;
    }
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
    }
    /**
     * Slide transition styles
     */
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for <2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }
</style>