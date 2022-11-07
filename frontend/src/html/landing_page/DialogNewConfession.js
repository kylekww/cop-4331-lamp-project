import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function DialogNewConfession({open, handleClose}) {
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
          <Button onClick={handleClose}>Post</Button>
        </DialogActions>
      </Dialog>
  );
}

export default DialogNewConfession;