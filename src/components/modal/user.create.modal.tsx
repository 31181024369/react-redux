import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { createNewUser, resetCreate } from '../../redux/user/user.slice';
import { toast } from 'react-toastify';
const UserCreateModal=(props:any)=>{

    const {showCreate, setShowCreate}=props;
    //const [show, setShow] = useState(false);
    const handleClose = () => setShowCreate(false);
    const handleShow = () => setShowCreate(true);
    const [email,setEmail]=useState<string>("");
    const [name,SetName]=useState<string>("");
    const dispatch=useAppDispatch();
    const isCreateSuccess=useAppSelector(state=>state.user.isCreateSuccess);
    useEffect(()=>{
        if(isCreateSuccess===true){
            setShowCreate(false);
            setEmail("");
            SetName("");
            dispatch(resetCreate())
            toast.success("create user success");
        }
    },[isCreateSuccess])
    const handleCreateUser=()=>{
       if(!email){
        alert("email empty");
        return;
       }
       if(!name){
         alert("name empty");
        return;
       }
        dispatch(createNewUser({email,name}))
    }
    return (
        <>
         {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={showCreate} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
            >
            <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(event)=>{setEmail(event.target.value)}} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Name">
                <Form.Control type="text" placeholder="Name" value={name} onChange={(event)=>{SetName(event.target.value)}} />
            </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    );
}
export default UserCreateModal