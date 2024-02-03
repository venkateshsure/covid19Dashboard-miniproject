import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'
import CovidSelect from '../CovidSelect'
import StateWiseData from '../StateWiseData'
import SearchVariants from '../SearchVariants'

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
  state = {
    status: apiStatusConstants.initial,
    stateWiseData: [],
    input: '',
    searchedStates: [],
  }

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

  onChangeInput = event => {
    this.setState({input: event.target.value})
  }

  getStates = event => {
    if (event.key === 'Enter') {
      const {stateWiseData, input} = this.state
      const result = stateWiseData.filter(each =>
        each.name.toLowerCase().includes(input.toLowerCase()),
      )
      this.setState({searchedStates: result})
    }
  }

  renderSuccessView = () => {
    const {stateWiseData, input, searchedStates} = this.state
    console.log(searchedStates)
    return (
      <div className="home-head-con">
        <div className="home-search-con">
          <div className="search-input-con">
            <BsSearch className="search-icon" />
            <input
              type="search"
              placeholder="Enter the state"
              className="input"
              onChange={this.onChangeInput}
              onKeyDown={this.getStates}
              value={input}
            />
          </div>
        </div>

        {searchedStates.length === 0 ? (
          <>
            <CovidSelect stateWiseData={stateWiseData} />
            <div className="home-state-wise-data-con">
              <div className="home-table-head-con">
                <div className="home-table-head-con1">
                  <p className="home-states-ut">States/UT</p>
                  <button
                    type="button"
                    aria-label="Sort Ascending"
                    className="asc-btn"
                  >
                    <FcGenericSortingAsc />
                  </button>
                  <button
                    type="button"
                    aria-label="Sort Descending"
                    className="desc-btn"
                  >
                    <FcGenericSortingDesc />
                  </button>
                  <p className="home-confirmed">Confirmed</p>
                  <p className="home-active">Active</p>
                  <p className="home-recovered">Recovered</p>
                  <p className="home-deceased">Deceased</p>
                  <p className="home-population">Population</p>
                </div>
              </div>
              <ul className="home-table-head-con">
                {stateWiseData.map(eachState => (
                  <StateWiseData
                    key={eachState.stateCode}
                    eachState={eachState}
                  />
                ))}
              </ul>
            </div>
          </>
        ) : (
          <ul className="home-search-variants">
            {searchedStates.map(each => (
              <SearchVariants each={each} key={each.stateCode} />
            ))}
          </ul>
        )}
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
