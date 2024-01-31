import {Component} from 'react'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {status: apiStatusConstants.initial}

  componentDidMount = () => {
    this.getCovidData()
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
    console.log(responseData)
  }

  render() {
    return <h1>home</h1>
  }
}

export default Home
