import * as React from 'react';
import '../../css/styles.css';
import DialogNewComment from './DialogNewComment';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { Tooltip, IconButton } from '@mui/material';

/* Need to be added:
    - Reformatting of dialog box.
    - Character limit to dialog box.
*/

function NewCommentButton(Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    //console.log(open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <DialogNewComment oid={Props.oid} open={open} handleClose={handleClose}/>
      <div onClick={handleClickOpen} class="NewConfessionButton NewColor" >
        <label class="unselectable">
          <Tooltip title="Add Comment">
            <IconButton disableFocusRipple="true" disableRipple="true">
              <AddCommentIcon style={{ fontSize: "4vmin", color: "white", top: "50%" }}/>
            </IconButton>
          </Tooltip>
        </label>
      </div>
    </div>
  );
}

export default NewCommentButton;