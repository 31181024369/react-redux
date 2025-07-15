import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { toast } from 'react-toastify';
import { resetUpdate, updateAUser } from '../../redux/user/user.slice';

const UserUpdateModal=(props:any)=>{
    const {showUpdate,setShowUpdate,editUser}=props;
    //const [show, setShow] = useState(false);
    const handleClose = () => setShowUpdate(false);
    const handleShow = () => setShowUpdate(true);
    const [emailUpdate,setEmailUpdate]=useState<string>("");
    const [id,setId]=useState<number>(0);
    const [nameUpdate,setNameUpdate]=useState<string>("");
    const dispatch=useAppDispatch();
    const isUpdateSuccess=useAppSelector(state=>state.user.isUpdateSuccess);
    useEffect(()=>{
      
        setId(editUser?.id);
        setEmailUpdate(editUser?.email);
        setNameUpdate(editUser?.name);
      
    
    },[editUser]);
    useEffect(()=>{
      if(isUpdateSuccess===true){
        setShowUpdate(false);
        setEmailUpdate("");
        setNameUpdate("");
        toast.success("update user success");
        dispatch(resetUpdate());
      }

    },[isUpdateSuccess]);

    const handleUpdate=()=>{
      if(!emailUpdate){
        alert("email empty");
        return;
      }
      if(!nameUpdate){
        alert("name empty");
        return;
      }
      dispatch(updateAUser({emailUpdate,nameUpdate,id}));

      console.log("data update:",{emailUpdate,nameUpdate,id});
    }
    return (
        <>
         <Modal show={showUpdate} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                  <Modal.Title>Update a new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                    <Form.Control type="email" value={emailUpdate} onChange={(event)=>setEmailUpdate(event.target.value)}  />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Name">
                        <Form.Control type="text" value={nameUpdate} onChange={(event)=>setNameUpdate(event.target.value)}   />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleUpdate}>
                    Update
                  </Button>
                </Modal.Footer>
              </Modal>
        </>
    )
}
export default UserUpdateModal;