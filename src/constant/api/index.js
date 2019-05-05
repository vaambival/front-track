const API_URL ='api'

const VERSION = 'v1'

const BASE_URL = 'http://192.168.1.132:8080' + '/' + API_URL + '/' + VERSION

const LOGIN_PATH = 'session'
const LOGIN_URL = BASE_URL + '/' + LOGIN_PATH

const PROBLEM_PATH = 'task'
const USER_PATH = 'user'
const REQUEST_PATH = 'request'
const PREFIX = 'pop'
const PROBLEM_URL = BASE_URL + '/' + PROBLEM_PATH + '/' + PREFIX
const PROBLEM_URL_WITHOUT_PREFIX = BASE_URL + '/' + PROBLEM_PATH
const USER_URL = BASE_URL + '/' + USER_PATH
const REQUEST_URL = BASE_URL + '/' + REQUEST_PATH

export{
    LOGIN_URL,
    PROBLEM_URL,
    PROBLEM_URL_WITHOUT_PREFIX,
    USER_URL,
    REQUEST_URL
}