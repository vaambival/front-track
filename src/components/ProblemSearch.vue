<template>
    <div id="problem-search">
        <div class="search-bar">
            <table class="search-fields" v-on:click="activeClear">
                    <tr>
                        <td>
                            <p>Название</p>
                            <input type="text" class="" v-model="nameProblem"/>
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
                            <v-select multiple :reduce="st => st.sourceTypeName" label="sourceTypeName" :options="sourceType.options"
                                      v-model="sourceType.default"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Дата создания</p>
                            <datepicker input-class="date-picker" :language="options.language" placeholder="От"
                                        class="dt_from" v-model="from" :format="customFormatter"/>
                            <datepicker input-class="date-picker" :language="options.language" placeholder="До"
                                        class="dt_to" v-model="to" :format="customFormatter"/>
                        </td>
                        <td>
                            <p>Статус</p>
                            <v-select multiple :reduce="st => st.statusCode" label="statusName" :options="status.options"
                                      v-model="status.default"/>
                        </td>
                        <td>
                            <p>Этап</p>
                            <v-select multiple :reduce="st => st.stageName" label="stageName" :options="stage.options"
                                      v-model="stage.default"/>
                        </td>
                    </tr>
                </table>

            <div>
                <button class="button-pr search" v-on:click="searchPromlemsByParams">
                    Поиск
                </button>
                <button class="button-pr cancel" :class="active" v-on:click="clearParams">
                    Очистить
                </button>
                <button class="button-pr cancel" v-on:click="test">
                    test
                </button>
            </div>
        </div>

        <div class="problems">
            <table class="listProblems">
                <thead>
                    <tr>
                        <th>Номер</th>
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
                        <td><router-link :to="`/problem/${lp.id}`">pop-{{ lp.id }}</router-link></td>
                        <td class="ta-left">
                            <router-link :to="`/problem/${lp.id}`">{{ lp.name }}</router-link>
                        </td>
                        <td>{{ lp.author == null ? null : lp.author.userName }}</td>
                        <td>{{ lp.executor == null ? null : lp.executor.userName }}</td>
                        <td>{{ lp.sourceType }}</td>
                        <td>{{ lp.createdDate }}</td>
                        <td>{{ getStatusName(lp.status) }}</td>
                        <td>{{ getStageName(lp.stage) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker'
    import ru from 'vuejs-datepicker/src/locale/translations/ru'
    import {axiosConfig} from "../common/axios_common"
    import moment from 'moment'

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
                nameProblem: "",
                author: {
                    options: [
                        { authorCode: "", authorName: "" }
                    ],
                    default: null
                },
                executor: {
                    options: [
                        { executorCode: "", executorName: "" }
                    ],
                    default: null
                },
                from: null,
                to: null,
                status: {
                    options: [
                        {statusCode: "CRITIQUE", statusName: "Критика"},
                        {statusCode: "MENTION", statusName: "Упоминание"},
                        {statusCode: "PRAISE", statusName: "Хвала"}
                    ],
                    default: null
                },
                stage: {
                    options: [
                        {stageCode: "QUEUE", stageName: "В очереди"},
                        {stageCode: "IN_WORK", stageName: "В работе"},
                        {stageCode: "ON_ACCEPTANCE", stageName: "На приемке"},
                        {stageCode: "COMPLETED", stageName: "Завершена"}
                    ],
                    default: null
                },
                sourceType: {
                    options: [
                        {sourceTypeCode: "VK", sourceTypeName: "VKontakte"},
                        {sourceTypeCode: "TWITTER", sourceTypeName: "twitter"},
                        {sourceTypeCode: "i", sourceTypeName: "instagram"},
                    ],
                    default: null
                },
                listProblem: [],
                active: ""
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
                    }),
                this.$http.get(PROBLEM_URL_WITHOUT_PREFIX, axiosConfig)
                    .then(response => {
                        this.listProblem = response.data
                    })
        },
        methods: {
            customFormatter(date) {
                return moment(date).format('DD.MM.YYYY');
            },

            searchPromlemsByParams(){
                console.log(this.sourceType.default.map(u => u.sourceTypeCode).join(','))
                this.$http.get(PROBLEM_URL_WITHOUT_PREFIX + '?' + (this.nameProblem == "" ? "" : ('name='+this.nameProblem))
                    + (this.author.default == null ? "" : ('&authorId=' + this.author.default.authorCode))
                    + (this.executor.default == null ? "" : ('&executorId=' + this.executor.default.executorCode))
                    + (this.sourceType.default == null ? "" : ('&sourceType=' + this.sourceType.default.map(u => u.sourceTypeCode).join(',')))
                    + (this.status.default == null ? "" : ('&status=' + this.status.default.map(u => u.statusCode).join(',')))
                    + (this.stage.default == null ? "" : ('&stage=' + this.stage.default.map(u => u.stageCode).join(',')))
                    + (this.from == null ? "" : ('&after=' + moment(this.from).format('DD.MM.YYYY')))
                    + (this.to == null ? "" : ('&before=' + moment(this.to).format('DD.MM.YYYY'))),
                    axiosConfig)
                    .then(response => {
                        this.listProblem = response.data
                    })
            },

            clearParams(){
                this.active = ''
                this.nameProblem = ""
                this.author.default = null
                this.executor.default = null
                this.from = null
                this.to = null
                this.status.default = null
                this.stage.default = null
                this.sourceType.default = null
                this.$http.get(PROBLEM_URL_WITHOUT_PREFIX, axiosConfig)
                    .then(response => {
                        this.listProblem = response.data
                    })
            },

            test() {
                this.$http.post(PROBLEM_URL_WITHOUT_PREFIX, {
                    prefix: "pop",
                    name: "Simply",
                    createdDate: "2010-10-31T01:30:00.000",
                    authorId: 101,
                    status: "MENTION",
                    executorId: 101,
                    requestId: 3,
                    description: "Simply set moment as the filtering function and you're good to go. At least one argument is expected, which the filter assumes to be a format string if the argument doesn't match any of the other filtering methods."}, axiosConfig)
                    .then(response => {
                       // this.listProblem = response.data
                    })
            },

            getStatusName(statusValue) {
                for (var option in this.status.options) {
                    if (statusValue === this.status.options[option].statusCode) {
                        return this.status.options[option].statusName
                    }
                }
            },

            getStageName(stageValue) {
                for (var option in this.stage.options) {
                    if (stageValue === this.stage.options[option].stageCode) {
                        return this.stage.options[option].stageName
                    }
                }
            },

            activeClear() {
                this.active = 'active'
            }
        }
    }
</script>

<style>
    .active {
        background-image: linear-gradient(-180deg,#FFB2B2,#FF7373 90%);
        background-color: #FF7373;
    }
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
        margin-bottom: 100px;
    }
    .listProblems td:nth-child(2) {
        width: 20%;
        word-break: break-word;
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
    .listProblems td a{
        color: #2c3e50;
        text-decoration: none;
    }
    .listProblems tr:hover{
        background-color: #97B9E9;
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
    .search {
        background-image: linear-gradient(-180deg, #97B9E9, #4C85D3 90%);
        border-color: #4C85D3;
    }
</style>