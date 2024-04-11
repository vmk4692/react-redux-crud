
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { addUser, updateUserById } from '../redux/usersSlice';
import UserForm from './UserForm';


const UserModal = ({ show, handleClose, user }) => {
  const dispatch = useDispatch();

  const handleSubmit = (userData) => {
    if (user) {
      dispatch(updateUserById({ userId: user.id, userData }));
    } else {
      dispatch(addUser(userData));
    }
    handleClose();
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{user ? 'Edit User' : 'Add User'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UserForm user={user} handleSubmit={handleSubmit} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
