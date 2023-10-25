// LoginForm.js
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const LoginForm = ({ handleLogin, handleLogout }) => {
  const [authorization, setAuthorization] = useState('');
  const [jsonBody, setJsonBody] = useState({
    user: {
      email: '',
      password: '',
    },
  });

  const handleChange = (e) => {
    // Update the jsonBody object when input values change
    const { name, value } = e.target;
    setJsonBody((prevJsonBody) => ({
      ...prevJsonBody,
      user: {
        ...prevJsonBody.user,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Use the jsonBody object to send your API request
    const response = await axios.post('http://127.0.0.1:3000/login', jsonBody);
    const token = response.headers.authorization;
    setAuthorization(token);
    console.log(response)
    Cookies.set('authToken', token, { expires: 7 });
    handleLogin();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={jsonBody.user.email} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={jsonBody.user.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Log In</button>
      </form>
      <div>
        <button
          onClick={() => {
            handleLogout(authorization);
          }}
        >
          Sign Out
        </button>
      </div>
    </>
  );
};

export default LoginForm;
