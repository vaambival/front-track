const API_URL ='api'

const VERSION = 'v1'

const BASE_URL = 'http://192.168.1.132:8080' + '/' + API_URL + '/' + VERSION

const LOGIN_PATH = 'session'
const LOGIN_URL = BASE_URL + '/' + LOGIN_PATH

const PROBLEM_PATH = 'task'
const PROBLEM_URL = BASE_URL + '/' + PROBLEM_PATH

export{
    LOGIN_URL,
    PROBLEM_URL
}