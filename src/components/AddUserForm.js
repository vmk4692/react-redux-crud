import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/usersSlice';

const AddUserForm = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(userData));
    setUserData({
      name: '',
      username: '',
      email: '',
    });
  };

  return (
    <div className="add-user-form-container">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddUserForm;
