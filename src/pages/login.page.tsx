import { ReactElement } from "react";
import LoginForm from "../component/login.component";
import { Container } from "@mui/material";

export function Login(): ReactElement {

    return (
        <Container maxWidth='sm'>
            <LoginForm></LoginForm>
        </Container>
    );
};