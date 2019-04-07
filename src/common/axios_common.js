import Axios from 'axios'

const axiosConfig = {
    headers: {
        'content-Type': 'application/json',
        "Accept": "*/*",
        "Cache-Control": "no-cache"
    },
    credentials: "same-origin"
};
Axios.defaults.withCredentials = true;

export {axiosConfig}