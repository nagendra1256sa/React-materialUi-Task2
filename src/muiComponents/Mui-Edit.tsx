import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface typeCheckEdit{
  Sku:string;
  Name:String;
  DisplayName:string;
  SellingPrice:string;
  BasePrice:string;
  Decription:string;
}

interface typeCheck{
    update:(data:any)=>void;
    editData:typeCheckEdit;
}

const FormEdit:React.FC<typeCheck>=({update,editData})=> {
    const navigate=useNavigate()
    const[editingData,setEditData]=useState(editData);
    console.log(editingData);
    const[errors,setErrors]=useState<any>("")
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>
    {   
        const{name,value}=e.target;
        setEditData({...editingData,[name]:value});
    }
    const handleForm=()=>
    {
      navigate("/list");
    }
    const validOf=():boolean=>
    {
       const newErrors:any={};
       if(editingData.Sku==="")
       {
          console.log("fdgdfg");
          newErrors.Sku="Sku required";
       }
       if(editingData.Name==="")
       {
         newErrors.Name="Name required";
       }
       if(editingData.DisplayName==="")
       {
         newErrors.DisplayName="Display name required";
       }
       if(editingData.SellingPrice==="")
       {
         newErrors.SellingPrice="Selling price required";
       }
       if(editingData.BasePrice==="")
       {
         newErrors.BasePrice="Base Price required";
       }
       if(Object.keys(newErrors).length>0)
       {
         setErrors(newErrors);
         return false;
       }
       return true;
    }
    const handleData=()=>
    {
      if(validOf())
      {
        update(editingData);
      }
    
    }
  return (
    <div>
      <Dialog  open={true}  onClose={handleForm}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            name="Sku"
            margin="dense"
            label="Sku"
            type="number"
            fullWidth
            variant="standard"
            value={editingData.Sku}
            onChange={handleChange}
            error={errors.Sku}
            helperText={errors.Sku}
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
            error={errors.Name}
            helperText={errors.Name}
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
            error={errors.DisplayName}
            helperText={errors.DisplayName}
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
            error={errors.SellingPrice}
            helperText={errors.SellingPrice}
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
            error={errors.BasePrice}
            helperText={errors.BasePrice}
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
        <Button onClick={()=>{navigate('/list');setEditData({  Sku:'',
        Name:"",
        DisplayName:"",
        SellingPrice:"",
        BasePrice:"",
        Decription:""})}}>Cancel</Button>
       <Button onClick={handleData}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default FormEdit;
