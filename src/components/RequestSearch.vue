<template>
    <div>
        <div>
            <table class="search-fields" v-on:click="activeClear">
                <tr>
                    <td>
                        <p>Тип источника</p>
                        <v-select multiple :reduce="st => st.sourceTypeName" label="sourceTypeName" :options="sources.options"
                                  v-model="sources.default"/>
                    </td>
                    <td>
                        <p>Статус</p>
                        <v-select multiple :reduce="st => st.statusCode" label="statusName" :options="statuses.options"
                                  v-model="statuses.default"/>
                    </td>
                    <td>
                        <p>Минимальное количество лайков</p>
                        <input type="number" class="" v-model="minLikeCount" min="0"/>
                    </td>
                    <td>
                        <p>Минимальное количество комментариев</p>
                        <input type="number" class="" v-model="minCommentCount" min="0"/>
                    </td>
                </tr>
            </table>

            <div>
                <button class="button-pr search mb" v-on:click="searchRequestByParams">
                    Поиск
                </button>
                <button class="button-pr cancel mb" :class="active" v-on:click="clearParams">
                    Очистить
                </button>
            </div>
        </div>

        <div>
            <p class="message" v-if="message != null" :class="colorMessage">{{message}}</p>
            <table class="listRequests">
                <thead>
                <tr>
                    <th>Тип источника</th>
                    <th>Статус</th>
                    <th>Количество лайков</th>
                    <th>Количество комментариев</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="lr in listRequests">
                        <td>{{ lr.source}}</td>
                        <td>{{ getStatusName(lr.status) }}</td>
                        <td>{{ lr.likeCount }}</td>
                        <td>{{ lr.commentCount }}</td>
                        <td>
                            <button class="button-pr create" v-on:click="show(lr.id)">
                                Создать
                            </button>
                            <button class="button-pr ignore" v-on:click="ignoreRequest(lr.id)">
                                Игнорировать
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <modal name="hello-world" @before-open="beforeOpen" >
                <h3>Создание задачи
                    <span class="closeModal" v-on:click="hide()"></span>
                </h3>
                <table>
                    <tr>
                        <td colspan="2">
                            <p>Название</p>
                            <input type="text" v-model="nameNewProblem"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Исполнитель</p>
                            <v-select :reduce="st => st.executorCode" label="executorName" :options="executor.options"
                                      v-model="executor.default"/>
                        </td>
                        <td>
                            <p>Статус</p>
                            <v-select :reduce="st => st.statusCode" label="statusName" :options="status.options"
                                      v-model="status.default"/>
                        </td>
                    </tr>
                    <tr>
                       <td colspan="2">
                           <p>Описание</p>
                           <vue-editor v-model="descriptionNewProblem"></vue-editor>
                       </td>
                    </tr>
                </table>
                <div>
                    <button class="button-pr create" v-on:click="createProblem">
                        Создать
                    </button>
                    <button class="button-pr cancel" v-on:click="hide()">
                        Отмена
                    </button>
                </div>
            </modal>
        </div>
    </div>
</template>

<script>
    import {axiosConfig} from "../common/axios_common"
    import { VueEditor } from 'vue2-editor'
    import {
        REQUEST_URL,
        USER_URL,
        PROBLEM_URL_WITHOUT_PREFIX
    } from "@/constant/api";

    export default {
        name: "Request_search",
        components: {
            VueEditor
        },
        data: function () {
            return {
                statuses: {
                    options: [
                        {statusCode: "NEW", statusName: "Новая"},
                        {statusCode: "IN_WORK", statusName: "В работе"},
                        {statusCode: "COMPLETED", statusName: "Выполнена"},
                        {statusCode: "IGNORED", statusName: "Проигнорирована"}
                    ],
                    default: [{statusCode: "NEW", statusName: "Новая"}]
                },
                sources: {
                    options: [
                        {sourceTypeCode: "VK", sourceTypeName: "VKontakte"},
                        {sourceTypeCode: "TWITTER", sourceTypeName: "twitter"},
                        {sourceTypeCode: "INSTAGRAM", sourceTypeName: "instagram"},
                    ],
                    default: null
                },
                minLikeCount: 0,
                minCommentCount: 0,
                listRequests: [],
                active: 'active',
                nameNewProblem: null,
                executor: {
                    options: [
                        { executorCode: "", executorName: "" }
                    ],
                    default: null
                },
                status: {
                    options: [
                        {statusCode: "CRITIQUE", statusName: "Критика"},
                        {statusCode: "MENTION", statusName: "Упоминание"},
                        {statusCode: "PRAISE", statusName: "Хвала"}
                    ],
                    default: null
                },
                descriptionNewProblem: null,
                requestId: null,
                message: null,
                colorMessage: null
            }
        },
        mounted() {
            this.$http.get(REQUEST_URL + '?' + 'statuses=' + (this.statuses.default.map(u => u.statusCode).join(',')), axiosConfig)
                .then(response => {
                    this.listRequests = response.data
                }),
            this.$http.get(USER_URL, axiosConfig)
                .then(response => {
                    for(var ex in response.data){
                        this.executor.options[ex].executorCode = response.data[ex].userId
                        this.executor.options[ex].executorName = response.data[ex].userName
                    }
                    this.executor.options.push({ executorCode: 0, executorName: "Не назначено"})
                })
        },
        methods: {
            beforeOpen (event) {
                this.requestId = event.params.id
            },

            searchRequestByParams(){
                this.$http.get(REQUEST_URL + '?' +
                    (this.statuses.default == null ? "" : ('statuses=' + this.statuses.default.map(u => u.statusCode).join(','))) +
                    (this.sources.default == null ? "" : ('&sources=' + this.sources.default.map(u => u.sourceTypeCode).join(','))) +
                    '&minLikeCount=' + this.minLikeCount + '&minCommentCount=' + this.minCommentCount, axiosConfig)
                    .then(response => {
                        this.listRequests = response.data
                    })
            },

            createProblem(){
                this.$http.post(PROBLEM_URL_WITHOUT_PREFIX, {
                    prefix: "pop",
                    name: this.nameNewProblem,
                    status: this.status.default.statusCode,
                    executorId: this.executor.default.executorCode == 0 ? null: this.executor.default.executorCode,
                    requestId: this.requestId,
                    description: this.descriptionNewProblem
                }, axiosConfig)
                    .then(response => {
                        this.hide()
                        this.requestId = null
                        this.message = "Задача создана успешно"
                        this.colorMessage = "green"
                    }).catch(error => {
                        this.hide()
                        this.requestId = null
                        this.message = "Задачу не удалось создать. Непредвиденная ошибка сервера"
                        this.colorMessage = "red"
                })
            },

            ignoreRequest(requestId) {
                this.$http.patch(REQUEST_URL + '/' + requestId, {
                }, axiosConfig)
                    .then(response => {
                        this.searchRequestByParams()
                    })
            },

            clearParams(){
                this.statuses.default = null
                this.sources.default = null
                this.minLikeCount = 0
                this.minCommentCount = 0
                this.active = ''
                this.$http.get(REQUEST_URL, axiosConfig)
                    .then(response => {
                        this.listRequests = response.data
                    })
            },

            getStatusName(statusValue) {
                for (var option in this.statuses.options) {
                    if (statusValue === this.statuses.options[option].statusCode) {
                        return this.statuses.options[option].statusName
                    }
                }
            },

            activeClear() {
                this.active = 'active'
            },

            show (el) {
                this.$modal.show('hello-world', {id: el});
            },
            hide () {
                this.$modal.hide('hello-world');
            }
        }
    }
</script>

<style>
    .mb {
        margin-bottom: 50px;
    }
    .search-fields td{
        width: 23% !important;
    }
    .listRequests {
        width: 95%;
        display: inline-table;
        float: left;
        margin: 10px 40px 100px 40px;
    }
    .listRequests th{
        background-color: #FFA011;
        color: #fff;
        text-align: center;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .listRequests td.ta-left{
        text-align: left;
    }
    .listRequests td{
        text-align: center;
    }
    .listRequests td a{
        color: #2c3e50;
        text-decoration: none;
    }
    .listRequests tr:hover{
        background-color: rgba(151, 185, 233, 0.2);
    }
    .search-fields td:nth-child(3) input,
    .search-fields td:nth-child(4) input{
        width: 94% !important;
    }
    .listRequests td:nth-child(5){
        width: 20%;
    }
    .create {
        background-image: linear-gradient(-180deg, #8EDCB9, #42b983 90%);
        background-color: #42b983;
    }
    .ignore {
        background-image: linear-gradient(-180deg,#FFB2B2,#FF7373 90%);
        background-color: #FF7373;
    }
    .create, .ignore {
        margin: 0 0 0 10px;
        min-width: 110px;
    }
    .v--modal-overlay .v--modal-box {
        display: block;
        padding: 20px;
        height: 100% !important;
        width: 50% !important;
        top: 0 !important;
        left: 0 !important;
        margin-top: 1% !important;
        margin-left: 50% !important;
        transform: translateY(-1%) !important;
        transform: translateX(-50%) !important;
    }
    .v--modal-box h3 {
        border-bottom: 1px solid #ddd;
        padding-bottom: 10px;
        margin-top: 0;
    }
    .v--modal-box .closeModal {
        float: right;
        margin-right: 10px;
        color: #ccc;
        cursor: pointer;
    }
    .closeModal:before{
        content: '\2716';
    }
    .v--modal-box table {
        width: 100%;
        float: none;
        margin: 0;
    }
    .v--modal-box table td input{
        width: 97%;
    }
    .v--modal-box table td {
        border: none;
        width: 50%;
    }
    .v--modal-box .quillWrapper {
        margin: 0;
        width: 100%;
    }
    .v--modal-box button.cancel,
    .v--modal-box button.create{
        margin: 10px 0 0 0;
    }
    .v--modal-box .cancel {
        margin-left: 10px !important;
    }
    .v--modal-box .ql-toolbar.ql-snow .ql-formats {
        margin-right: 0;
    }
    .message {
        width: 95%;
        margin: 0px 40px 10px 40px;
        padding: 10px 5px;
        display: inline-block;
        border-top: 2px solid #ccc;
        font-weight: 600;
    }
    .green{
        background-color: rgba(142,220,185,0.2);
    }
    .red {
        background-color: rgba(255,178,178,0.2);
    }
</style>