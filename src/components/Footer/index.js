import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-head-con">
    <div className="footer-covid-india-con">
      <p className="footer-para">
        COVID19<span className="footer-span">INDIA</span>
      </p>
    </div>
    <p className="footer-desc">
      we stand with everyone fighting on the front lines
    </p>
    <div className="react-icons-con">
      <VscGithubAlt />
      <FiInstagram />
      <FaTwitter />
    </div>
  </div>
)

export default Footer
