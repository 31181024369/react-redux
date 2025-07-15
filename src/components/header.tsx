import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { useEffect, useState } from 'react';
import { changeMode } from '../redux/app/app.slice';
const Header=()=>{
    const users=useAppSelector(state=>state.user.listUsers);
    const dispatch=useAppDispatch();
    const mode=useAppSelector(state=>state.app.mode);
    useEffect(()=>{
        const body=document.querySelector("body");
        if(body) body.setAttribute('data-bs-theme',mode);
    },[mode])
    return (
        <>
        <Navbar className="bg-body-tertiary" data-bs-theme={mode}>
            <Container>
                <Navbar.Brand href="#home">HOIDANIT is {users.length}</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <Form>
                        <Form.Check // prettier-ignore
                        value={mode}
                        onChange={(event)=>{
                            console.log("data mode:",event.target.value);
                            dispatch(changeMode(event.target.value==="light"?"dark":"light"))
                        }}
                            type="switch"
                            id="custom-switch"
                            label={mode==="light"?"Light model":"Dark mode"}
                        />
                    </Form>
                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    )
}
export default Header