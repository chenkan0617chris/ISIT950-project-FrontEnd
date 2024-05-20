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
        axios.post('/orders/order', {
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

export const getOrderList = (data: any) => {
    return new Promise<any>((resolve, reject) => {
        axios.post('/orders/orderList', {
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

export const getAllOrderList = (data: any) => {
    return new Promise<any>((resolve, reject) => {
        axios.post('/orders/allOrderList', {
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


export const getRestaurantOrderList = (data: any) => {
    return new Promise<any>((resolve, reject) => {
        axios.post('/orders/restaurantOrderList', {
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

export const restaurantConfirmOrder = (data: any) => {
    return new Promise<any>((resolve, reject) => {
        axios.post('/orders/restaurantConfirmOrder', {
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

export const cancelOrder = (data: any) => {
    return new Promise<any>((resolve, reject) => {
        axios.post('/orders/cancelOrder', {
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

export const restaurantProcessedOrder = (data: any) => {
    return new Promise<any>((resolve, reject) => {
        axios.post('/orders/restaurantProcessedOrder', {
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


export const restaurantDeliveringOrder = (data: any) => {
    return new Promise<any>((resolve, reject) => {
        axios.post('/orders/restaurantDeliveringOrder', {
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

export const restaurantCompleteOrder = (data: any) => {
    return new Promise<any>((resolve, reject) => {
        axios.post('/orders/restaurantCompleteOrder', {
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



export const updateSettings = (data: any) => {
    return new Promise<any>((resolve, reject) => {
        axios.post('/users/updateSettings', {
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

export const updateRestaurantSettings = (data: any) => {
    return new Promise<any>((resolve, reject) => {
        axios.post('/users/updateRestaurantSettings', {
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


export const addDish = (data: any) => {
    return new Promise<any>((resolve, reject) => {
        axios.post('/users/addDish', {
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

export const editDish = (data: any) => {
    return new Promise<any>((resolve, reject) => {
        axios.post('/users/editDish', {
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

export const orderDetail = (data: any) => {
    return new Promise<any>((resolve, reject) => {
        axios.post('/orders/orderDetail', {
            data
        })
        .then((response: any) => {
            console.log(response);
            resolve(response.data[0]);
        }).catch(err => {
            console.log(err);
            reject(err.response.data)
        });
    })
};

export const getCustomer = (data: any) => {
    return new Promise<any>((resolve, reject) => {
        axios.post('/getCustomer', {
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

export const membership = (data: any) => {
    return new Promise<any>((resolve, reject) => {
        axios.post('/users/membership', {
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

export const rating = (data: any) => {
    return new Promise<any>((resolve, reject) => {
        axios.post('/orders/rating', {
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
