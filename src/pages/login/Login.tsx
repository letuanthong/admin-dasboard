import React, { useState } from 'react';
import './login.scss';
import { login } from '../../api/authentication';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userPhoneNumber, setUsername] = useState('');
  const [userPassword, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await login(userPhoneNumber, userPassword);
      navigate('/');
    } catch (error: any) { // Explicitly type 'error' as 'any'
      // Xử lý lỗi ở đây
      const errorMessage = error.response?.data?.message || error.message;
      alert(errorMessage);
    }
  }

  return (
    <div className="login-container">
        <div className="login-box">
            <h1>ADMIN DASHBOARD</h1>
            <h2>Have an account?</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Phone Number" value={userPhoneNumber} onChange={e => setUsername(e.target.value)}/>
                <input type="password" placeholder="Password" value={userPassword} onChange={e => setPassword(e.target.value)} />
                <div className="password-options">
                    <label>
                        <input type="checkbox" /> Remember Me
                    </label>
                    <a href="#">Forgot Password</a>
                </div>
                <button type="submit" value="Submit">Sign In</button>
            </form>
            {/*  
            <div className="social-login">
                <p>Or Sign In With</p>
                <button className="facebook">Facebook</button> 
                <button 
                    className="facebook" 
                    onClick={() => {
                      const token = sessionStorage.getItem('token');
                      console.log(token);
                    }}
                  >
                    Facebook
                  </button>
                <button className="twitter">Twitter</button>
            </div>
             */}
        </div>
    </div>
  )
}

export default Login;