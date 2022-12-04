import React, {useState} from 'react';

function DialogNewConfession({open, handleClose}) {

  const [textInput, setTextInput] = useState('');

  const handleTextInputChange = event => {
    setTextInput(event.target.value);
};
  const postConfession = async () => {
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
            onChange= {handleTextInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={postConfession}>Post</Button>
        </DialogActions>
      </Dialog>
  );
}