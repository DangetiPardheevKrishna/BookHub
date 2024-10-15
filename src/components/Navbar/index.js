import './index.css'
import {Link, withRouter} from 'react-router-dom'
import {IoIosCloseCircle} from 'react-icons/io'
import {IoMenu} from 'react-icons/io5'
import {Component} from 'react'
import Cookies from 'js-cookie'
class Navbar extends Component {
  state = {showNav: false}
  onClickMenu = () => {
    this.setState(prevState => ({showNav: !prevState.showNav}))
  }
  onClickClose = () => {
    this.setState({showNav: false})
  }
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  render() {
    const {showNav} = this.state
    const isActivePath = path => document.location.pathname === path
    return (
      <nav className="header">
        <div className="header-desktop">
          {' '}
          <div className="header-content">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/djrcfvlqf/image/upload/v1728729611/Group_7731_2_2_n9mhtp.png"
                className="header-logo"
                alt="website logo"
              />
            </Link>
            <ul className="header-list">
              <Link className="header-link-item" to="/">
                <li
                  style={
                    isActivePath('/')
                      ? {color: '#0284C7', fontWeight: 500}
                      : null
                  }
                >
                  Home
                </li>
              </Link>
              <Link className="header-link-item" to="/shelf">
                <li
                  style={
                    isActivePath('/shelf')
                      ? {color: '#0284C7', fontWeight: 500}
                      : null
                  }
                >
                  Bookshelves
                </li>
              </Link>
              <button className="logout-button" onClick={this.onClickLogout}>
                Logout
              </button>
            </ul>
            <button className="menu-button" onClick={this.onClickMenu}>
              <IoMenu className="menu-item" color="#334155" size={24} />
            </button>
          </div>
        </div>

        {showNav && (
          <ul className="header-list-mobile">
            <Link className="header-link-item" to="/">
              <li
                style={
                  isActivePath('/') ? {color: '#0284C7', fontWeight: 500} : null
                }
              >
                Home
              </li>
            </Link>
            <Link className="header-link-item" to="/shelf">
              <li
                style={
                  isActivePath('/shelf')
                    ? {color: '#0284C7', fontWeight: 500}
                    : null
                }
              >
                Bookshelves
              </li>
            </Link>
            <button className="logout-button" onClick={this.onClickLogout}>
              Logout
            </button>
            <button className="close-button" onClick={this.onClickClose}>
              <IoIosCloseCircle color="#334155" size={24} />
            </button>
          </ul>
        )}
      </nav>
    )
  }
}

export default withRouter(Navbar)
