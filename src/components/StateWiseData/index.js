import './index.css'

const StateWiseData = props => {
  const {eachState} = props
  const {name, confirmed, deceased, recovered, population, active} = eachState
  return (
    <li className="state-wise-list-con">
      <p className="li-state-ut">{name}</p>
      <p className="li-confirmed">{confirmed}</p>
      <p className="li-active">{active}</p>
      <p className="li-recovered">{recovered}</p>
      <p className="li-deceased">{deceased}</p>
      <p className="li-population">{population}</p>
    </li>
  )
}

export default StateWiseData
