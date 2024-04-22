import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

type LoginInputs = {
    email: string
    password: string
  }

interface UserInfo {
    username: string,
    role: string
}

export const login = (form: LoginInputs) => {
    return new Promise<UserInfo>((resolve, reject) => {
        axios.post('/login', {
            data: form
        })
        .then((response: any) => {
            console.log(response);
            resolve(response.data);
        }).catch(err => {
            console.log(err);
            reject(err)
        });
    })
};

export const getUser = () => {
    axios.get('/user')
    .then(response => {
        console.log(response.data);
    }).catch(err =>(console.error(err.message)));
};