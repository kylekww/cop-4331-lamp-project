import React, {useState} from 'react';

function DialogNewComment({open, handleClose}) 
{
    const [textInput, setTextInput] = useState('');
    
    const handleTextInputChange = event => {
        setTextInput(event.target.value);
    };

    const postComment = async () => 
    {
        const comment = textInput;
        const data = await fetch("https://hushucf.herokuapp.com/api/v1/comments/addComment", 
        {
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
                    What's on your mind?
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Type here"
                    type="comment"
                    fullWidth
                    variant="standard"
                    onChange={handleTextInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={postComment}>Post</Button>
            </DialogActions>
        </Dialog>
    );
}