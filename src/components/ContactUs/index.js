import './index.css'
import {FaGoogle} from 'react-icons/fa'
import {FaTwitter} from 'react-icons/fa'
import {FaInstagram} from 'react-icons/fa'
import {FaYoutube} from 'react-icons/fa'

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <ul className="contact-us-list">
        <li className="contact-us-list-item">
          <FaGoogle color="#3D3C3C" className="contact-us-icon" />
        </li>
        <li className="contact-us-list-item">
          <FaTwitter color="#3D3C3C" className="contact-us-icon" />
        </li>
        <li className="contact-us-list-item">
          <FaInstagram color="#3D3C3C" className="contact-us-icon" />
        </li>
        <li className="contact-us-list-item">
          <FaYoutube color="#3D3C3C" className="contact-us-icon" />
        </li>
      </ul>
      <p className="contact-us-text">Contact Us</p>
    </div>
  )
}

export default ContactUs
