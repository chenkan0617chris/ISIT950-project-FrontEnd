import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const login = () => {
    axios.get('/')
    .then(response => {
        console.log(response.data);
    }).catch(err =>(console.error(err.message)));
};

export const getUser = () => {
    axios.get('/user')
    .then(response => {
        console.log(response.data);
    }).catch(err =>(console.error(err.message)));
};