import Item from "./item"
import { useState } from "react"
import Updatetost from "./updatetost"
const tostart = ({todo,change}) => {
    console.log(todo)
  return (
    <div id="tostartlist" className=" py-[50px] w-[32%] bg-slate-600 rounded-2xl">
            
            <div id="st" className="ram">
            TO START
            </div>
        <div className="inertodo">
            {todo.map((item,k) => {
                const [clk,setClk] = useState(false) 
                const chgclk = ()=>{
                    setClk(!clk)
                }
                if(item.t_status === 0){
                    return(
                        <div>
                            <span className="tdo" key={k} onClick={() =>{chgclk()}} >
                            <Item des={item.t_title} proj={item.project} />
                            </span>
                            {clk === true ? <Updatetost id={item.t_id} change={change} chgclk={chgclk} /> : null }
                        </div>    
                    )
                }   
            }) }
        </div>
      
    </div>
  )
}

export default tostart
