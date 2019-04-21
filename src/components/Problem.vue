<template>
    <div>
        <p class="name_problem">{{ prefix}} - {{ id }} {{ name }}</p>
        <div style="min-height: 250px">
            <table class="table1">
                <tr>
                    <td>Источник</td>
                    <td>{{ sourceType }}</td>
                </tr>
                <tr>
                    <td>Дата создания</td>
                    <td>{{ createdDate }}</td>
                </tr>
                <tr>
                    <td>Автор</td>
                    <td>{{ userName }}</td>
                </tr>
            </table>

            <table class="table2">
                <tr>
                    <td>Статус</td>
                    <td>
                        <v-select :reduce="st => st.statusCode" label="statusName" :options="status.options" v-model="status.default" v-on:change="updateStatus"/>
                    </td>
                </tr>
                <tr>
                    <td>Исполнитель</td>
                    <td>
                        <v-select :reduce="st => st.executorCode" label="executorName" :options="executor.options" v-model="executor.default" v-on:change="updateExecutor"/>
                    </td>
                </tr>
                <tr>
                    <td>Ссылка</td>
                    <td style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 0;">
                        <a href="https://forum.vuejs.org/t/how-do-i-make-an-html-tag-inside-a-data-string-render-as-an-html-tag/13074/4">
                            https://forum.vuejs.org/t/how-do-i-make-an-html-tag-inside-a-data-string-render-as-an-html-tag/13074/4</a>
                    </td>
                </tr>
            </table>
        </div>

        <vue-editor v-show="displayEditor" v-model="content"></vue-editor>
        <div v-show="displayText" class="discription" v-html="content" v-on:click="onVisible"></div>

    </div>
</template>

<script>
    import {axiosConfig} from "../common/axios_common";
    import { VueEditor } from 'vue2-editor'
    import {
        USER_URL,
        PROBLEM_URL
    } from "@/constant/api";

    export default {
        name: "Problem",
        components: {
            VueEditor
        },
        data() {
            return {
                content: '<h1>Some initial content</h1>',
                prefix: "",
                id: 0,
                name: "",
                sourceType: "",
                createdDate: null,
                userName: "",
                status: {
                    options: [
                        {statusCode: "CRITIQUE", statusName: "Критика"},
                        {statusCode: "MENTION", statusName: "Упоминание"},
                        {statusCode: "PRAISE", statusName: "Хвала"}
                    ],
                    default: ""
                },
                executor: {
                    options: [
                        {executorCode: "", executorName: ""}
                    ],
                    default: ""
                },
                description: "",
                displayEditor: false,
                displayText: true
            }
        },
        mounted() {
            this.$http.get(PROBLEM_URL + '/pop/3', axiosConfig)
                .then(response => {
                    //console.log(response)
                    this.prefix = response.data.prefix
                    this.id = response.data.id
                    this.name = response.data.name
                    this.sourceType = response.data.sourceType
                    this.status.default = this.getStatusName(response.data.status)
                    this.createdDate = response.data.createdDate
                    this.userName= response.data.author.userName

                    var executor = response.data.executor
                    if (executor == null) {
                        this.executor.default = 'Не назначено'
                    } else {
                        this.executor.default = response.data.executor.userName
                    }

                    this.description = response.data.description
                }),
                this.$http.get(USER_URL, axiosConfig)
                    .then(response => {
                        console.log(response.data[0].userId)
                        for(var ex in response.data){
                            console.log(response.data[ex].userId)
                            this.executor.options[ex].executorCode = response.data[ex].userId
                            this.executor.options[ex].executorName = response.data[ex].userName
                        }
                        this.executor.options[ex].executorCode = response.data[ex].userId
                })
        },
        methods: {
            getStatusName(statusValue) {
                for (var option in this.status.options) {
                    if (statusValue === this.status.options[option].statusCode) {
                        return this.status.options[option].statusName
                    }
                }
            },

            updateStatus() {
                if (this.status.default.statusCode != null) {
                    this.$http.patch(PROBLEM_URL + '/pop/3', {
                        status: this.status.default.statusCode
                    }, axiosConfig)
                        .then(response => {
                            //console.log(response);
                        })
                }
            },

            updateExecutor() {
                if (this.executor.default.executorCode != null) {
                    this.$http.patch(PROBLEM_URL + '/pop/3', {
                        executor: this.executor.default.executorCode
                    }, axiosConfig)
                        .then(response => {
                            //console.log(response);
                        })
                }
            },

            onVisible(){
                this.displayEditor = true
                this.displayText = false
            }

        }
    }
</script>

<style scoped>
    .name_problem {
        display: block;
        text-align: left;
        margin: 20px 30px 40px;
        border-top: 2px solid #ccc;
        padding: 15px;
        background-color: rgba(106,166,223,0.1);
    }
    table {
        width: 30%;
        display: inline-table;
        float: left;
        margin: 0 40px;
    }
    td {
        text-align: left;
        border-bottom: 1px solid #ddd;
    }
    tr {
        height: 50px;

    }
    td:nth-child(1){
        min-width: 200px;
    }
    td:nth-child(2){
        min-width: 300px;
    }
    .quillWrapper {
        float: left;
        margin: 0 40px 0 40px;
        width: 95%;
        background: #fff;
    }
    .discription{
        margin: 0 40px 0 40px;
        border: 1px #ccc solid;
        min-height: 200px;
        background: #fff;
        padding: 20px 30px;
    }
    .discription:hover {
        background: rgba(170, 205, 239, 0.1);
    }
</style>