import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AddCircle, Delete, Edit } from '@mui/icons-material';
import { Link, NavigateFunction, Outlet, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { Annotation } from '../App';
import '../App.css'
import { useDrag, useDrop } from 'react-dnd';

interface typeCheck {
  rows: Annotation[];
  editing: (data: any) => void;
  deleteItem: (id: number) => void;
}
interface TableRowProps {
  row: Annotation;
  onEdit: (row: Annotation) => void;
  onDelete: (id: number) => void;
  index: number;
  moveRow: (fromIndex: number, toIndex: number) => void;
  navigate: NavigateFunction;
}

const TableRows: React.FC<TableRowProps> = ({ row, onEdit, onDelete, index, moveRow, navigate }) => {
  const [, ref] = useDrag({
    type: 'TABLE_ROW',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'TABLE_ROW',
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveRow(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });
  const handleEdit = (data: Annotation) => {
    onEdit(data)
  }
  const deleteItem = (id: number) => {
    onDelete(id);
  }
  const itemDetails = (Sku: number) => {
    navigate(`/muilist/detailscard/${Sku}`);
  }
  return (<><TableRow
    key={row.Sku}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    onClick={() => itemDetails(row.id)} className='hover' ref={(data: HTMLTableRowElement | null) => ref(drop(data))}>
    <TableCell component="th" scope="row">
      {row.Sku}
    </TableCell>
    <TableCell align='left'>{row.Name}</TableCell>
    <TableCell align="right">{row.SellingPrice}</TableCell>
    <TableCell align="right">
      <IconButton onClick={(e) => { handleEdit(row); navigate("/muilist/edit"); e.stopPropagation(); }}>
        <Edit />
      </IconButton>
    </TableCell>
    <TableCell align="right">
      <IconButton onClick={(e) => { deleteItem(row.id); e.stopPropagation(); }}>
        <Delete />
      </IconButton>
    </TableCell>
    </TableRow></>)
}

const BasicTable: React.FC<typeCheck> = ({ rows, editing, deleteItem }) => {
    const [data, setData] = useState(rows);
    const navigate = useNavigate();
    const handleEdit = (editedRow: Annotation) => {
      editing(editedRow);
    };

    const handleDelete = (id: number) => {
      deleteItem(id);
    };
    const moveRow = (fromIndex: number, toIndex: number) => {
      console.log(fromIndex);
      const updatedData = [...data];
      const [movedRow] = updatedData.splice(fromIndex, 1);
      updatedData.splice(toIndex, 0, movedRow);
      setData(updatedData);
    };
    console.log(data);
    return (<div className='table-size'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ "fontWeight": "bold" }}>Sku</TableCell>
              <TableCell align="left" style={{ "fontWeight": "bold" }}>Name</TableCell>
              <TableCell align="left" style={{ "fontWeight": "bold" }}>Selling Price</TableCell>
              <TableCell align="left" style={{ "fontWeight": "bold" }}>Edit action</TableCell>
              <TableCell align="left" style={{ "fontWeight": "bold" }}>Delete action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRows key={row.id}
                row={row}
                index={index}
                moveRow={moveRow}
                onEdit={handleEdit}
                onDelete={handleDelete}
                navigate={navigate} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className='styling'>
        <Link to="/muilist/add">
          <IconButton >
            <AddCircle style={{ fontSize: '62px', color: '#F5343e' }} />
          </IconButton>
        </Link>
      </div>
      <Outlet />
    </div>
    );
  }
  export default BasicTable;