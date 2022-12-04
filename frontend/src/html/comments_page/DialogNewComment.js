import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, {useState} from 'react';
import { useParams } from "react-router-dom";

function DialogNewComment({open, handleClose}) {

  const [textInput, setTextInput] = useState('');
  const confessionID = useParams().token;

  const handleTextInputChange = event => {
    setTextInput(event.target.value);
  };

  const postComment = async event => {
    const comment = textInput;
    const data = await fetch("/api/v1/comments/addComment", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment,
        confessionID
    }),
      
  })
  .then(res => {
    res.json().then((data) => {
      //console.log(data);
    }) 
  })
  .catch(err => {
    console.log(err);
  });
  handleClose();
  }
  return (
    <Dialog open={open}>
        <DialogTitle>New Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            What's your response to this?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Type here"
            type="comment"
            fullWidth
            variant="standard"
            onChange= {handleTextInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={postComment}>Post</Button>
        </DialogActions>
      </Dialog>
  );
}

export default DialogNewComment;