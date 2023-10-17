
const updatetost = ({id,change,chgclk}) => {
    return (
      <div className="inudt">
      <div id="udttocom" className="udtele" onClick={ ()=> {
        change(id,2)
        chgclk()
        } }>
        Update to complete
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
