import axios from 'axios';

const url="http://localhost:5000/list";

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