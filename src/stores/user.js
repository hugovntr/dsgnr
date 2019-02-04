import axios from 'axios'
import * as _ from 'lodash'
import config from '@/config'
const conf = config.getConfig();

export default {
    namespaced: true,
    state: {
        username: '',
        email: '',
        country: '',
        projects: [],
        projects_meta: {
            per_page: 0,
            pages_count: 0,
        }
    },
    getters: {
        username: (state) => { return state.username },
        projects: (state) => { return state.projects },
        projectsCount: (state) => { return state.projects.length },
        projectsByPage: (state) => (page = 1) => {
            let offset = state.projects_meta.per_page * (page - 1);
            return _.take(_.drop(state.projects, offset), state.projects_meta.per_page);
        },
        projectBySlug: (state) => (slug) => { return state.projects.find(project => project.slug == slug); },
        projectById: (state) => (id = 1) => { return state.projects.find(project => project.id === id); },
        projectsMeta: (state) => { return state.projects_meta },
    },
    mutations: {
        SET_USERNAME: (state, payload) => { state.username = payload },
        SET_EMAIL: (state, payload) => { state.email = payload },
        SET_COUNTRY: (state, payload) => { state.country = payload },
        SET_PROJECTS: (state, payload) => { state.projects = payload },
        SET_PROJECTS_PER_PAGE: (state, payload) => { 
            state.projects_meta.per_page = payload;
            state.projects_meta.pages_count = Math.ceil(state.projects.length / state.projects_meta.per_page);
        },

        EDIT_PROJECT: (state, payload) => {
            let _projects =  [
                ...state.projects.filter(el => el.slug !== payload.slug),
                payload.project
            ];
            state.projects = _projects.sort((a, b) => { return a.id - b.id });
        }
    },
    actions: {
        defineUser({ commit }, _uid) {
            return new Promise((resolve, reject) => {
                axios.get(conf.api._getSite(_uid).url)
                    .then((res) => {
                        let data = res.data.data;
                        commit('SET_USERNAME', data.user.username);
                        commit('SET_EMAIL', data.user.email);
                        commit('SET_COUNTRY', data.user.country);
                        commit('SET_PROJECTS', data.images);
                        commit('SET_PROJECTS_PER_PAGE', 10);
                        resolve();
                    })
                    .catch((err) => {
                        // Handle error
                        reject();
                    })
            })
        },
        editProject({ commit }, _payload) {
            commit('EDIT_PROJECT', {slug: _payload.slug, project: _payload.project});
        }
    }
}