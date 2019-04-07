<template>
    <div class="body-authentification">
        <div class="auth-form-header">
            <h1>Авторизация</h1>
        </div>
        <form class="auth-body">
            <div>
                <label for="login">Имя пользователя</label>
                <input id="login-field" v-model="input.username" required autofocus>
            </div>
            <div>
                <label for="password">Пароль</label>
                <div>
                    <input id="password-field" type="password" v-model="input.password" required>
                </div>
            </div>
            <div>
                <button class="button-pr" type="submit" @click="handleSubmit">
                    Войти
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import {
        LOGIN_URL
    } from "@/constant/api";

    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            handleSubmit(event) {
                event.preventDefault()
                if (this.input.password.length > 0) {
                    this.$http.post(LOGIN_URL, {
                        username: this.input.username,
                        password: this.input.password
                    }, { withCredentials: true, xhr: true}
                    ).catch(function(error) {
                        alert(error.response)
                    });
                }
            }
        }
    }
</script>

<style scoped>
    .body-authentification {
        background-color: #f9f9f9;
    }
    h1 {
        font-weight: normal;
    }
    .auth-form-header {
        background-color: transparent;
        border: 0;
        color: #333;
        margin: 25px 0 35px;
        text-align: center;
        text-shadow: none;
        padding: 10px 20px;
        font-family: BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
        font-size: 14px !important;
        line-height: 1.5;
    }
    .auth-body{
        background-color: #fff;
        border: 1px solid #d8dee2;
        border-radius: 5px;
        margin: 0 auto;
        width: 340px;
        padding: 20px;
    }
    label{
        display: block;
        margin-bottom: 6px;
        font-weight: 600;
        float: left;
        font-size: 14px;
    }
    #login-field, #password-field{
        display: block;
        width: 95%;
        background-color: #FFFFFF;
        font-size: 14px;
        margin-bottom: 40px;

        border: 1px solid #d1d5da;
        border-radius: 3px;
        box-shadow: inset 0 1px 2px rgba(27,31,35,.075);
        color: #24292e;
        line-height: 20px;
        min-height: 20px;
        outline: none;
        padding: 6px 8px;
        vertical-align: middle;
    }
    .button-pr{
        display: block;
        text-align: center;
        width: 100%;
        background-color: #FFA011;
        background-image: linear-gradient(-180deg,#FFCB7C,#FFA011 90%);
        color: #fff;
        border: 1px solid rgba(27,31,35,.2);
        border-radius: .25em;
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
        padding: 6px 12px;
        position: relative;
        vertical-align: middle;
        white-space: nowrap;
    }
</style>