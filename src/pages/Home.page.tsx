import { useEffect } from "react";
import { login } from "../service/login";

const Home = () => {
    
    useEffect(() => {
        login();
    }, []);

    return <p>this is home page</p>
};

export default Home;