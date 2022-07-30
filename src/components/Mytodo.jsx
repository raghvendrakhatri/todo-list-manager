import { Checkbox } from '@mui/material'
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import db from "../firebase";
import firebase from 'firebase'; 
const Mytodo = (props) => {

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [check,setCheck] = useState(false);

     const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#100F0F',
  boxShadow: 24,
  p: 4,
};
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [Inp,setInp] = useState(props.text.task);





  return (
   <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>

     <Checkbox {...label} checked = {props.text.completed}  disabled={props.type} color="success" size="large" onChange={(event)=>
    {
        db.collection('todos').doc(props.text.id).update({
      task: Inp,
      completed:true,
      timestamp : firebase.firestore.FieldValue.serverTimestamp(),
    });
      setCheck(!check);
    }} />

    
    {props.text.task}

    <span style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
       <Button varient="contained" color="primary" style={{margin:"10px"}} onClick={ event => db.collection('todos').doc(props.text.id).delete() }><DeleteForeverIcon/></Button>
       
        <div>
      <Button onClick={handleOpen} varient="contained" color="primary" disabled = {props.text.completed} ><BorderColorIcon/></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3 style={{color:"white", textAlign:"center"}}>Update the task</h3>
          <div style={{display:"flex", justifyContent:"space-evenly", alignItems:"center"}}>
          <input type ="text" value={Inp} onChange={(event)=>
          {
            setInp(event.target.value);
          }} style={{width:"50%" ,height:"1.5rem"}} />
          <Button variant="contained" size="medium" onClick={(event)=>
          {
            db.collection('todos').doc(props.text.id).update({
      task: Inp,
      timestamp : firebase.firestore.FieldValue.serverTimestamp(),
    });
            handleClose();
          }}  >Submit</Button>
    </div>

        </Box>
      </Modal>
    </div>
    </span>

   </div>
  )
}

export default Mytodo