// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { AddCircle, Delete, Edit } from '@mui/icons-material';
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import {  IconButton } from '@mui/material';
// import React from 'react';
// import { Annotation } from '../App';
// import '../App.css'

// interface typeCheck{
//   rows:Annotation[];
//   editing:(data:any)=>void;
//   deleteItem:(id:number)=>void;
//   sending:(data:any)=>void;
// }

// const BasicTable:React.FC<typeCheck>=({rows,editing,deleteItem,sending})=> {    
//   const navigate=useNavigate();
//   const handleEdit=(data:any)=>
//   {
//       editing(data);
//       navigate("/muilist");
//   }
//   const itemDetails=(Sku:number)=>
//   {
//      navigate(`/muilist/detailscard/${Sku}`);
//   }
//   return (<div className='table-size'>
//        <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 400 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell  style={{"fontWeight":"bold"}}>Sku</TableCell>
//             <TableCell align="left" style={{"fontWeight":"bold"}}>Name</TableCell>
//             <TableCell align="left"  style={{"fontWeight":"bold"}}>Selling Price</TableCell>
//             <TableCell align="left"  style={{"fontWeight":"bold"}}>Edit action</TableCell>
//             <TableCell align="left"  style={{"fontWeight":"bold"}}>Delete action</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow
//               key={row.Sku}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }} 
//               onClick={()=>itemDetails(row.id)} className='hover'
//             >
//               <TableCell component="th" scope="row">
//                 {row.Sku}
//               </TableCell>
//               <TableCell align='left'>{row.Name}</TableCell>
//               <TableCell align="right">{row.SellingPrice}</TableCell>
//               <TableCell align="right">
//                 <IconButton onClick={(e)=>{handleEdit(row); navigate("/muilist/edit"); e.stopPropagation()}}>
//                   <Edit/>
//                 </IconButton>
//               </TableCell>
//               <TableCell align="right">
//                 <IconButton onClick={(e)=>{deleteItem(row.id);e.stopPropagation()}}>
//                  <Delete/>
//                 </IconButton></TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//     <div className='styling'>
//         <Link to="/muilist/add">
//           <IconButton >
//             <AddCircle style={{ fontSize: '62px' , color:'#F5343e'}} />
//           </IconButton>
//         </Link>
//       </div>
//       <Outlet/>
//   </div>
//   );
// }

import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AddCircle, Delete, Edit } from '@mui/icons-material';
import { Link, Outlet } from 'react-router-dom';
import { IconButton } from '@mui/material';
import '../App.css'

interface Row{
id: number;
Sku: string;
Name: string;
SellingPrice: string;}

interface DraggableTableRowProps {
  row: Row;
  onEdits: (data: Row) => void;
  onDelete: (id: number) => void;    
}

const DraggableTableRow: React.FC<DraggableTableRowProps> = ({ row, onEdits, onDelete }) => {
  const [, ref] = useDrag({
    type: 'TABLE_ROW',
    item: { id: row.id },
  });
 
  return (
    <TableRow ref={ref} onClick={() => onEdits(row)} className="hover">
      <TableCell component="th" scope="row">
        {row.Sku}
      </TableCell>
      <TableCell align="left">{row.Name}</TableCell>
      <TableCell align="left">{row.SellingPrice}</TableCell>
      <TableCell align="left">
        <IconButton onClick={() => onEdits(row)}>
          <Edit />
        </IconButton>
      </TableCell>
      <TableCell align="left">
        <IconButton onClick={() => onDelete(row.id)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

interface DropTargetTableBodyProps {
  rows: Row[];
  onDrop: (fromIndex: number, toIndex: number) => void;
  // onEdit: (data: Annotation) => void;
  // onDelete: (id: number) => void;
}

const DropTargetTableBody: React.FC<DropTargetTableBodyProps> = ({ rows, onDrop }) => {
 
  return (
    <TableBody>
      {rows.map((row) => (
        <DraggableTableRow key={row.id} row={row} onEdits={()=>{}} onDelete={()=>{}} />
      ))}
    </TableBody>
  );
};

interface BasicTableProps {
  rows: any;
  editing: (data: any) => void;
  deleteItem: (id: number) => void;
}

const BasicTable: React.FC<BasicTableProps> = ({ rows, editing, deleteItem}) => {
  const [data, setData] = useState(rows);
  const moveRow = (dragIndex: number, hoverIndex: number) => {
    console.log(dragIndex,hoverIndex);
    
    const updatedData = [...data];
    const [moved] = updatedData.splice(dragIndex, 1);
    console.log(moved);
    
    updatedData.splice(hoverIndex, 0, moved);
    setData(updatedData);
    console.log(data);
    
  };

  return (
    <div className="table-size">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Sku</TableCell>
              <TableCell align="left" style={{ fontWeight: 'bold' }}>
                Name
              </TableCell>
              <TableCell align="left" style={{ fontWeight: 'bold' }}>
                Selling Price
              </TableCell>
              <TableCell align="left" style={{ fontWeight: 'bold' }}>
                Edit action
              </TableCell>
              <TableCell align="left" style={{ fontWeight: 'bold' }}>
                Delete action
              </TableCell>
            </TableRow>
          </TableHead>
          <DropTargetTableBody rows={rows} onDrop={moveRow} />
        </Table>
      </TableContainer>
      <div className="styling">
        <Link to="/muilist/add">
          <IconButton>
            <AddCircle style={{ fontSize: '62px', color: '#F5343e' }} />
          </IconButton>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};
export default BasicTable;
