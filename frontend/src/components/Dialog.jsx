import { useState, useEffect } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function ConfirmDialog({ confirm, deny, itemId }) {
  const [open, setOpen] = useState(false);

  //handleclick open close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    handleOpen();
  }, [])

  return (
    <React.Fragment>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">

        <DialogTitle id="alert-dialog-title">
          {"Confirm Deletion Request"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you wish to delete the selected item? This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { deny(); handleClose(); }}>No</Button>
          <Button onClick={() => { confirm(itemId); handleClose(); }}>Yes</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default ConfirmDialog;