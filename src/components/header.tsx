import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { useAppSelector } from '../redux/hook';
import { useState } from 'react';
const Header=()=>{
    const users=useAppSelector(state=>state.user.listUsers);
    const [mode,setMode]=useState("light");
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
                            setMode(event.target.value==="light"?"dark":"light")
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