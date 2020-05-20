import React, { useEffect } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import axios from "axios";
axios.defaults.withCredentials = true;

const Navbar = ({onLogin, auth, onLogout, setNav}) => {

  const checkAuth = () => {
    axios.get("http://127.0.0.1:8000/auth")
    .then(res => {
      console.log(res);
      if(res.data.message === "Authenticated"){
        onLogin({user: res.data.user, auth: res.data.auth, role: res.data.role});
      }
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    async function checkLog(){
      checkAuth();
    }
    checkLog();
  },[]);

  const logout = () => {
    axios.get("http://127.0.0.1:8000/logout")
    .then(res => {console.log(res); onLogout(res.data);})
    .catch(err => console.log(err));
  }

  return (
    <div className="container navbar">
      <div className="header">
        <div className="logo">
          <img src="" alt="" />
          <p>POS</p>
        </div>
        <ul>
          <Login isLogged={auth.type} onLogin={onLogin}/>
          <SignUp isLogged={auth.type} onRegister={onLogin}/>
          {auth.role === 1 ? <li name="setting" hidden={!auth.type && auth.role !== 1}>Setting</li>
           : <li name="profile" hidden={!auth.type}><a href="#" onClick={() => setNav("profile")}>Profile</a></li>}
          <li name="logOut" hidden={!auth.type}><a onClick={logout} href="#">Log Out</a></li>
        </ul>
      </div>
    </div>
  )
};

export default Navbar;
