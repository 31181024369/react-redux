import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { fetchListUsers } from '../redux/user/user.slice';
import { ToastContainer, toast } from 'react-toastify';
import UserCreateModal from './modal/user.create.modal';
import UserUpdateModal from './modal/user.update.model';
import UserDeleteModal from './modal/user.delete.modal';
interface IUser{
    id:number,
    name:string,
    email:string
}

const UsersTable=()=>{
    
    const [showCreate, setShowCreate] = useState<boolean>(false);
    const [showUpdate,setShowUpdate] = useState<boolean>(false);
    const [showDelete, setShowDelete] = useState<boolean>(false);
    const [editUser,setEditUser]=useState<IUser>();
    const [deleteUser,setDeleteUser]=useState<IUser>();
    const dispatch=useAppDispatch();
    const users=useAppSelector(state=>state.user.listUsers);
    useEffect(()=>{
        dispatch(fetchListUsers());
        //toast.success("success users");
    },[]);
    return (
        <>
        <div className='table-title d-flex justify-content-between mb-3'>
           <span><h3>Table users</h3></span>
           <button type="button" className="btn btn-primary" onClick={()=>setShowCreate(true)}>Add user</button>
        </div>
        <div>
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {users?.map(user=>{
                    return (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <button type="button" className="btn btn-warning me-2" onClick={()=>{
                                setShowUpdate(true),
                                setEditUser(user)
                                }}>Edit</button>
                            <button type="button" className="btn btn-danger" onClick={()=>{
                                setShowDelete(true),
                                setDeleteUser(user)
                            }}>Delete</button>
                        </td>
                    </tr>
                    );
                })}
            </tbody>
            </Table>
        </div>
        <UserCreateModal showCreate={showCreate} setShowCreate={setShowCreate} ></UserCreateModal>
        <UserUpdateModal showUpdate={showUpdate} setShowUpdate={setShowUpdate} editUser={editUser}></UserUpdateModal>
        <UserDeleteModal showDelete={showDelete} setShowDelete={setShowDelete} deleteUser={deleteUser}></UserDeleteModal>
        </>
    )
}
export default UsersTable