import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {status: apiStatusConstants.initial, stateWiseData: []}

  componentDidMount = () => {
    this.getCovidData()
  }

  convertObjectsDataIntoListItemsUsingForInMethod = responseData => {
    const resultList = []
    // getting keys of an object object
    const keyNames = Object.keys(responseData)

    keyNames.forEach(keyName => {
      if (responseData[keyName]) {
        const {total} = responseData[keyName]

        // if the state's covid data is available we will store it or we will store 0
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = responseData[keyName].meta.population
          ? responseData[keyName].meta.population
          : 0
        const stateInfo = statesList.find(state => state.state_code === keyName)
        if (stateInfo) {
          resultList.push({
            stateCode: keyName,
            name: stateInfo.state_name,
            confirmed,
            deceased,
            recovered,
            tested,
            population,
            active: confirmed - (deceased + recovered),
          })
        }
      }
    })
    return resultList
  }

  getCovidData = async () => {
    this.setState({status: apiStatusConstants.inProgress})
    const options = {
      method: 'GET',
    }
    const response = await fetch(
      'https://apis.ccbp.in/covid19-state-wise-data',
      options,
    )
    const responseData = await response.json()

    const data = this.convertObjectsDataIntoListItemsUsingForInMethod(
      responseData,
    )
    this.setState({stateWiseData: data, status: apiStatusConstants.success})
  }

  renderSuccessView = () => {
    const {stateWiseData} = this.state
    return (
      <div className="home-head-con">
        <div>
          <h1>search</h1>
        </div>
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
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="home-loader-con">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderCovidData = () => {
    const {status} = this.state
    switch (status) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-con">{this.renderCovidData()}</div>
        <Footer />
      </>
    )
  }
}

export default Home
