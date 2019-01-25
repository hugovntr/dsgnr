import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from './config'
import * as _ from "lodash";

const conf = config.getConfig();

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		projects: [],
		projects_meta: {
			pages_count: 0,
			ppp: 0,
		}
	},
	getters: {
		getProjects: (state) => {
			return state.projects;
		},
		countProjects: (state) => {
			return state.projects.length;
		},
		getPagesCount: (state) => {
			return state.projects_meta.pages_count;
		},
		getProjectsPerPage: (state) => {
			return state.projects_meta.ppp;
		}
	},
	mutations: {
		ADD_PROJECT: (state, payload) => {
			state.projects.push(payload);
		},
		SET_PPP: (state, payload) => {
			state.projects_meta.ppp = payload;
		},
		FILL_PAGE: (state, payload) => {
			payload.forEach(el => {
				if (_.find(state.projects, function (o) { return o.slug == el.slug }) == undefined)
					state.projects.push(el);
			});
		},
		FILL_META: (state, payload) => {
			state.projects_meta.pages_count = payload.pages_count;
			state.projects_meta.ppp = payload.per_page;
		}
	},
	actions: {
		addProject: (context, project) => {
			context.commit('ADD_PROJECT', project);
		},
		setProjectsPerPage: (context, count = 10) => {
			context.commit('SET_PPP', count);
		},
		fetchPage({ commit, getters }, page = 1) {
			return new Promise((resolve, reject) => {
				if (page <= getters.getPagesCount || getters.getPagesCount == 0)
				{
					if (getters.countProjects == 0)
					{
						if (getters.getProjectsPerPage == 0) {commit('SET_PPP', 10);}
						
						axios.get(conf.api._getImages(page).pages)
							.then(res => {

								// Fill the projects Array
								commit('FILL_PAGE', res.data.data);

								/*
								  Fill the MetaData
								  - per_page (Projects per page): 10
								  - count (Projects count): return from getters.countProjects
								  - pages_count (Page Count): Math.floor(count / per_page)
								*/
								let per_page = getters.getProjectsPerPage;
								let count = getters.countProjects;
								let pages_count = Math.floor(count / per_page);

								commit('FILL_META', {
									per_page: per_page,
									pages_count: pages_count
								});
								resolve("Successfuly fetched projects");
							})
							.catch(err => reject(err));
					}
					else {
						resolve("Nothing to fetch");
					}
				}
				else {
					reject("Page does not exist");
				}
			});
		},
	}
})
