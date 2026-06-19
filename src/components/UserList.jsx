import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [url] = useState('https://jsonplaceholder.typicode.com/users');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(url);
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
        console.error(err);
      }
    };

    fetchUsers();
  }, [url]);

  const handleDelete = async (id) => {
    try {
      setUsers(users.filter(user => user.id !== id));
      await axios.delete(url + `/${id}`);
      console.log(`User ${id} deleted successfully (simulated)`);
    } catch (err) {
      console.error('Failed to delete user', err);
    }
  };

  if (error) {
    console.log(error);
    return (
      <div>Error...</div>
    );
  }

  return (
    <div className="card mt-3 shadow-sm">
      <div className="card-body">
        <h4 className="card-title mb-4">Users List</h4>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.company.name}</td>
                  <td>
                    <Button 
                      label="Delete" 
                      icon="pi pi-trash" 
                      severity="danger" 
                      size="small"
                      onClick={() => handleDelete(user.id)}
                      className="p-button-sm"
                    />
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
