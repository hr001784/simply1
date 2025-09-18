import React from 'react';
import './App.css';

const AVATAR = username => `https://api.dicebear.com/6.x/avataaars/svg?seed=${encodeURIComponent(username)}`;

function UserCard({ user }) {
  return (
    <div className="user-card p-3 mb-3 bg-white">
      <div className="row g-3 align-items-start">
        <div className="col-auto">
          <img className="avatar" src={AVATAR(user.username)} alt={user.username} />
        </div>
        <div className="col">
          <h3 className="mb-2">{user.name}</h3>
          <p className="mb-1"><strong>Email:</strong> {user.email}</p>
          <p className="mb-1"><strong>Phone:</strong> {user.phone}</p>
          <p className="mb-1"><strong>Company:</strong> {user.company?.name}</p>
          <p className="mb-1"><strong>Website:</strong> {user.website}</p>
          <p className="mb-0">
            <strong>Address:</strong> {user.address?.street}, {user.address?.suite}, {user.address?.city}, {user.address?.zipcode}
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (isMounted) setUsers(data);
      } catch (e) {
        if (isMounted) setError(e.message || 'Failed to load');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="container container-narrow py-4">
      <h1 className="mb-4">Users</h1>

      {isLoading && (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner" />
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!isLoading && !error && users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default App;
