<template>
    <div id="problem-search">
        <div class="search-bar">
            <table class="search-fields">
                    <tr>
                        <td>
                            <p>Название</p>
                            <input type="text" class=""/>
                        </td>
                        <td>
                            <p>Автор</p>
                            <v-select :reduce="st => st.authorCode" label="authorName" :options="author.options"
                                      v-model="author.default"/>
                        </td>
                        <td>
                            <p>Исполнитель</p>
                            <v-select :reduce="st => st.executorCode" label="executorName" :options="executor.options"
                                      v-model="executor.default"/>
                        </td>
                        <td>
                            <p>Тип источника</p>
                            <v-select :reduce="st => st.sourceTypeName" label="sourceTypeName" :options="sourceType.options"
                                      v-model="sourceType.default"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Дата создания</p>
                            <datepicker input-class="date-picker" :language="options.language" placeholder="От" class="dt_from"/>
                            <datepicker input-class="date-picker" :language="options.language" placeholder="До" class="dt_to"/>
                        </td>
                        <td>
                            <p>Статус</p>
                            <v-select :reduce="st => st.statusCode" label="statusName" :options="status.options"
                                      v-model="status.default"/>
                        </td>
                        <td>
                            <p>Этап</p>
                            <v-select :reduce="st => st.stageName" label="stageName" :options="stage.options"
                                      v-model="stage.default"/>
                        </td>
                    </tr>
                </table>
        </div>

        <div class="problems">
            <table class="listProblems">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Автор</th>
                        <th>Исполнитель</th>
                        <th>Тип источника</th>
                        <th>Дата создания</th>
                        <th>Статус</th>
                        <th>Этап</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="lp in listProblem">
                        <td class="ta-left">{{ lp.name }}</td>
                        <td>{{ lp.author == null ? null : lp.author.userName }}</td>
                        <td>{{ lp.executor == null ? null : lp.executor.userName }}</td>
                        <td>{{ lp.sourceType }}</td>
                        <td>{{ lp.createdDate }}</td>
                        <td>{{ lp.status }}</td>
                        <td>{{ lp.stage }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker'
    import ru from 'vuejs-datepicker/src/locale/translations/ru'
    import {axiosConfig} from "../common/axios_common";

    import {
        PROBLEM_URL_WITHOUT_PREFIX,
        USER_URL
    } from "@/constant/api";

    export default {
        name: "ProblemSearch",
        components: {
            Datepicker
        },

        data: function () {
            return {
                options: {
                    language: ru
                },
                author: {
                    options: [
                        { authorCode: "", authorName: "" }
                    ],
                    default: ""
                },
                executor: {
                    options: [
                        { executorCode: "", executorName: "" }
                    ],
                    default: ""
                },
                status: {
                    options: [
                        {statusCode: "CRITIQUE", statusName: "Критика"},
                        {statusCode: "MENTION", statusName: "Упоминание"},
                        {statusCode: "PRAISE", statusName: "Хвала"}
                    ],
                    default: ""
                },
                stage: {
                    options: [
                        {stageCode: "QUEUE", stageName: "В очереди"},
                        {stageCode: "IN_WORK", stageName: "В работе"},
                        {stageCode: "ON_ACCEPTANCE", stageName: "На приемке"},
                        {stageCode: "COMPLETED", stageName: "Завершена"}
                    ],
                    default: ""
                },
                sourceType: {
                    options: [
                        {sourceTypeCode: "vk", sourceTypeName: "VKontakte"},
                        {sourceTypeCode: "tw", sourceTypeName: "twitter"},
                        {sourceTypeCode: "i", sourceTypeName: "instagram"},
                    ],
                    default: ""
                },
                listProblem: []
            }
        },
        mounted() {
                this.$http.get(USER_URL, axiosConfig)
                    .then(response => {
                        for(var ex in response.data){
                            this.executor.options[ex].executorCode = response.data[ex].userId
                            this.executor.options[ex].executorName = response.data[ex].userName

                            this.author.options[ex].authorCode = response.data[ex].userId
                            this.author.options[ex].authorName = response.data[ex].userName
                        }
                        this.executor.options.push({ executorCode: 0, executorName: "Не назначено"})
                        this.executor.default = { executorCode: 0, executorName: "Не назначено"}

                        //this.author.options.push({ authorCode: 0, authorName: "Не назначено"})
                        //this.author.default = { authorCode: 0, authorName: "Не назначено"}
                    }),
                this.$http.get(PROBLEM_URL_WITHOUT_PREFIX, axiosConfig)
                    .then(response => {
                        this.listProblem = response.data
                        console.log(response.data)
                    })
        }
    }
</script>

<style>
    .v-select{
        background-color: #fff;
    }
    .search-fields, .listProblems {
        width: 95%;
        display: inline-table;
        float: left;
        margin: 30px 40px 0 40px;
    }
    .listProblems{
        margin-top: 50px;
    }
    .listProblems th{
        background-color: #FFA011;
        color: #fff;
        text-align: center;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .listProblems td.ta-left{
        text-align: left;
    }
    .listProblems td{
        text-align: center;
    }
    .search-fields td{
        text-align: left;
        padding: 0 20px;
        border: none;
    }
    .search-fields td:nth-child(1){
        width: 35%;
        padding-left: 0;
    }
    .search-fields td:nth-child(2),
    .search-fields td:nth-child(3),
    .search-fields td:nth-child(4)
    {
        width: 21%;
    }
    .search-fields td:nth-child(4){
        padding-right: 0;
    }
    .search-fields p {
        margin-bottom: 5px;
    }
    td input {
        width: 100%;
    }
    .date-picker{
        min-width: 200px;
        width: 100%;
    }
    .dt_from {
        float: left;
    }
    .dt_to {
        float: right;
        margin-right: -20px;
    }
    .dt_from, .dt_to {
        width: 49%;
    }
</style>