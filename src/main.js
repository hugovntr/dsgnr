import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import config from './config'

import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$config = config.getConfig();
Vue.prototype.$http = axios;

// Temporary Filter location
Vue.filter('stripHTML', function(value) {
	var div = document.createElement('div');
	div.innerHTML = value;
	var text = div.textContent || div.innerText || "";
	return text;
});
Vue.filter('truncate', function (text, length, clamp) {
	text = text || '';
	clamp = clamp || '...';
	length = length || 30;

	if (text.length <= length) return text;

	var tcText = text.slice(0, length - clamp.length);
	var last = tcText.length - 1;


	while (last > 0 && tcText[last] !== ' ' && tcText[last] !== clamp[0]) last -= 1;

	// Fix for case when text dont have any `space`
	last = last || length - clamp.length;

	tcText =  tcText.slice(0, last);

	return tcText + clamp;
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
