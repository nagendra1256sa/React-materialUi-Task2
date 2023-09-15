import  React,{ useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Routes, useNavigate } from 'react-router-dom';
import DetailCard from './muiComponents/Detail-Card';
import BasicTable from './muiComponents/listMaterial-ui';
import Login from './muiComponents/login';
import FormEdit from './muiComponents/Mui-Edit';
import FormAdd from './muiComponents/Mui-Add';
import { deleteDetails, deleteUserDetails, getData, getUserData, post, postUserData, putData, putUserData } from './muiComponents/Storage';
import AuthProvider from './muiComponents/Auth';
import DrawerList from './muiComponents/Drawer';
import UserTable from './muiComponents/Users/Users';
import UserFormEdit from './muiComponents/Users/EditUser';
import UserDetails from './muiComponents/Users/UserDetails';
import UserFormAdd from './muiComponents/Users/FormValidation';


export interface Annotation
{
   id:number
  Sku:number;
  Name:string;
  DisplayName:string;
  BasePrice:string;
  SellingPrice:string;
  Decription:string
}
export interface Users{
    id:number;
    EmpId:number
    FirstName:string;
    LastName:string;
    Email:string;
    PhoneNumber:number;
    AlternativeNumber:number;
 }
const App:React.FC=()=>
{
 const[state,setState]=useState<Annotation[]>();
 const[users,setUsers]=useState<Users[]>();
 const [open, setOpen] = React.useState(false);
 const navigate=useNavigate();
 const[edit,setEdit]=useState({
  Sku:"",
  Name:'',
  DisplayName:'',
  BasePrice:'',
  SellingPrice:'',
  Decription:'', 
 })
 useEffect(()=>
 {
   getDetails();
   getUserDetails();
 },[])
 const getDetails=async()=>
 {
    const responce=await getData();
    setState(responce.data)
 }
 const postData=async(data:Annotation)=>
 {
    await post(data);
    getDetails();
    navigate("/list")
 }
 const deleteData=async(id:number)=>
 {
    await deleteDetails(id);
    getDetails();
 }
 const handleData=(data:any)=>
 {
    setEdit(data);
 }
 const updateData=async(data:any)=>
 {
    await putData(data,data.id);
    getDetails();
    navigate("/main/list");
 }
 const ProtectedRoute=({element,...rest}:{element:React.ReactElement})=>
 {
   const loginData=localStorage.getItem('username')
    useEffect(()=>
     {
        if(loginData===null)
        {
          navigate("/")
        }
     },[loginData])
    if(loginData===null)
    {
      return null;
    }
    return React.cloneElement(element, rest);
 }
 const getUserDetails=async()=>
 {
   const responce=await getUserData();
   setUsers(responce.data);
 }
 const postUserDetails=async(data:Users)=>
 {
    await postUserData(data);
    getUserDetails();
    navigate("/main/user");
 }
 const putDetails=async(data:any)=>
 {
  console.log(data.id);
  
   await putUserData(data,data.id);
   getUserDetails();
 }
 const deleteUserData=async(id:number)=>
 {
    await deleteUserDetails(id);
    getUserDetails();
 }
  return (
    <section>
      <AuthProvider>
     <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/main" element={<DrawerList/>}>
      <Route path="/main/list" element={state ? (
      <ProtectedRoute element={<DndProvider backend={HTML5Backend}><BasicTable rows={state} deleteItem={deleteData} editing={handleData} /></DndProvider>} />
       ) : null} >
      <Route path="/main/list/add" element={<FormAdd send={postData}/>}/>
      <Route path="/main/list/edit/:id" element={<FormEdit update={updateData} editData={edit}/>}/>
      <Route path="/main/list/detailscard/:id" element={state?<DetailCard item={state}/>:null}/>
      </Route> 
      <Route path="/main/user" element={users ? (
      <ProtectedRoute element={<DndProvider backend={HTML5Backend}><UserTable users={users} deleteItem={deleteUserData}  setOpen={setOpen}/></DndProvider>} />
       ) : null}>
        <Route path="/main/user/add"  element={<UserFormAdd send={postUserDetails}/>}/>
        <Route path="/main/user/edit/:id" element={users?<UserFormEdit state={users} put={putDetails}/>:null}/>
        <Route path="/main/user/details/:id" element={users?<UserDetails  state={users} open={open} setOpen={setOpen}/>:null}/>
      </Route>
      </Route>
      </Routes>
      </AuthProvider>
    </section>
    
  );
}
export default App;