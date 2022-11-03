import * as React from 'react';
import '../../css/LandingPage.css';
import DialogNewConfession from './DialogNewConfession';

/* Need to be added:
    - Reformatting of dialog box.
    - Character limit to dialog box.
*/

function NewConfessionButton() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <html>
      <DialogNewConfession open={open} handleClose={handleClose}></DialogNewConfession>

      <button class="NewConfessionButton" onClick={handleClickOpen}>
        <div class="Text">
          <label class="unselectable">
            +
          </label>
        </div>
      </button>
    </html>
  );
}

export default NewConfessionButton;