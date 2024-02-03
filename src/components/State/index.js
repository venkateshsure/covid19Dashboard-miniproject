import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class State extends Component {
  state = {
    status: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.setState({status: apiStatusConstants.inProgress})
    this.getStateData()
  }

  getStateData = async () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    console.log(stateCode)
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

  renderSuccessView = () => <h1>hi</h1>

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
        <div>{this.renderStateData()}</div>
        <Footer />
      </>
    )
  }
}

export default State
