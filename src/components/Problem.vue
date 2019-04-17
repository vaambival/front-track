<template>
    <div>
        <p class="name_problem">{{ prefix}} - {{ id }} {{ name }}</p>
        <div style="overflow-x:auto;">
            <table class="table1">
                <tr>
                    <td>Тип</td>
                    <td>text</td>
                </tr>
                <tr>
                    <td>Дата создания</td>
                    <td>text</td>
                </tr>
                <tr>
                    <td>Автор</td>
                    <td>text</td>
                </tr>
            </table>

            <table class="table2">
                <tr>
                    <td>Статус</td>
                    <td>
                        <v-select label="countryName" :options="options" v-model="selected"></v-select>
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
                options: [
                    {countryCode: "AU", countryName: "Australia"},
                    {countryCode: "CA", countryName: "Canada"},
                    {countryCode: "CN", countryName: "China"},
                    {countryCode: "DE", countryName: "Germany"},
                    {countryCode: "JP", countryName: "Japan"},
                    {countryCode: "MX", countryName: "Mexico"},
                    {countryCode: "CH", countryName: "Switzerland"},
                    {countryCode: "US", countryName: "United States"}
                ],
                selected: {countryCode: "AU", countryName: "Australia"}
            }
        },
        mounted() {

                this.$http.get(PROBLEM_URL + '/pop/1', axiosConfig)
                    .then(response => {
                        console.log(response);
                        this.prefix = response.data.prefix
                        this.id = response.data.id
                        this.name = response.data.name
                    })
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

    }

</style>