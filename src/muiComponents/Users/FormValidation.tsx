import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

interface TypeCheck{
    send:(data:any)=>void;
}

const validationSchema = Yup.object().shape({
    EmpId: Yup.number().min(1, 'EmpId must be greater than 0').required('EmpId is required'),
    FirstName: Yup.string().required('FirstName is required'),
    LastName: Yup.string().required('LastName is required'),
    Email: Yup.string().email('Invalid email format').required('Email is required'),
    PhoneNumber: Yup.number().integer('Phone number is must be integer').required('PhoneNumber is required'),
    AlternativeNumber: Yup.string(),
  });

const UserFormAdd:React.FC<TypeCheck> = ({ send }) => {
    const navigate = useNavigate();
  
    const formik = useFormik({
      initialValues: {
        EmpId: '',
        FirstName: '',
        LastName: '',
        Email: '',
        PhoneNumber: '',
        AlternativeNumber: '',
      },
      validationSchema,
      onSubmit: (values) => {
        if (validationSchema.isValidSync(values)) {
          send(values);
          formik.resetForm();
          navigate('/main/user');
        }
      },
    });
  
    return (
      <div>
        <Dialog open={true} onClose={()=>navigate('/main/user')}>
          <DialogTitle>Add Item</DialogTitle>
          <form onSubmit={formik.handleSubmit}>
            <DialogContent>
              <TextField
                autoFocus
                name="EmpId"
                margin="dense"
                label="EmpId"
                type="number"
                fullWidth
                variant="standard"
                value={formik.values.EmpId}
                onChange={formik.handleChange}
                error={formik.touched.EmpId && Boolean(formik.errors.EmpId)}
                helperText={formik.touched.EmpId && formik.errors.EmpId}
              />
                <TextField
            name="FirstName"
            margin="dense"
            label="FirstName"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.FirstName}
            onChange={formik.handleChange}
            error={formik.touched.FirstName&&Boolean(formik.errors.FirstName)}
            helperText={formik.touched.LastName&& formik.errors.FirstName}
          />
          <TextField
            name="LastName"
            autoFocus
            margin="dense"
            label="Last name"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.LastName}
            onChange={formik.handleChange}
            error={formik.touched.LastName&&Boolean(formik.errors.LastName)}
            helperText={formik.touched.LastName&&formik.errors.LastName}
          />
          <TextField
            autoFocus
            name='Email'
            margin="dense"
            label="Email"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.Email}
            onChange={formik.handleChange}
            error={formik.touched.Email&&Boolean(formik.errors.Email)}
            helperText={formik.touched.Email&&Boolean(formik.errors.Email)}
          />
          <TextField
            autoFocus
            name="PhoneNumber"
            margin="dense"
            label="PhoneNumber"
            type="number"
            fullWidth
            variant="standard"
            value={formik.values.PhoneNumber}
            onChange={formik.handleChange}
            error={formik.touched.PhoneNumber&&Boolean(formik.errors.PhoneNumber)}
            helperText={formik.touched.PhoneNumber&&formik.errors.PhoneNumber}
          />
          <TextField
            autoFocus
            name="AlternativeNumber"
            margin="dense"
            label="AlternativeNumber"
            type="text"
            fullWidth
            variant="standard"
            value={formik.values.AlternativeNumber}
            onChange={formik.handleChange}
          />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => navigate('/main/user')}>Cancel</Button>
              <Button type="submit">send</Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  };
  
  export default UserFormAdd;
  


