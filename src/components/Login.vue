<template>
    <div>
        <h4>Login</h4>
        <form>
            <label for="login">Username</label>
            <div>
                <input id="login" v-model="input.username" required autofocus>
            </div>
            <div>
                <label for="password">Password</label>
                <div>
                    <input id="password" type="password" v-model="input.password" required>
                </div>
            </div>
            <div>
                <button type="submit" @click="handleSubmit">
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
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>