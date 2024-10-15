import './index.css'
import {Link} from 'react-router-dom'
const NotFound = () => {
  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/djrcfvlqf/image/upload/v1728835315/Group_7484_2_hre4rb.png"
        className="not-found-image"
        alt="not found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found,Please go back
        to the homepage.
      </p>
      <Link to="/">
        <button className="not-found-button" type="button">
          Go Back to Home
        </button>
      </Link>
    </div>
  )
}

export default NotFound
