import * as React from 'react';
import '../../css/styles.css';
import DialogNewConfession from './DialogNewConfession';

/* Need to be added:
    - Reformatting of dialog box.
    - Character limit to dialog box.
*/

function NewConfessionButton(Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <DialogNewConfession open={open} handleClose={handleClose}></DialogNewConfession>
      <div onClick={handleClickOpen} class={ Props.isNew ? "NewConfessionButton NewColor" : "NewConfessionButton HotColor"}>
        <div class="Text">
          <label class="unselectable">
            +
          </label>
        </div>
      </div>
    </div>
  );
}

export default NewConfessionButton;