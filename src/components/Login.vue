<template>
    <div class="body-authentification">
        <div class="auth-form-header">
            <h1>Авторизация</h1>
        </div>
        <form class="auth-body">
            <p class="error" v-if="message">{{ messageText }}</p>
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
                <button class="button-pr-come" type="submit" @click="handleSubmit">
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
                message: false,
                messageText: "",
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
                    }, { withCredentials: true, xhr: true},
                    this.$router.push('/Problem')
                    ).catch(error => {
                        if (error.response.status === 401) {
                            this.message = true;
                            this.messageText = "Неверное имя пользователя или пароль";
                        }
                    });
                }
                else {
                    this.message = true;
                    this.messageText = "Поле 'Пароль' не должно быть пустым";
                }
                if (this.input.username.length == 0) {
                    this.message = true;
                    this.messageText = "Поле 'Имя пользователя' не должно быть пустым";
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
        width: 95%;
        margin-bottom: 40px;
    }
    .button-pr-come{
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
    .error {
        text-align: left;
        color: #FF7373;
        margin-bottom: 30px;
        font-size: 14px;
    }
</style>