import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { ListItemIcon } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';


interface typeCheck
{
  anchorEl:HTMLElement|null;
  setAnchor:React.Dispatch<React.SetStateAction<HTMLElement|null>>;
  id:number;
  deleteItem:()=>void;
}

const BasicMenu:React.FC<typeCheck>=({anchorEl,setAnchor,id,deleteItem})=>{
  const navigate=useNavigate();
  const open = Boolean(anchorEl);
  const handleAction = (action:string,e:React.MouseEvent<HTMLLIElement,MouseEvent>) => {
    if(action==="edit")
    {
        e.stopPropagation();
        navigate(`/main/user/edit/${id}`);
        setAnchor(null);
    }
    if(action==="delete")
    {
      e.stopPropagation();
      deleteItem();
      setAnchor(null)
    }
  };

  return (
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={(e:React.MouseEvent<HTMLLIElement,MouseEvent>)=>{ setAnchor(null);e.stopPropagation()}}
      >
        <MenuItem onClick={(e)=>handleAction("delete",e)}>
        <ListItemIcon>
            <Delete/>
          </ListItemIcon>
          Delete action</MenuItem>
        <MenuItem onClick={(e)=>handleAction("edit",e)}>
        <ListItemIcon>
            <Edit/>
          </ListItemIcon>
          Edit action</MenuItem>
      </Menu>
  );
}
export default BasicMenu;
