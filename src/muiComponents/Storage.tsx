import axios from 'axios';
import { Users } from '../App';

const url="http://localhost:5000/list";
const UserUrl=" http://localhost:5001/Users"

export const getData=async()=>
{
    return await axios.get(url);
}
export const post=async(data:any)=>
{
    return await axios.post(url,data,{
        headers:{
            "Content-Type":"application/json"
        }
    })
}
export const deleteDetails=async(Sku:number)=>
{
     return await axios.delete(`${url}/${Sku}`);
}
export const putData=async(data:any,id:any)=>
{
    return await axios.put(url+"/"+id,data,
    {
       headers:{
         "Content-Type":"application/json"
       }
    })
}
export const getUserData=async()=>
{
    return await axios.get(UserUrl);
}
export const postUserData=async(data:Users)=>
{
    return await axios.post(UserUrl,data,{
        headers:{
            "Content-Type":"application/json"
        }
    })
}
export const putUserData=async(data:any,id:number)=>
{
    return await axios.put(UserUrl+"/"+id,data,{
        headers:{
            "Content-Type":"application/json",
        }
    })
}
export const deleteUserDetails=async(id:number)=>
{
    return await axios.delete(`${UserUrl}/${id}`);
}