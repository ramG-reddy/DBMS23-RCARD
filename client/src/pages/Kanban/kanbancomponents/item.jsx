import "../../../App.css"
const item = ({des,proj}) => {
  return (
    <div className="tdlist">
      <h3><p><b> {des}</b></p></h3>
      <h4><p>{proj}</p></h4>
    </div>
  )
}

export default item
