
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUserById } from '../redux/usersSlice';
import UserModal from './AddUserModal';


const UsersTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (userId) => {
    dispatch(deleteUserById(userId));
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleAddUser = () => {
    setShowUserModal(true);
  };

  const handleCancelUserModal = () => {
    setSelectedUser(null);
    setShowUserModal(false);
  };

  return (
    <div className="users-table-container">
    <div >
      <div className="d-flex  justify-content-end mb-3">
      <button onClick={handleAddUser} className="btn btn-lg btn-success">Add User</button>
      </div>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button  className="btn btn-sm btn-info me-4" onClick={() => handleEdit(user)}>Edit</button>
                <button  className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UserModal
        show={showUserModal}
        handleClose={handleCancelUserModal}
        user={selectedUser}
      />
    </div>
    </div>
  );
};

export default UsersTable;
