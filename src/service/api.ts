import axios from "axios";
import { searchInputs } from "../component/searchForm.component";

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

type LoginInputs = {
    username: string;
    password: string;
  }

interface UserInfo {
    username: string,
    role: string
}

type RegisterInputs = {
    username: string;
    password: string;
    phone?: string;
    email?: string;
    address: string;
    postcode: string;
    titles?: string;
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
            reject(err.response.data)
        });
    })
};

export const registerApi = (form: RegisterInputs) => {
    return new Promise<UserInfo>((resolve, reject) => {
        axios.post('/register', {
            data: form
        })
        .then((response: any) => {
            console.log(response);
            resolve(response.data);
        }).catch(err => {
            console.log(err);
            reject(err.response.data)
        });
    })
};


export const search = (form: any) => {
    console.log(form);
    return new Promise<any>((resolve, reject) => {
        axios.post('/search', {
            data: form
        })
        .then((response: any) => {
            console.log(response);
            resolve(response.data);
        }).catch(err => {
            console.log(err);
            reject(err.response.data)
        });
    })
};

export const getRestaurant = (title: string) => {
    return new Promise<any>((resolve, reject) => {
        axios.post('/getRestaurant', {
            data: title
        })
        .then((response: any) => {
            console.log(response);
            resolve(response.data);
        }).catch(err => {
            console.log(err);
            reject(err.response.data)
        });
    })
};

export const getMenus = (title: string) => {
    return new Promise<any>((resolve, reject) => {
        axios.post('/getMenus', {
            data: title
        })
        .then((response: any) => {
            console.log(response);
            resolve(response.data);
        }).catch(err => {
            console.log(err);
            reject(err.response.data)
        });
    })
};

export const order = (data: any) => {
    return new Promise<any>((resolve, reject) => {
        axios.post('/order', {
            data
        })
        .then((response: any) => {
            console.log(response);
            resolve(response.data);
        }).catch(err => {
            console.log(err);
            reject(err.response.data)
        });
    })
};

export const getHistory = (data: any) => {
    return new Promise<any>((resolve, reject) => {
        axios.post('/history', {
            data
        })
        .then((response: any) => {
            console.log(response);
            resolve(response.data);
        }).catch(err => {
            console.log(err);
            reject(err.response.data)
        });
    })
};

export const getUser = () => {
    axios.get('/user')
    .then(response => {
        console.log(response.data);
    }).catch(err =>(console.error(err.message)));
};