import axios from 'axios';
import Sidebar from './sidebar';
import { useParams } from 'react-router-dom';
import { useState ,useEffect} from "react";
import addNotification from 'react-push-notification'; 
import { Notifications } from 'react-push-notification'; 
const Todo =()=>{
const [edit,Setedit]=useState(false);  
const [items,Setitems]=useState([]);
const [nitem,Setnitem]=useState("");
const [tags,Settags]=useState("");
const [up,Setup]=useState("");
const uname=useParams().username;

useEffect(()=>{
    axios.get('http://localhost:3002/todos/todos').then((response)=> Setitems(response.data)).catch((err)=> console.log(err));

},[items]);
let count= items.length;
console.log(count);
const handleChange=()=>{
    axios.post('http://localhost:3002/todos/create',{"Title":nitem,"Tags":tags,"uname":uname,"project":"p1"}).then((response)=> console.log(response)).catch((err)=>(err))
    addNotification({ 
      title: 'ADDED A TODO', 
      native:true         
    })
};
 const handleDelete=(id)=>{
    
    axios.delete(`http://localhost:3002/todos/`+`${id}`).then((res)=>console.log(res)).catch((err)=>console.log(err));
    addNotification({ 
      title: 'DELETED A ITEM', 
      native:true         
    })
};
const handleedit =(id) =>{
  axios.put(`http://localhost:3002/todos/update/`+`${id}`).then((res)=>console.log(res)).catch((err)=>console.log(err));
}

return(<>
<Notifications /> 
<Sidebar name={uname}/>
<div className="p-4 sm:ml-64">
  {edit && <>
  <div className='absolute w-[50%] h-[50%]'>
  <input className=" bg-slate-100 rounded-md p-4 mt-1" 
        type="text"
        value={up}
        onChange = {(e)=>{
          Setup(e.target.value);
        }}
        placeholder="updated ........"
  /> 
  <button className="delete" onClick={() => {Setedit(!edit);handleedit()}}>CLOSE</button>
    
    </div></> }
<div className=" flex flex-col items-center">
        <h1 className=" text-4xl m-16 font-bold">Simple Todo App</h1>
      <div className="p-6">
        <input className=" bg-slate-100 rounded-md p-4 m-1" 
        type="text"
        value={nitem}
        onChange = {(e)=>{
          Setnitem(e.target.value);
        }}
        placeholder="Create a new todo"
        />
        
      </div>
      <div className="p-6">
        <input className=" bg-slate-100 rounded-md p-4 mt-1" 
        type="text"
        value={tags}
        onChange = {(e)=>{
          Settags(e.target.value);
        }}
        placeholder="Create a tags for todo"
        />
       
      </div>
      <button onClick={handleChange} 
        className=" bg-green-500 text-white p-3 m-3 rounded-md font-bold hover:bg-green-600">Add Tasks</button>
       <br/>
      <div className="w-[490px]">{/* here is data */}
         {items.map((item)=>{
                let str=`${item.tags}`;
                console.log(str,"-->",typeof (item.tags),typeof(str),item);
                let array_new=(str.split(","));
                
                
            return (
               <div key={item.T_id} className="p-3 m-4 rounded-lg w-100 flex flex-col outline card">
                      
                     <div className="flex  flex-row justify-between mb-4">
                      <div className="text-blue-400 font-extrabold text-4xl inline">Tid :{item.t_id}</div>
                      <div className="text-blue-600 font-extrabold inline text-2xl">{item.t_title}</div>
                      <div className="text-blue-600 font-extrabold inline text-2xl">Project:{item.project}</div>
                     

                     </div>
                     <div className="flex flex-row justify-end text-right ">
                         { array_new.map((n,key)=>{
                        return(
                            
                            <button key={key} className='px-1.25 h-[1%] ml-2 text-blue-600 rounded-full text-sans  text-center tags'>#{n}</button>
                          
                        );
                        }) }
                     </div>
                     <div className='flex flex-row justify-between mt-[20px]'>
                       <div className="">
                        <button className=" delete text-red-500 mr-2 text-lg font-semibold " onClick={()=>handleDelete(item.t_id)}>DELETE</button>
                        <button className="edit w-[70.8px] text-lg text-blue-500 font-bold" onClick={()=> Setedit(!edit)}>EDIT</button>
                       </div>
                       <div>
                        <button className='card text-lg create'>+CREATE</button>
                       </div>
                       
                       


                     </div>
                     
                     
               </div>
            );
         })}
      </div> 
    </div>
</div>



</>);
};
export default Todo;