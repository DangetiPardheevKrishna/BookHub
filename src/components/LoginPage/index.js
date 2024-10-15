import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
class LoginPage extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}
  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }
  onChangePassword = event => {
    this.setState({password: event.target.value})
  }
  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }
  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showErrorMsg: true})
  }
  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    if ((username !== '') & (password !== '')) {
      const response = await fetch(url, options)
      console.log(response)
      const data = await response.json()
      console.log(data)
      if (response.ok) {
        this.onSubmitSuccess(data.jwt_token)
      } else {
        this.onSubmitFailure(data.error_msg)
      }
    }
  }
  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    console.log(showErrorMsg, errorMsg)
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-container">
        <div className="login-app-container">
          <div className="login-page-image-container">
            <img
              src="https://res.cloudinary.com/djrcfvlqf/image/upload/v1728728342/rkypy4rqjvib7qxhznel.jpg"
              className="login-page-image"
              alt="website login"
            />
          </div>
          <div className="login-section">
            <div className="login-container">
              <img
                src="https://res.cloudinary.com/djrcfvlqf/image/upload/v1728729611/Group_7731_2_2_n9mhtp.png"
                className="login-page-logo"
                alt="login website logo"
              />
              <form className="form-container" onSubmit={this.onSubmitForm}>
                <div className="login-page-input-container">
                  <label className="login-page-label" htmlFor="username">
                    Username*
                  </label>
                  <input
                    className="login-page-input"
                    type="text"
                    id="username"
                    placeholder="Enter username"
                    onChange={this.onChangeUsername}
                    value={username}
                  />
                </div>
                <div className="login-page-input-container">
                  <label className="login-page-label" htmlFor="password">
                    Password*
                  </label>
                  <input
                    className="login-page-input"
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    onChange={this.onChangePassword}
                    value={password}
                  />
                </div>
                {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
                <button
                  className="login-button"
                  type="submit"
                  id="button"
                  onClick={this.onSubmitForm}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage
