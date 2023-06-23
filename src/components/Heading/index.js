import {Link} from 'react-router-dom'
import './index.css'

const Heading = () => (
  <Link to="/">
    <div className="bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
        className="im"
      />
    </div>
  </Link>
)
export default Heading
