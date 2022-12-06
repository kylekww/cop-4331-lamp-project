import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
function DialogNewConfession({open, handleClose}) {

  const [textInput, setTextInput] = useState('');
  const [length, setLength] = useState(0)
  const handleTextInputChange = event => {
    setTextInput(event.target.value);
    setLength(event.target.value.length)
};
  const postConfession = async event => {
    const confession = textInput;
    const data = await fetch("/api/v1/confessions/addConfession", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        confession
    }),
      
  })
  .then(res => {
    res.json().then((data) => {
      console.log(data);
    }) 
  })
  .catch(err => {
    console.log(err);
  });
  window.location.reload(false);
  handleClose();
  }
  const goodbye = async event =>{
    setLength(0)
    handleClose()
  }
  return (
      <Dialog open={open} fullWidth >
        <DialogTitle sx={{ color: 'rgba(89,35,206,1)' }}>Got something on your mind?</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            multiline       
            minRows = {5}   
            margin="dense"
            id="name"
            label="Write Confession"
            height = '24.0'
            fullWidth
            variant="standard"
            onChange= {handleTextInputChange}
            inputProps={{ maxLength: 280 }}
            sx={{
              "& .MuiFormLabel-root": {
                  color: 'rgba(89,35,206,1)'
              },
              "& .MuiFormLabel-root.Mui-focused": {
                  color: 'rgba(89,35,206,1)'
              }
          }}
          />
          <Typography component="h1" variant="h6">
               {length}/280
            </Typography>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={goodbye}  sx={{ color: 'rgba(89,35,206,1)' }}>Return</Button>
          <Button onClick={postConfession}  sx={{ color: 'rgba(89,35,206,1)' }}>Post Confession</Button>
        </DialogActions>
      </Dialog>
  );
}

export default DialogNewConfession;