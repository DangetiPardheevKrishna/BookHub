import './index.css'
import Navbar from '../Navbar'
import ContactUs from '../ContactUs'
import './index.css'
import {BsFillStarFill} from 'react-icons/bs'
import {Component} from 'react'

import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
  onprogress: 'ONPROGRESS',
}

class BookItemDetails extends Component {
  state = {
    bookItemDetails: {},
    apiStatus: apiStatusConstants.initial,
  }
  componentDidMount() {
    this.getBookItemDetails()
  }
  tryAgainButton = () => {
    this.getBookItemDetails()
  }
  renderSuccess = () => {
    const {bookItemDetails} = this.state
    const {
      rating,
      authorName,
      id,
      coverPic,
      title,
      readStatus,
      aboutAuthor,
      aboutBook,
    } = bookItemDetails

    return (
      <div className="bookitem-container">
        <div className="bookitem">
          <img className="bookitem-item-image" src={coverPic} alt={title} />
          <div className="bookitem-text-container">
            <h1 className="bookitem-name">{title}</h1>
            <p className="bookitem-author">{authorName}</p>
            <div className="bookitem-rating-container">
              <p className="bookitem-rating-text">Avg Rating</p>
              <BsFillStarFill color="#FBBF24" size={18} />
              <p className="bookitem-rating">{rating}</p>
            </div>
            <p className="bookitem-readstatus-text">
              Status: <span className="bookitem-readstatus">{readStatus}</span>
            </p>
          </div>
        </div>
        <hr className="separator" />
        <div>
          <h1 className="bookitem-about">About Author</h1>
          <p className="bookitem-about-description">{aboutAuthor}</p>
          <h1 className="bookitem-about">About Book</h1>
          <p className="bookitem-about-description">{aboutBook}</p>
        </div>
      </div>
    )
  }

  renderFailure = () => {
    return (
      <div className="bookitem-failure-container">
        <img
          src="https://res.cloudinary.com/djrcfvlqf/image/upload/v1728818041/Group_7522_2_iewaxv.png"
          className="failure-image"
          alt="failure view"
        />
        <p className="failure-text">Something went wrong. Please try again</p>
        <button className="try-again-button" onClick={this.tryAgainButton}>
          Try Again
        </button>
      </div>
    )
  }

  renderLoader = () => {
    return (
      <div className="bookitem-loader-container" testid="loader">
        <Loader type="ThreeDots" color="#0284C7" height={50} width={50} />
      </div>
    )
  }
  renderBookItemDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.onprogress:
        return this.renderLoader()
    }
  }
  getBookItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.onprogress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const bookDetails = data.book_details
      console.log(data)
      const updatedData = {
        id: bookDetails.id,
        title: bookDetails.title,
        authorName: bookDetails.author_name,
        coverPic: bookDetails.cover_pic,
        rating: bookDetails.rating,
        readStatus: bookDetails.read_status,
        aboutBook: bookDetails.about_book,
        aboutAuthor: bookDetails.about_author,
      }
      console.log(updatedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        bookItemDetails: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }
  render() {
    return (
      <>
        <div className="bookitem-page-main">
          <Navbar />
          <div className="bookitem-page">
            {this.renderBookItemDetails()}
            <ContactUs />
          </div>
        </div>
      </>
    )
  }
}

export default BookItemDetails
