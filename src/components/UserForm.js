
import React, { useState } from 'react';

const UserForm = ({ user, handleSubmit }) => {
  const [userData, setUserData] = useState({
    name: user ? user.name : '',
    username: user ? user.username : '',
    email: user ? user.email : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(userData);
    setUserData({ name: '', username: '', email: '' });
  };

  return (
    <form onSubmit={onSubmit} className="add-user-form">
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
      <button type="submit">{user ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default UserForm;
