import {Component} from 'react'
import Loader from 'react-loader-spinner'

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
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    console.log(stateCode)
  }

  renderSuccessView = () => <p>success</p>

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
    return <div>{this.renderStateData()}</div>
  }
}

export default State
