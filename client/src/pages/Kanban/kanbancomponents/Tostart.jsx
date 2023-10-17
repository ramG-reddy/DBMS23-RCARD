import Item from "./item"
import { useState } from "react"
import Updatetost from "./updatetost"
const tostart = ({todo,change}) => {
    console.log(todo)
  return (
    <div id="tostartlist" className="stat">
            
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
