import {Link} from 'react-router-dom'
import './index.css'

const Heading = () => (
  <div className="bg">
    <div>
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website logo"
          className="im"
        />
      </Link>
    </div>
  </div>
)
export default Heading
