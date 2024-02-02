import './index.css'

const CovidSelect = () => (
  <div className="overall-data-con">
    <div className="cases-con">
      <p className="confirm-text">Confirmed</p>
      <img
        src="https://res.cloudinary.com/dzfhyklmn/image/upload/v1706711660/ldsocwg4j5ok5kynvugb.png"
        alt="check-mark"
        className="check-mark-img"
      />
      <p className="confirmed-cases">12345</p>
    </div>
    <div className="cases-con">
      <p className="active-text">Active</p>
      <img
        src="https://res.cloudinary.com/dzfhyklmn/image/upload/v1706668230/zvp5o9uqi4yeun59xmrg.png"
        alt="active"
        className="active-img"
      />
      <p className="active-cases">12345</p>
    </div>

    <div className="cases-con">
      <p className="recover-text">Recovered</p>
      <img
        src="https://res.cloudinary.com/dzfhyklmn/image/upload/v1706711674/wk1rf8y2sn3xhivneohm.png"
        alt="recover"
        className="recover-img"
      />
      <p className="recover-cases">12345</p>
    </div>

    <div className="cases-con">
      <p className="decreased-text">Decreased</p>
      <img
        src="https://res.cloudinary.com/dzfhyklmn/image/upload/v1706668700/cbxw01c8peva0mwwyllk.png"
        alt="decreased"
        className="decreased-img"
      />
      <p className="decreased-cases">12345</p>
    </div>
  </div>
)

export default CovidSelect
