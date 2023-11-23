import Item from "./item"
import { useState } from "react"
import Updatetocom from "./Updatetocom"
const complete = ({todo,change,count}) => {
  return (
    <div className=" py-[50px] w-[32%] bg-slate-600 rounded-2xl">
        <div id="co" className="ram">
            COMPLETE
        </div>
        <div className="inertodo">
            {todo.map((item,k) => {
                const [clk,setClk] = useState(false) 
                const chgclk = ()=>(
                    setClk(!clk)
                )
                if(item.t_status === 2){
                    return(
                        <div>
                            <span className="tdo" key={k} onClick={() =>{chgclk()}} >
                            <Item des={item.t_title} proj={item.project} />
                            </span>
                            {clk === true ? <Updatetocom id={item.t_id} change={change} chgclk={chgclk} /> : null }
                        </div>    
                    )
                }   
            }) }
        </div>
    </div>
  )
}

export default complete
