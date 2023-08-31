import  React,{ useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import DetailCard from './muiComponents/listCard';
import BasicTable from './muiComponents/listmui';
import FormAdd from './muiComponents/muiadd';
import FormEdit from './muiComponents/muiEdit';
import { deleteDetails, getData, post, putData } from './muiComponents/Storage';


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

const App:React.FC=()=>
{
 const[state,setState]=useState<Annotation[]|undefined>();
 const[edit,setEdit]=useState({
  Sku:"",
  Name:'',
  DisplayName:'',
  BasePrice:'',
  SellingPrice:'',
  Decription:'',
 })
 const navigate=useNavigate();
 useEffect(()=>
 {
   getDetails();
 },[])
 const getDetails=async()=>
 {
    const responce=await getData();
    setState(responce.data)
 }
 const postData=async(data:any)=>
 {
    await post(data);
    getDetails();
    navigate("/muilist")
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
  return (
    <div>
       <h1 style={{"textAlign":"center"}}>Menu Items</h1>
     <Routes>
      <Route>
      <Route path="/muilist" element={state?<BasicTable props={state} deleteItem={deleteData} editing={handleData} />:null}>
      <Route path="/muilist/add" element={<FormAdd send={postData} Form={false} setForm={function (value: React.SetStateAction<boolean>): void {
                 throw new Error('Function not implemented.');
              } }/>}/>
      {/* <Route path="/muilist/edit" element={<FormEdit update={updateData} editData={edit}/>}/>
      <Route path="/muilist/listCard/:Sku" element={state?<DetailCard item={state}/>:null}/> */}
      </Route>
      </Route>
      </Routes>
    </div>
    
  );
}
export default App;