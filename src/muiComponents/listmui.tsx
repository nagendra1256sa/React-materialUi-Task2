import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AddCircle, Delete, Edit } from '@mui/icons-material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {  IconButton } from '@mui/material';
import React from 'react';
import { Annotation } from '../App';
import '../App.css'

interface typeCheck{
  props:Annotation[];
  editing:(data:any)=>void;
  deleteItem:(id:number)=>void;
  sending:(data:any)=>void;
}

const BasicTable:React.FC<typeCheck>=({props,editing,deleteItem,sending})=> {    
  const navigate=useNavigate();
  const handleEdit=(data:any)=>
  {
      editing(data);
      navigate("/muilist");
  }
  const itemDetails=(Sku:number)=>
  {
     navigate(`/muilist/detailscard/${Sku}`);
  }
  return (<div className='table-size'>
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
              onClick={()=>itemDetails(row.id)}
            >
              <TableCell component="th" scope="row">
                {row.Sku}
              </TableCell>
              <TableCell align='right'>{row.Name}</TableCell>
              <TableCell align="right">{row.SellingPrice}</TableCell>
              <TableCell align="right">
                <IconButton onClick={(e)=>{handleEdit(row); navigate("/muilist/edit"); e.stopPropagation()}}>
                  <Edit/>
                </IconButton>
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={(e)=>{deleteItem(row.id);e.stopPropagation()}}>
                 <Delete/>
                </IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div style={{"textAlign":"right"}}>
        <Link to="/muilist/add">
          <IconButton >
            <AddCircle style={{ fontSize: '62px'}} />
          </IconButton>
        </Link>
      </div>
      <Outlet/>
  </div>
  );
}
export default BasicTable;