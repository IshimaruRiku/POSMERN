import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import axios from "axios";
axios.defaults.withCredentials = true;

const SignUp = ({onRegister, isLogged}) => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);

  const changeUsername = event => {
    setUsername(event.target.value);
  }

  const changePassword = event => {
    setPassword(event.target.value);
  }

  const handleKeyPress = event => {
    if(event.key === "Enter") handleSignUp();
  }

  const useStyles = makeStyles((theme) => ({
    modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px none #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius: "5%",
      width: "30%",
    },
    title: {
      margin: "10px",
      marginBottom: "40px",
      padding: "10px",
      fontSize: "40px",
      borderBottom: "5px solid",
    },
    textbox: {
      margin: "8px 0",
      padding: "8px 0",
      overflow: "hidden",
      width: "100%",
      borderBotton: "2px solid #ff7284",
    },
    input: {
      background: "none",
      outline: "none",
      border: "none",
      fontSize: "20px",
    },
  }));
  const classes = useStyles();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false); setAlert(false);}

  const handleSignUp = () => {
    if(username === "" || password === ""){
      setAlert(true);
    } else {
      setAlert(false);
      axios.post("http://127.0.0.1:8000/users", {
        username: username,
        password: password
      })
      .then(res => {
        if(res.data.register === false) console.log(res.data);
        else {
          handleClose();
          onRegister(res.data);
        }
      })
      .catch(err => console.log(err));
    }
  }

  return (
    <li name="signUp" hidden={isLogged}><a onClick={handleOpen} href="#" >Sign Up</a>
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title" className={classes.title}>Sign Up</h2>
          <p style={{color: "red"}} hidden={!alert}>Username has been used / Username or password cannot be empty</p>
          <div className={classes.textbox}>
            <input id="username" type="text" className={classes.input} placeholder="Username" onChange={changeUsername} autoFocus={open} autoComplete="off" onKeyPress={handleKeyPress}/>
          </div>
          <div className={classes.textbox}>
            <input id="password" type="password" className={classes.input} placeholder="Password" onChange={changePassword} onKeyPress={handleKeyPress}/>
          </div>
          <Button variant="contained" color="primary" onClick={handleSignUp}>Sign Up</Button>

        </div>
      </Fade>
    </Modal></li>
  )
}

export default SignUp;
