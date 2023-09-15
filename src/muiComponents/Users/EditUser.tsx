import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate, useParams } from 'react-router-dom';
import { Users } from '../../App';

interface typeCheck {
    state: Users[];
    put:(data:any)=>void;
}

const UserFormEdit: React.FC<typeCheck> = ({ state ,put}) => {
    const { id } = useParams();
    const userId=id?parseInt(id):NaN;
    const userIdDetails= state.find((each) => {
        return each.id === userId;
    })
    const navigate = useNavigate()
    const [errors, setErrors] = React.useState<any>({});
    const [Items, setItem] = React.useState({
        id:userIdDetails?.id||"",
        EmpId: userIdDetails?.EmpId.toString()||"",
        FirstName: userIdDetails?.FirstName||"",
        LastName: userIdDetails?.LastName||"",
        Email: userIdDetails?.Email||"",
        PhoneNumber: userIdDetails?.PhoneNumber.toString()||"",
        AlternativeNumber: userIdDetails?.AlternativeNumber.toString()||"",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setItem({ ...Items, [name]: value });
    }
    const handleForm = () => {
        navigate("/main/user");
    }
    const validation = (): boolean => {
        const validActions: any = {};
        if (parseInt(Items.EmpId) <= 0) {
            validActions.EmpId = "Invalid inputs"
        }
        if (parseInt(Items.PhoneNumber) <= 0) {
            validActions.Email = "Invalid inputs"
        }
        if (parseInt(Items.AlternativeNumber) <= 0) {
            validActions.PhoneNumber = "Invalid inputs"
        }
        if (!isPatternValid(Items.FirstName)) {
            validActions.FirstName = "Invalid inputs"
        }
        if (!isPatternValid(Items.LastName)) {
            validActions.LastName = "Invalid inputs"
        }
        if (Object.keys(validActions).length > 0) {
            setErrors(validActions);
            return false;
        }
        return true;
    }
    const validOf = (): boolean => {
        const newErrors: any = {};
        if (Items.EmpId === "") {
            newErrors.EmpId = "EmpId required";
        }
        if (Items.FirstName === "") {
            newErrors.FirstName = "FirstName required";
        }
        if (Items.LastName === "") {
            newErrors.LastName = "Last name required";
        }
        if (Items.PhoneNumber === "") {
            newErrors.PhoneNumber = "Phone number required";
        }
        if (Items.Email === "") {
            newErrors.Email = "Email required";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return false;
        }
        return true;
    }
    const handleItem = () => {
        if (validOf()) {
            if (validation()) {
                console.log(Items);
                
                put(Items);
                setItem({
                    id:"",
                    EmpId: '',
                    FirstName: "",
                    LastName: "",
                    Email: "",
                    PhoneNumber: "",
                    AlternativeNumber: ""
                });
                navigate('/main/user')
            }
        }
    }
    const isPatternValid = (name: string): boolean => {
        const pattern = /^[A-Za-z][A-Za-z\s]*$/;
        return pattern.test(name);
    }
    return (
        <div>
            <Dialog open={true} onClose={handleForm}>
                <DialogTitle>Add Item</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        name="EmpId"
                        margin="dense"
                        label="EmpId"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={Items.EmpId}
                        onChange={handleChange}
                        error={errors.EmpId}
                        helperText={errors.EmpId}
                    />
                    <TextField
                        name="FirstName"
                        margin="dense"
                        label="FirstName"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={Items.FirstName}
                        onChange={handleChange}
                        error={errors.FirstName}
                        helperText={errors.FirstName}
                    />
                    <TextField
                        name="LastName"
                        autoFocus
                        margin="dense"
                        label="Last name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={Items.LastName}
                        onChange={handleChange}
                        error={errors.LastName}
                        helperText={errors.LastName}
                    />
                    <TextField
                        autoFocus
                        name='Email'
                        margin="dense"
                        label="Email"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={Items.Email}
                        onChange={handleChange}
                        error={errors.Email}
                        helperText={errors.Email}
                    />
                    <TextField
                        autoFocus
                        name="PhoneNumber"
                        margin="dense"
                        label="PhoneNumber"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={Items.PhoneNumber}
                        onChange={handleChange}
                        error={errors.PhoneNumber}
                        helperText={errors.PhoneNumber}
                    />
                    <TextField
                        autoFocus
                        name="AlternativeNumber"
                        margin="dense"
                        label="AlternativeNumber"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={Items.AlternativeNumber}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        navigate('/main/user'); setItem({
                            id:"",
                            EmpId: '',
                            FirstName: "",
                            LastName: "",
                            Email: "",
                            PhoneNumber: "",
                            AlternativeNumber: ""
                        })
                    }}>Cancel</Button>
                    <Button onClick={handleItem}>Send</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default UserFormEdit;
