import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGreetings } from './redux/greetings/greetingsSlicer';
import Greeting from './components/Greeting';
import Navbar from './components/Navbar';
import SignupForm from './components/SingupForm';
import LoginForm from './components/LoginForm';
import axios from 'axios';
import Cookies from 'js-cookie';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchGreetings());
    const authToken = Cookies.get('authToken');
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, [dispatch]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Handle login logic (e.g., set user as logged in)
    setIsLoggedIn(true);
  };

  const handleLogout = async (authorization) => {
    // Handle logout logic (e.g., set user as logged out)
    const authToken = Cookies.get('authToken');
    authorization ||= authToken;
    console.log(authorization);
    const response = await axios.delete('http://127.0.0.1:3000/logout', {
      headers: {
        Authorization: authorization, // Include the Authorization token in the headers
      },
    });
    console.log(response);
    setIsLoggedIn(false);
    Cookies.remove('authToken');
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/login"
          element={<LoginForm handleLogin={handleLogin} handleLogout={handleLogout} />}
        />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </div>
  );
};

export default App;
