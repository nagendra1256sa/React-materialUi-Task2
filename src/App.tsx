import  React,{ useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Route, Routes, useNavigate } from 'react-router-dom';
import DetailCard from './muiComponents/Detail-Card';
import BasicTable from './muiComponents/listMaterial-ui';
import Login from './muiComponents/login';
import FormEdit from './muiComponents/Mui-Edit';
import FormAdd from './muiComponents/Mui-Add';
import { deleteDetails, getData, post, putData } from './muiComponents/Storage';
import Drawer from './muiComponents/Drawer';
import AuthProvider from './muiComponents/Auth';


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
export interface Row{
   id:number;
   Name:string;
   Sku:number;
   SellingPrice:number;
 }
const App:React.FC=()=>
{
 const[state,setState]=useState<Annotation[]>();
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
 },[])
 const getDetails=async()=>
 {
    const responce=await getData();
    setState(responce.data)
 }
 const postData=async(data:Annotation)=>
 {
   console.log(data);
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
    navigate("/list");
 }
 const ProtectedRoute=({element,...rest}:{element:React.ReactElement})=>
 {
   const loginData=localStorage.getItem('username')
    useEffect(()=>
     {
        if(loginData===null)
        {
          navigate("/login")
        }
     },[loginData]
    )
    if(loginData===null)
    {
      return null;
    }
    return React.cloneElement(element, rest);
 }
  return (
    <section>
      <AuthProvider>
     <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/" element={<Drawer/>}>
      <Route path="/list" element={state ? (
      <ProtectedRoute element={<DndProvider backend={HTML5Backend}><BasicTable rows={state} deleteItem={deleteData} editing={handleData} /></DndProvider>} />
       ) : null} >
      <Route path="/list/add" element={<FormAdd send={postData}/>}/>
      <Route path="/list/edit/:id" element={<FormEdit update={updateData} editData={edit}/>}/>
      <Route path="/list/detailscard/:id" element={state?<DetailCard item={state}/>:null}/>
      </Route> 
      </Route>
      </Routes>
      </AuthProvider>
    </section>
    
  );
}
export default App;