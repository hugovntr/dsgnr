import Vue from 'vue'
import Vuex from 'vuex'
import config from '@/config'
import * as _ from "lodash";

const conf = config.getConfig();

Vue.use(Vuex)

import portfolio from './stores/portfolio'
import user from './stores/user'

export default new Vuex.Store({
	modules: {
		portfolio: portfolio,
		user: user,
	}
})
