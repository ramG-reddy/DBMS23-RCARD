
const updatetost = ({id,change,chgclk}) => {
    return (
      <div className="inudt">
      <div id="udttocom" className="udtele" onClick={ ()=> {
        change(id,2)
        chgclk()
        } }>
        Update to complete
      </div>
      <div id="udttoprg" className="udtele" onClick={ ()=> {
        change(id,1)
        chgclk()
      } }>
        Update to IN Progress
      </div>
    </div>
  )
}

export default updatetost
