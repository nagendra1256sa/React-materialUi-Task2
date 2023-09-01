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
}

const FormAdd:React.FC<typeCheck>=({send})=> {
    const navigate=useNavigate()
    const [errors,setErrors]=React.useState<any>({});
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
    const handleForm=()=>
    {
       navigate("/muilist");
    }
    const validOf=():boolean=>
    {
       const newErrors:any={};
       if(Items.Sku==="")
       {
         newErrors.Sku="Sku required";
       }
       if(Items.Name==="")
       {
         newErrors.Name="Name required";
       }
       if(Items.DisplayName==="")
       {
         newErrors.DisplayName="Display name required";
       }
       if(Items.SellingPrice==="")
       {
         newErrors.SellingPrice="Selling price required";
       }
       if(Items.BasePrice==="")
       {
         newErrors.BasePrice="Base Price required";
       }
      
         setErrors(newErrors);
       return Object.keys(newErrors).length===0;
    }
    const handleItem=(Items:any)=>
    {
       if(validOf())
       {
          send(Items);
          setItem({  Sku:'',
        Name:"",
        DisplayName:"",
        SellingPrice:"",
        BasePrice:"",
        Decription:""});
        navigate('/muilist')
       }
    }
  return (
    <div>
      <Dialog  open={true}  onClose={handleForm}>
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <TextField
           autoFocus
            name="Sku"
            margin="dense"
            label="Sku"
            type="number"
            fullWidth
            variant="standard"
            value={Items.Sku}
            onChange={handleChange}
            error={!!errors.Sku}
            helperText={errors.Sku}
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
            error={!!errors.Name}
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
            value={Items.DisplayName}
            onChange={handleChange}
            error={!!errors.DisplayName}
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
            value={Items.SellingPrice}
            onChange={handleChange}
            error={!!errors.SellingPrice}
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
            value={Items.BasePrice}
            onChange={handleChange}
            error={!!errors.BasePrice}
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
            value={Items.Decription}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{navigate('/muilist');setItem({  Sku:'',
        Name:"",
        DisplayName:"",
        SellingPrice:"",
        BasePrice:"",
        Decription:""})}}>Cancel</Button>
          <Button onClick={()=>{handleItem(Items)}}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default FormAdd
