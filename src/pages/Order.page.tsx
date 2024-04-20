import { useEffect } from "react";
import { getUser } from "../service/login";

const Order = () => {

    useEffect(() => {
        getUser();
    }, []);
    
    return <a href="/">this is a order page</a>
};

export default Order;