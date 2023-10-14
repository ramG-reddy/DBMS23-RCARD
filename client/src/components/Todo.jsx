import axios from 'axios';
import Sidebar from './sidebar';
import { useState ,useEffect} from "react";
import addNotification from 'react-push-notification'; 
import { Notifications } from 'react-push-notification'; 
const Todo =()=>{
const [items,Setitems]=useState([]);
const [nitem,Setnitem]=useState("");
const [tags,Settags]=useState("");


useEffect(()=>{
    axios.get('http://localhost:3002/todos/todos').then((response)=> Setitems(response.data)).catch((err)=> console.log(err));

},[]);
let count= items.length;
console.log(count);
const handleChange=()=>{
    axios.post('http://localhost:3002/todos/create',{"Title":nitem,"Tags":tags,"T_id":(count+1)})
    addNotification({ 
      title: 'ADDED A TODO', 
      native:true         
    })
};
const handleDelete=(id)=>{
    console.log(id,`http://localhost:3002/todos/`+`${id}`);
    axios.delete(`http://localhost:3002/todos/`+`${id}`).then((res)=>console.log(res)).catch((err)=>console.log(err));
    addNotification({ 
      title: 'DELETED A ITEM', 
      native:true         
    })
};

return(<>
<Notifications /> 
<Sidebar name={uname}/>
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
      <div className="w-[450px]">{/* here is data */}
         {items.map((item)=>{
                /* const str=item.Tags.toString();
                console.log(str,"-->",typeof (item.Tags),typeof(str));
                const path=str.spilt(" ");
                console.log(path); */
                
            return (
               <div key={item.T_id} className="p-3 m-2 rounded-xl w-100 flex justify-between">
                     <p className="text-left text-black inline">{item.Title}</p>  
                     {/* {array_new.map((n,key)=>{
                        return(
                            
                            <span key={key}>n</span>
                            
                        );
                        })} */}
                     <div className>  
                     <button className="btn p-1 text-right rounded-xl text-white bg-indigo-500">EDIT</button>
                     <button className="btn p-1 text-right rounded-xl text-white bg-red-500" onClick={() => handleDelete(item.T_id)}>DELETE</button>
                     </div>
               </div>
            );
         })}
      </div> 
    </div>




</>);
};
export default Todo;