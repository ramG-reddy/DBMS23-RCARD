
const updatetost = ({id,change,chgclk}) => {
    return (
      <div className="inudt">
      <div id="udttoprg" className="udtele" onClick={ ()=> {
        change(id,1)
        chgclk()
        } }>
        Update to IN Progress
      </div>
      <div id="udttotost" className="udtele" onClick={ ()=> {
        change(id,0)
        chgclk()
      } }>
        Update to To Start
      </div>
    </div>
  )
}

export default updatetost
