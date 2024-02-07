import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'
// import CovidContext from '../../context/CovidContext'

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

class State extends Component {
  state = {
    status: apiStatusConstants.initial,
    stateData: [],
  }

  componentDidMount() {
    this.getStateData()
  }

  convertObjectsDataIntoListItemsUsingForInMethod = responseData => {
    const resultList = []
    // getting keys of an object object

    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    const stateName = statesList.filter(each => each.state_code === stateCode)

    const keyNames = Object.keys(responseData)
    const getKeyNames = keyNames.filter(each => each === stateCode)
    getKeyNames.forEach(keyName => {
      if (responseData[keyName]) {
        const {total} = responseData[keyName]
        const {districts} = responseData[keyName]
        console.log(districts)
        // if the state's covid data is available we will store it or we will store 0
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = responseData[keyName].meta.population
          ? responseData[keyName].meta.population
          : 0

        const lastUpdatedDate = responseData[keyName].meta.last_updated
        // const stateInfo = statesList.find(state => state.state_code === keyName)

        resultList.push({
          stateCode: keyName,
          name: stateName[0].state_name,
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          lastUpdatedDate,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    return resultList
  }

  getStateData = async () => {
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

    this.setState({stateData: data, status: apiStatusConstants.success})
  }

  renderSuccessView = () => {
    const {stateData} = this.state
    console.log(stateData[0].lastUpdatedDate)
    return (
      <div className="state-con">
        <div className="state-dis-con">
          <div className="state-con-top-left">
            <p className="state-con-state-name">{stateData[0].name}</p>
            <p className="state-con-updated-date">
              {stateData[0].lastUpdatedDate}
            </p>
          </div>
          <div className="state-con-top-right">
            <p className="state-con-state-tested-text">Tested</p>
            <p className="state-con-state-tested">{stateData[0].tested}</p>
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

  renderStateData = () => {
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
        <div className="state-head-con">{this.renderStateData()}</div>
        <Footer />
      </>
    )
  }
}

export default State
