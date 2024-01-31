import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Footer from '../Footer'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class About extends Component {
  state = {status: apiStatusConstants.initial, data: []}

  componentDidMount = () => {
    this.getFaqs()
  }

  getFaqs = async () => {
    this.setState({status: apiStatusConstants.inProgress})
    const options = {
      method: 'GET',
    }
    const response = await fetch('https://apis.ccbp.in/covid19-faqs', options)
    const responseData = await response.json()
    if (response.ok) {
      const faqsData = responseData.faq.filter(each => each.answer !== 'No.')
      this.setState({data: faqsData, status: apiStatusConstants.success})
    }
  }

  renderSuccessView = () => {
    const {data} = this.state
    return (
      <div className="success-con">
        <h1 className="about-head">About</h1>
        <p className="about-para-two">Last update on march 28th 2021.</p>
        <p className="about-para-third">
          COVID-19 vaccines be ready for distribution
        </p>
        <div className="faq-con">
          {data.map(eachFaq => (
            <>
              <p className="faq-ques">{eachFaq.question}</p>
              <p className="faq-ans">{eachFaq.answer}</p>
            </>
          ))}
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-con">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFaqs = () => {
    const {status} = this.state
    switch (status) {
      case apiStatusConstants.success:
        return this.renderSuccessView()

      case apiStatusConstants.failure:
        return this.renderFailureView()
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
        <div className="about-con">{this.renderFaqs()}</div>
        <Footer />
      </>
    )
  }
}

export default About
