import React, { useState } from "react";
import Navbar from "./Navbar";
import Panel from "./Panel";
import Main from "./Main";
import Profile from "./Profile";
import Product from "./Product";
import User from "./User";

const App = () => {
  const [page, setPage] = useState("");
  const [auth, setAuth] = useState({
    user: "",
    type: false,
    role: 0
  });

  const handleNavPage = (newPage) => {
    setPage(newPage);
  }

  const checkAuth = () => {
    if(auth.type) return <Panel auth={auth}/>;
    else return <Main />;
  }

  const checkPage = () => {
    switch(page){
      case "profile":
        return <Profile auth={auth}/>;
      case "product":
        return <Product />;
      case "user":
        return <User />;
      default:
        return auth.type ? <Panel auth={auth}/> : <Main />;
    }
  }

  const onAuth = ({user, auth, role}) => {
    if(auth) setAuth({user: user, type: auth, role: role});
    else setAuth({
      user: "",
      type: false,
      role: 0
    });
  }

  return (
    <div>
      <Navbar onLogin={onAuth} onLogout={onAuth} auth={auth} setNav={handleNavPage}/>
      {checkPage()}
    </div>
  );
};

export default App;
