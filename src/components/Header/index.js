import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <div className="header-head-con">
    <div className="header-con">
      <div className="header-covid-india-con">
        <p className="header-para">
          COVID19<span className="header-span">INDIA</span>
        </p>
      </div>
      <div className="home-about-con">
        <p className="header-home">
          <Link className="header-nav-link" to="/">
            Home
          </Link>
        </p>
        <p className="header-about">
          <Link className="header-nav-link" to="/about">
            About
          </Link>
        </p>
      </div>
    </div>
  </div>
)

export default Header
