import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'
import CovidContext from '../../context/CovidContext'

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
    this.getStateData()
  }

  getStateData = async () => {
    this.setState({status: apiStatusConstants.success})
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    console.log(stateCode)
  }

  renderSuccessView = () => {
    console.log('consumer')
    return (
      <CovidContext.Consumer>
        {value => {
          const {stateWiseData} = value
          console.log(stateWiseData)
          return <h1>hii</h1>
        }}
      </CovidContext.Consumer>
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
