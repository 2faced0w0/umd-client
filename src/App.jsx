import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import './App.css'; // Let's keep App.css if there's any custom styles, else it can be empty

function App() {
  return (
    <div className="container mt-4">
      <header className="mb-4">
        <h2>User Management Dashboard</h2>
        <nav className="nav nav-pills mt-3">
          <NavLink
            to="/users"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            User List
          </NavLink>
          <NavLink
            to="/add-user"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Add User
          </NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/add-user" element={<AddUser />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
