import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { Annotation } from '../App';

interface typeCheck{
    send:(data:Annotation)=>void;
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
        setItem({...Items,[name]:value});
    }
    const handleForm=()=>
    {
       navigate("/list");
    }
    const validation=():boolean=>
    {
       const validActions:any={};
       if(parseInt(Items.Sku)<=0)
       {
          validActions.Sku="Invalid inputs"
       }
       if(parseInt(Items.SellingPrice)<=0)
       {
          validActions.SellingPrice="Invalid inputs"
       }
       if(parseInt(Items.BasePrice)<=0)
       {
          validActions.BasePrice="Invalid inputs"
       }
       if(!isPatternValid(Items.Name))
       {
          validActions.Name="Invalid inputs"
       }
       if(!isPatternValid(Items.DisplayName))
       {
          validActions.DisplayName="Invalid inputs"
       }
       if(Object.keys(validActions).length>0)
       {
        setErrors(validActions);
        return false;
       }
       return true;
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
       if(Object.keys(newErrors).length>0)
       {
         setErrors(newErrors);
         return false;
       }
       return true;
    }
    const handleItem=(Items:any)=>
    {
       if(validOf())
       {
        if(validation())
        {send(Items);
          setItem({  Sku:'',
        Name:"",
        DisplayName:"",
        SellingPrice:"",
        BasePrice:"",
        Decription:""});
        navigate('/list')}
       }
    }
    const isPatternValid=(name:string):boolean=>
    {
      const pattern = /^[A-Za-z][A-Za-z\s]*$/;
      return pattern.test(name);
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
            value={Items.Name}
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
            value={Items.DisplayName}
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
            value={Items.SellingPrice}
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
            value={Items.BasePrice}
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
            value={Items.Decription}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{navigate('/list');setItem({  Sku:'',
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
