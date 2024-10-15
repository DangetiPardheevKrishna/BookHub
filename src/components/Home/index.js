import Navbar from '../Navbar'
import ContactUs from '../ContactUs'
import TopRatedBookItem from '../TopRatedBookItem'
import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
  onprogress: 'ONPROGRESS',
}
var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
}
class Home extends Component {
  state = {topRatedBooksList: [], apiStatus: apiStatusConstants.initial}
  componentDidMount() {
    this.getTopBooks()
  }
  renderSuccess = () => {
    const {topRatedBooksList} = this.state
    console.log(topRatedBooksList)
    return (
      <div className="slider-container">
        <ul className="slider-list">
          <Slider {...settings}>
            {topRatedBooksList.map(eachBook => (
              <TopRatedBookItem key={eachBook.id} bookDetails={eachBook} />
            ))}
          </Slider>
        </ul>
      </div>
    )
  }
  onClickTryAgain = () => {
    this.getTopBooks()
  }
  renderFailure = () => {
    return (
      <div className="failure-container">
        <img
          src="https://res.cloudinary.com/djrcfvlqf/image/upload/v1728818041/Group_7522_2_iewaxv.png"
          className="failure-image"
          alt="failure view"
        />
        <p className="failure-text">Something went wrong. Please try again</p>
        <button className="try-again-button" onClick={this.onClickTryAgain}>
          Try Again
        </button>
      </div>
    )
  }
  renderLoader = () => {
    return (
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
      </div>
    )
  }
  renderTopRatedBooks = () => {
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
  getTopBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.onprogress})
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const updatedData = data.books.map(eachBook => ({
        id: eachBook.id,
        title: eachBook.title,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        topRatedBooksList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  render() {
    return (
      <>
        <div className="home-page-main">
          <Navbar />
          <div className="home-page-container">
            <div className="home-page-text-container">
              <h1 className="home-page-main-heading">
                Find Your Next Favorite Books?
              </h1>
              <p className="home-page-description">
                You are in the right place. Tell us what titles or genres you
                have enjoyed in the past, and we will give you surprisingly
                insightful recommendations.
              </p>
              <Link className="find-books-link" to="/shelf">
                <button className="find-books-button-mobile">Find Books</button>
              </Link>
            </div>
            <div className="slider-section">
              <div className="slider-text-container">
                <h1 className="slider-text">Top Rated Books</h1>
                <Link className="find-books-link" to="/shelf">
                  <button className="find-books-button-desktop">
                    Find Books
                  </button>
                </Link>
              </div>
              {this.renderTopRatedBooks()}
            </div>
            <ContactUs />
          </div>
        </div>
      </>
    )
  }
}

export default Home
