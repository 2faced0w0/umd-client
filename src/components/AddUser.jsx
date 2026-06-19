import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const url = 'https://jsonplaceholder.typicode.com/users';
const AddUser = () => {
  
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: { name: formData.companyName }
      };
      const response = await axios.post(url, payload);
      console.log('User created successfully:', response.data);
      alert('User added successfully!');
      navigate('/users');
    } catch (err) {
      console.error('Failed to create user', err);
      alert('Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm mt-3" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="card-body">
        <h4 className="card-title mb-4">Add New User</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Name</label>
            <InputText 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="w-100 p-inputtext-sm" 
              required 
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <InputText 
              name="email" 
              type="email"
              value={formData.email} 
              onChange={handleChange} 
              className="w-100 p-inputtext-sm" 
              required 
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label fw-bold">Phone</label>
            <InputText 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              className="w-100 p-inputtext-sm" 
              required 
            />
          </div>
          
          <div className="mb-4">
            <label className="form-label fw-bold">Company Name</label>
            <InputText 
              name="companyName" 
              value={formData.companyName} 
              onChange={handleChange} 
              className="w-100 p-inputtext-sm" 
              required 
            />
          </div>
          
          <div className="d-flex justify-content-between">
            <Button 
              type="button" 
              label="Cancel"
              className='btn btn-outline-secondary' 
              onClick={() => navigate('/users')}
            />
            <Button 
              type="submit" 
              label={loading ? 'Adding...' : 'Add User'}
              className='btn btn-outline-primary' 
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
