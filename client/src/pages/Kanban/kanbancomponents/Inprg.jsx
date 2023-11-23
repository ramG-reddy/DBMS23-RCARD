import Item from "./item"
import { useState } from "react"
import Updatetoprg from "./Updatetoprg"

const Inprg = ({todo,change,count}) => {
  return (
    <div className=" py-[50px] w-[32%] bg-slate-600 rounded-2xl">
        <div id="pg" className="ram">
            IN PROGRESS
        </div>
        <div className="inertodo">
            {todo.map((item,k) => {
                const [clk,setClk] = useState(false) 
                const chgclk = ()=>(
                    setClk(!clk)
                )
                if(item.t_status === 1){
                    return(
                        <div>
                            <span className="tdo" key={k} onClick={() =>{chgclk()}} >
                            <Item des={item.t_title} proj={item.project} />
                            </span>
                            {clk === true ? <Updatetoprg id={item.t_id} change={change} chgclk={chgclk} /> : null }
                        </div>    
                    )
                }   
            }) }
        </div>
    </div>
  )
}

export default Inprg
