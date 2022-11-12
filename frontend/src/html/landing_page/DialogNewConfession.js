import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function DialogNewConfession({open, handleClose}) {
  const postConfession = async event => {
    const data = await fetch("/api/v1/auth/addConfession", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
     
  })
  .then(res => {
    res.json().then((data) => {
      console.log(data);
      
    }) 
  })
  .catch(err => {
    console.log(err);
  }); 
  alert("we are here");
  handleClose();
  }
  return (
    <Dialog open={open}>
        <DialogTitle>New Confession</DialogTitle>
        <DialogContent>
          <DialogContentText>
            What's on your mind?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Type here"
            type="confession"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={postConfession}>Post</Button>
        </DialogActions>
      </Dialog>
  );
}

export default DialogNewConfession;