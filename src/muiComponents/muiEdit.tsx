import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface typeCheck{
    update:(data:any)=>void;
    editData:any;
}

const FormEdit:React.FC<typeCheck>=({update,editData})=> {
    const navigate=useNavigate()
    const[editingData,setEditData]=useState(editData);
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>
    {   
        const{name,value}=e.target;
        const parsedValue=name==='Sku'||name==='SellingPrice'||name==='BasePrice'?parseFloat(value):value;
        setEditData({...editingData,[name]:parsedValue});
    }
    const handleForm=()=>
    {
      navigate("/muilist");
    }
  return (
    <div>
      <Dialog  open={true}  onClose={handleForm}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <TextField
            name="Sku"
            margin="dense"
            label="Sku"
            type="number"
            fullWidth
            variant="standard"
            value={editingData.Sku}
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
            value={editingData.Name}
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
            value={editingData.DisplayName}
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
            value={editingData.SellingPrice}
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
            value={editingData.BasePrice}
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
            value={editingData.Decription}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={()=>{navigate('/muilist');setEditData({  Sku:'',
        Name:"",
        DisplayName:"",
        SellingPrice:"",
        BasePrice:"",
        Decription:""})}}>Cancel</Button>
       <Button onClick={()=>{update(editingData)}}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default FormEdit;
