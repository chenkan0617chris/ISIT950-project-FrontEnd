import { useEffect } from "react";
import { getUser } from "../service/api";

const Order = () => {

    useEffect(() => {
        getUser();
    }, []);
    
    return <a href="/">this is a order page</a>
};

export default Order;