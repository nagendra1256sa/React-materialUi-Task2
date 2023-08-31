import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

interface typeCheck{
    send:(data:any)=>void;
    Form:boolean;
    setForm:React.Dispatch<React.SetStateAction<boolean>>;
}

const FormAdd:React.FC<typeCheck>=({send,Form,setForm})=> {
    const navigate=useNavigate()
    const [Items,setItem]=React.useState({
        Sku:'',
        Name:"",
        DisplayName:"",
        SellingPrice:"",
        BasePrice:"",
        Decription:""
    });
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>
    {   
        const{name,value}=e.target;
        const parsedValue=name==='Sku'||name==='SellingPrice'||name==='BasePrice'?parseFloat(value):value;
        setItem({...Items,[name]:parsedValue});
    }
  return (
    <div>
      <Dialog  open={Form}>
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <TextField
            name="Sku"
            margin="dense"
            label="Sku"
            type="number"
            fullWidth
            variant="standard"
            value={Items.Sku}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            name="Name"
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={Items.Name}
            onChange={handleChange}
          />
          <TextField
            name="DisplayName"
            autoFocus
            margin="dense"
            label="Display name"
            type="text"
            fullWidth
            variant="standard"
            value={Items.DisplayName}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            name='SellingPrice'
            margin="dense"
            label="Selling Price"
            type="number"
            fullWidth
            variant="standard"
            value={Items.SellingPrice}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            name="BasePrice"
            margin="dense"
            label="Base Price"
            type="number"
            fullWidth
            variant="standard"
            value={Items.BasePrice}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            name="Decription"
            margin="dense"
            label="Decription"
            type="text"
            fullWidth
            variant="standard"
            value={Items.Decription}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setForm(false);navigate('/muilist');setItem({  Sku:'',
        Name:"",
        DisplayName:"",
        SellingPrice:"",
        BasePrice:"",
        Decription:""})}}>Cancel</Button>
          <Button onClick={()=>{send(Items);setItem({  Sku:'',
        Name:"",
        DisplayName:"",
        SellingPrice:"",
        BasePrice:"",
        Decription:""})}}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default FormAdd
