import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import FormAdd from './muiadd';
import React from 'react';
import { Annotation } from '../App';

interface typeCheck{
  props:Annotation[];
  editing:(data:any)=>void;
  deleteItem:(id:number)=>void;
  
}

const BasicTable:React.FC<typeCheck>=({props,editing,deleteItem})=> {
  const [form,setcloseForm]=React.useState(false);
  const handleOpenForm=()=>
  {
     setcloseForm(true);
  }
  const navigate=useNavigate();
  const handleEdit=(data:any)=>
  {
      editing(data);
      navigate("/muilist");
  }
  return (<div>
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sku</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Selling Price</TableCell>
            <TableCell align="right">Edit action</TableCell>
            <TableCell align="right">Delete action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.map((row) => (
            <TableRow
              key={row.Sku}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Sku}
              </TableCell>
              <TableCell align='right'>{row.Name}</TableCell>
              <TableCell align="right">{row.SellingPrice}</TableCell>
              <TableCell align="right"><Edit onClick={()=>handleEdit(row)}/></TableCell>
              <TableCell align="right"><Delete /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     <Link to="/muilist/add">
     <Button variant="outlined" onClick={handleOpenForm}>
        Add Item
      </Button>
     </Link>
     <FormAdd Form={form} setForm={setcloseForm} send={function (data: Annotation): void {
      throw new Error('Function not implemented.');
    } }/>
  </div>
  );
}
export default BasicTable;