import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Outlet, useNavigate } from 'react-router-dom';
import React, { memo, useCallback, useState } from 'react';
import { Users } from '../../App';
import '../../App.css'
import { useDrag, useDrop } from 'react-dnd';
import AddButton from './AddButton';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BasicMenu from './Actions';

interface TypeCheck {
  users: Users[];
  deleteItem: (id: number) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
interface TableRowProps {
  row: Users;
  index: number;
  moveRow: (fromIndex: number, toIndex: number) => void;
  deleteItem: (id: number) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const TableRows: React.FC<TableRowProps> = memo(({ row, index, moveRow, deleteItem, setOpen }) => {
  const navigate = useNavigate();
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const deleteUser = () => {
    deleteItem(row.id);
  }
  const userDetails = () => {
    setOpen(true);
    navigate(`/main/user/details/${row.id}`)
  }
  return (<><TableRow
    className='hover' onClick={userDetails} ref={(data: HTMLTableRowElement | null) => ref(drop(data))}>
    <TableCell component="th" scope="row">
      {row.EmpId}
    </TableCell>
    <TableCell align='left'>{row.FirstName}</TableCell>
    <TableCell align="left">{row.LastName}</TableCell>
    <TableCell align="left"> {row.PhoneNumber}</TableCell>
    <TableCell align="left">
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
    </TableCell>
    {
      anchorEl && <BasicMenu anchorEl={anchorEl} setAnchor={setAnchorEl} id={row.id} deleteItem={deleteUser} />
    }
  </TableRow>
  </>)
});

const UserTable: React.FC<TypeCheck> = ({ users, deleteItem, setOpen }) => {

  const [data, setData] = useState(users);
  const moveRow = useCallback((fromIndex: number, toIndex: number) => {
    const updatedData = [...data];
    const [movedRow] = updatedData.splice(fromIndex, 1);
    updatedData.splice(toIndex, 0, movedRow);
    setData(updatedData);
  }, [data]);
  return (<div className='table-size'>
    <h1 style={{ textAlign: "center", marginTop: "60px" }}>User Details</h1>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ "fontWeight": "bold" }}>EmpId</TableCell>
            <TableCell align="left" style={{ "fontWeight": "bold" }}>First Name</TableCell>
            <TableCell align="left" style={{ "fontWeight": "bold" }}>Last Name</TableCell>
            <TableCell align="left" style={{ "fontWeight": "bold" }}>Phone Number</TableCell>
            <TableCell align="left" style={{ "fontWeight": "bold" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map((each, index) =>
            (
              <TableRows key={each.id} row={each} index={index} moveRow={moveRow} deleteItem={deleteItem} setOpen={setOpen} />
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
    <Outlet />
    <AddButton />
  </div>
  );
}
export default UserTable;
