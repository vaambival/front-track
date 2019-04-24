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
        <div>
            <vue-editor v-show="displayEditor" v-model="description"></vue-editor>
            <div v-show="displayText" class="discription" v-html="description" v-on:click="onVisible"></div>
            <div v-show="displayEditor">
                <button class="button-pr save" type="submit" @click="saveClick">
                    Сохранить
                </button>
                <button class="button-pr cancel" type="submit" @click="cancelClick">
                    Отмена
                </button>
            </div>
        </div>

        <div class="tabs-component">
            <ul role="tablist" class="tabs-component-tabs">
                <li class="tabs-component-tab" :class="{'is-active' : tabActive == true}" v-on:click="tabIsActive('first-tab')">
                    <a class="tabs-component-tab-a">Комментарии</a>
                </li>
                <li class="tabs-component-tab" :class="{'is-active' : tabActive == false}" v-on:click="tabIsActive('second-tab')">
                    <a class="tabs-component-tab-a">История изменений</a>
                </li>
            </ul>
            <div class="tabs-component-panels">
                <section class="tabs-component-panel" v-show="tabActive">
                    <div v-for="item in comment">
                        <img src="../assets/user.png" class="userImg">
                        <h5 class="page-subtitle">{{ item.author.userName }} <span> {{ item.created }}</span></h5>
                        <p>{{item.text}}</p>
                    </div>
                </section>
                <section class="tabs-component-panel" v-show="!tabActive">
                    <h2 class="page-subtitle">Second tab</h2>
                        This is the content of the second tab.
                </section>
            </div>
        </div>

        <div>
            <vue-editor id="commentEditor" v-show="displayCommentEditor" v-model="newComment"></vue-editor>
            <div class="add_comment" v-show="!displayCommentEditor" v-html="newComment" v-on:click="onVisibleComment"></div>
            <div v-show="displayCommentEditor">
                <button class="button-pr save" type="submit" @click="saveCommentClick">
                    Сохранить
                </button>
                <button class="button-pr cancel" type="submit" @click="cancelCommentClick">
                    Отмена
                </button>
            </div>
        </div>

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
                constNewComment: "Добавить комментарий...",
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
                tempDescription: "",
                displayEditor: false,
                displayText: true,
                tabActive: true,
                comment: [],
                newComment: "Добавить комментарий...",
                displayCommentEditor: false
            }
        },
        mounted() {
            this.$http.get(PROBLEM_URL + '/3', axiosConfig)
                .then(response => {
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
                    this.comment = response.data.comments

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
                    this.$http.patch(PROBLEM_URL + '/3', {
                        status: this.status.default.statusCode
                    }, axiosConfig)
                        .then(response => {
                        })
                }
            },

            updateExecutor() {
                if (this.executor.default.executorCode != null) {
                    this.$http.patch(PROBLEM_URL + '/3', {
                        executor: this.executor.default.executorCode
                    }, axiosConfig)
                        .then(response => {
                        })
                }
            },

            onVisible(){
                this.displayEditor = true
                this.displayText = false
                this.tempDescription = this.description
            },

            saveClick(){
                var discriptionHtml = new DOMParser().parseFromString(this.description, 'text/html');
                this.$http.patch(PROBLEM_URL + '/3', {
                    description: discriptionHtml.body.textContent
                }, axiosConfig)
                    .then(response => {
                })
                this.displayEditor = false
                this.displayText = true
            },

            cancelClick(){
                this.displayEditor = false
                this.displayText = true
                this.description = this.tempDescription
            },

            tabIsActive(el){
                if (el == 'first-tab') {
                    this.tabActive = true
                }
                else {
                    this.tabActive = false
                }
            },

            onVisibleComment(){
                this.displayCommentEditor = true
                this.newComment = ""
            },

            saveCommentClick(){
                var commentHtml = new DOMParser().parseFromString(this.newComment, 'text/html');
                this.$http.post(PROBLEM_URL + '/3/comment', {
                    text: commentHtml.body.textContent
                }, axiosConfig)
                    .then(response => {
                        console.log(response)
                        this.comment = response.data
                    })
                this.displayCommentEditor = false
                this.newComment = this.constNewComment
            },

            cancelCommentClick(){
                this.displayCommentEditor = false
                this.newComment = this.constNewComment
            }
        }
    }
</script>

<style>
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
        min-height: 200px;
        background: #fff;
        padding: 20px 30px;
        border: solid 1px #ddd;
        border-radius: 6px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .05);
    }
    .discription:hover {
        background: rgba(170, 205, 239, 0.05);
    }
    .button-pr{
        width: auto;
        min-width: 150px;
        float: left;
        margin-top: 20px;
        margin-left: 40px;
        cursor: pointer;
    }
    .cancel{
        background-color: #d1d5da;
        background-image: linear-gradient(-180deg,#dddddd,#9EA1A3 90%);
    }

    .tabs-component {
        margin: 0em 0 1em 0;
        position: relative;
        display: inline-block;
        width: 100%;
    }
    .tabs-component-tabs {
        border: 0;
        align-items: stretch;
        display: flex;
        justify-content: flex-start;
        margin-bottom: -1px;
        border-radius: 6px;
    }
    .tabs-component-tab {
        background-color: #fff;
        border: solid 1px #ddd;
        border-radius: 3px 3px 0 0;
        margin-right: .5em;
        transform: translateY(2px);
        transition: transform .3s ease;
        color: #999;
        font-size: 14px;
        font-weight: 600;
        list-style: none;
        cursor: pointer;
    }

    .tabs-component-tab-a {
        align-items: center;
        color: inherit;
        display: flex;
        padding: .75em 1em;
        text-decoration: none;
    }
    .tabs-component-panels {
        background-color: #fff;
        border: solid 1px #ddd;
        border-radius: 0 6px 6px 6px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .05);
        padding: 2em;
        margin: 0 40px;
        position: relative;
        min-height: 200px;
        max-height: 350px;
        overflow: auto;
    }
    .tabs-component-panels div{
        margin: 10px 0;
    }
    .tabs-component-panels div:not(:last-child){
        border-bottom: 1px solid #ddd;
    }
    .tabs-component-tab.is-active {
        border-bottom: solid 1px #fff;
        z-index: 2;
        transform: translateY(0);
        color: #000;
    }
    .userImg {
        height: 40px;
        width: 40px;
        display: inline-block;
        float: left;
    }
    .page-subtitle {
        display: inline-block;
        margin: 15px 20px
    }
    .page-subtitle span {
        color: #ccc;
        padding-left: 30px;
    }
    .add_comment{
        margin: 0 40px 40px 40px;
        min-height: 40px;
        background: #fff;
        padding: 20px 30px;
        border: solid 1px #ddd;
        border-radius: 6px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .05);
        color: #dddddd;
    }
    .add_comment:hover {
        background: rgba(170, 205, 239, 0.05);
    }
    #commentEditor{
        height: 80px;
    }
    .quillWrapper {
        border-radius: 0 0 6px 6px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .05);
    }
</style>