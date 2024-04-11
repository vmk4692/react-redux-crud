import React from 'react';
import UsersTable from './components/UsersTable';
import './App.css'
function App() {
  return (
    <div>
      <h4 className="text-center mt-4 ">User Management</h4>
        <UsersTable />
    </div>
  );
}

export default App;
