import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useNavigate, useParams } from 'react-router-dom';
import { Users } from '../../App';

interface typeCheck{
  state:Users[];
  open:boolean;
  setOpen:React.Dispatch<React.SetStateAction<boolean>>
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserDetails:React.FC<typeCheck>=({state,open,setOpen})=> {
  const navigate=useNavigate()
  const {id}=useParams();
  const userId=id?parseInt(id):NaN
  const userDetails=state.find((each)=>
  {
    return each.id===userId;
  });
  const handleClose=()=>
  {
    setOpen(false);
    setTimeout(()=>
    {
      navigate("/main/user")
    },300)
  }
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Detais of User"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           <strong>First name:</strong>{userDetails?.FirstName}<br/>
           <strong>Last name:</strong>{userDetails?.LastName}<br/>
           <strong>Email:</strong>{userDetails?.Email}<br/>
           <strong>Phone number:</strong>{userDetails?.PhoneNumber}<br/>
           <strong>Alternative PhoneNumber:</strong>{userDetails?.AlternativeNumber}<br/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Back to users</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default UserDetails;
