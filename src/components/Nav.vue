<template>
    <div>
        <nav v-if="this.$route.path !== '/login'">
            <router-link class="spacing"
                         v-for="routes in links"
                         v-bind:class="{navActive: setActiveMenu(routes.page)}"
                         v-bind:key="routes.id"
                         :to="`${routes.page}`">{{routes.text}}
            </router-link>

                <input class="find-prodlem-input" type="text" v-model="problemId"
                       placeholder="Номер задачи" v-on:keyup.enter="searchProblemById">
        </nav>
    </div>
</template>

<script>
    import {axiosConfig} from "../common/axios_common"
    import {
        PROBLEM_URL
    } from "@/constant/api";

    export default {
        name: 'Nav',
        data() {
            return {
                navActive: null,
                problemId: null,
                links: [
                    {
                        id: 0,
                        text: 'Задачи',
                        page:'/problem_search'
                    },
                    {
                        id: 1,
                        text: 'Заявки',
                        page:'/request_search'
                    }
                ]
            }
        },
        methods: {
            setActiveMenu(pathPage) {
                if (this.$route.path == pathPage)
                    return true
                else {
                    console.log(this.$route)
                    if (this.$route.name == 'problem' && pathPage == '/problem_search')
                        return  true
                    else
                        return false
                }
            },

            searchProblemById() {
                this.$http.get(PROBLEM_URL + '/' + this.problemId, axiosConfig)
                    .then(response => {
                        this.$router.push('/problem/'+this.problemId)
                        this.problemId = null
                    })
            }
        }
    }
</script>

<style>
    .navActive {
        background-color: #FFA011;
    }
    .spacing {
        color: #fff;
    }
    nav {
        background-color: #333;
        min-height: 34px;
    }
    nav a {
        padding: 14px 16px;
        text-decoration: none;
        display: inline-block;
    }
    .find-prodlem-input {
        float: right;
        margin-top: 6px;
        margin-right: 30px;
        min-width: 268px;
    }
</style>