import * as React from 'react';
import '../../css/styles.css';
import DialogNewComment from './DialogNewComment';
import AddCommentIcon from '@mui/icons-material/AddComment';

/* Need to be added:
    - Reformatting of dialog box.
    - Character limit to dialog box.
*/

function NewCommentButton(Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <DialogNewComment open={open} handleClose={handleClose}></DialogNewComment>
      <div onClick={handleClickOpen} class="NewConfessionButton NewColor" >
        <label class="unselectable">
            <AddCommentIcon style={{ fontSize: "4vmin", color: "white", top: "50%" }}/>
        </label>
      </div>
    </div>
  );
}

export default NewCommentButton;