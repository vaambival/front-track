<template>
    <div id="problem-search">
        <div class="search-bar">
            <form class="problem-filter" @reset="filterReset">
                <table class="search-fields">
                    <tr>
                        <td>
                            <p>Исполнитель</p>
                            <v-select/>
                        </td>
                        <td>
                            <p>Название</p>
                            <input type="text"/>
                        </td>
                        <td>
                            <p>Тип источника</p>
                            <v-select />
                        </td>
                        <td>
                            <p>Дата создания</p>
                            <datepicker input-class="date-picker" :language="options.language" placeholder="От"/>
                            <datepicker input-class="date-picker" :language="options.language" placeholder="До"/>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker'
    import ru from 'vuejs-datepicker/src/locale/translations/ru'
    export default {
        name: "ProblemSearch",
        components: {
            Datepicker
        },

        data: function () {
            return {
                options: {
                    language: ru
                }
            }
        }
    }
</script>

<style scoped>
    .search-fields {
        width: 100%;
        margin: 30px;
    }
    td{
        text-align: left;
        padding: 0 20px;
    }
    .v-select{
        min-width: 150px;
        width: 100%;
    }
    td input {
        min-width: 200px;
        width: 100%;
        height: 24px;
        padding: 2px 5px;
    }
    .date-picker{
        min-width: 200px;
        width: 100%;
        height: 24px;
        padding: 2px 5px;
    }
</style>