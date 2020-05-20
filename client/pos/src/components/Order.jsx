import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import axios from "axios";
axios.defaults.withCredentials = true;

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

const Order = ({items, isDisabled, onReset, auth}) => {
  const [note, setNote] = useState("")
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleOpen = () => {setOpen(true); console.log(auth);}
  const handleClose =() => setOpen(false);

  const handleReset = () => {onReset(); setNote(""); handleClose();}
  const handleChange = event => setNote(event.target.value);

  const handleOrder = () => {
    const postItem = [];
    items.map(item => postItem.push({_id: item._id, qty: item.qty, price: item.price}))
    console.log(postItem);
    axios.post("http://127.0.0.1:8000/orders", {
      item: postItem,
      user: auth.user,
      note: note
    })
    .then(res => {console.log(res); handleReset();})
    .catch(err => console.log(err));
  };

  return <div>
  <Button variant="contained" color="primary" disabled={isDisabled} onClick={handleOpen}>Order</Button>
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
        <h2 id="transition-modal-title" className={classes.title}>Order</h2>
        <label htmlFor="note">Note:</label>
        <br />
        <textarea id="note" rows="5" column="100" type="textarea" onChange={handleChange} placeholder="Note.."></textarea>
        <br />
        <p>Are you sure ?</p>
        <ul className="confirm">
          <li>
            <Button variant="contained" color="primary" href="#" onClick={handleOrder}>Confirm</Button>
          </li>
          <li>
            <Button variant="contained" color="primary" onClick={handleClose}>Cancel</Button>
          </li>
        </ul>
      </div>
    </Fade>
  </Modal>
  </div>
}

export default Order;
