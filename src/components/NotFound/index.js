import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-head-con">
    <div className="not-found-con">
      <img
        src="https://res.cloudinary.com/dzfhyklmn/image/upload/v1706683927/o7rb2oce0lmtuc9g4mox.png"
        alt="not-found"
        className="not-found-img"
      />
      <h1 className="not-found-heading">PAGE NOT FOUND</h1>
      <p className="not-found-desc">
        we’re sorry, the page you requested could not be found Please go back to
        the homepage
      </p>
      <div className="not-found-btn-con">
        <button className="not-found-btn" type="button">
          <Link to="/" className="not-found-nav-link">
            Home
          </Link>
        </button>
      </div>
    </div>
  </div>
)

export default NotFound
