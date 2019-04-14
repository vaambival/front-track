<template>
    <div>
        <nav>
            <router-link class="spacing" v-for="routes in links"

                         v-bind:key="routes.id"
                         :to="`${routes.page}`">{{routes.text}}</router-link>
        </nav>
    </div>
</template>

<script>
    export default {
        name: 'Nav',
        data() {
            return {
                links: [
                    {
                        id: 0,
                        text: 'Задачи',
                        page:'/Problem'
                    },
                    {
                        id: 1,
                        text: 'Заявки',
                        page:'/Request'
                    }
                ]
            }
        }
    }
</script>

<style>
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
        display: table-cell;
    }
    nav a:hover {
        background-color: #111;
    }
    nav a.router-link-active {
        background-color: #FFA011;
    }

</style>