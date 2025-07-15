import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { toast } from 'react-toastify';
import { deleteAUser, resetDelete } from '../../redux/user/user.slice';
const UserDeleteModal=(props:any)=>{
    const {showDelete, setShowDelete,deleteUser}=props;
    //const [show, setShow] = useState(false);
    const handleClose = () => setShowDelete(false);
    const handleShow = () => setShowDelete(true);
    const dispatch=useAppDispatch();
    const isDeleteSuccess=useAppSelector(state=>state.user.isDeleteSuccess);
    useEffect(()=>{
        if(isDeleteSuccess===true){
            setShowDelete(false);
            toast.success("delete user success");
            dispatch(resetDelete());
        }
    },[isDeleteSuccess])
    const handleDelete=()=>{
       dispatch(deleteAUser({id:deleteUser?.id}));
    }
    return (
        <>
        <Modal show={showDelete} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                  <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   Are you sure delete user email:{deleteUser?.email}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleDelete}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
        </>
    )
}
export default UserDeleteModal