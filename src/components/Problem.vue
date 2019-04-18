<template>
    <div>
        <p class="name_problem">{{ prefix}} - {{ id }} {{ name }}</p>
        <div>
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
                    <td>text</td>
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
    </div>
</template>

<script>
    import {axiosConfig} from "../common/axios_common";
    import {
        PROBLEM_URL
    } from "@/constant/api";

    export default {
        name: "Problem",
        data() {
            return {
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
                }
            }
        },
        mounted() {
            this.$http.get(PROBLEM_URL + '/pop/1', axiosConfig)
                .then(response => {
                    this.prefix = response.data.prefix
                    this.id = response.data.id
                    this.name = response.data.name
                    this.sourceType = response.data.sourceType
                    this.status.default = this.getStatusName(response.data.status)
                    this.createdDate = response.data.createdDate
                    this.userName= response.data.author.userName
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
                    console.log(this.status.default.statusCode)
                    this.$http.patch(PROBLEM_URL + '/pop/1', {
                        status: this.status.default.statusCode
                    }, axiosConfig)
                        .then(response => {
                            //console.log(response);
                        })
                }
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

</style>