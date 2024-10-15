import Navbar from '../Navbar'
import ContactUs from '../ContactUs'
import './index.css'
import {Component} from 'react'
import BookItem from '../BookItem'
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

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class Bookshelves extends Component {
  state = {
    bookshelvesData: [],
    apiStatus: apiStatusConstants.initial,
    bookshelfName: 'ALL',
    searchInput: '',
    searchText: '',
  }
  componentDidMount() {
    this.getBookShelvesList()
  }
  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }
  onClickSearchButton = () => {
    const {searchInput} = this.state
    this.setState({searchText: searchInput}, this.getBookShelvesList)
  }
  onClickBookshelvesItem = value => {
    this.setState({bookshelfName: value}, this.getBookShelvesList)
  }
  renderSuccess = () => {
    const {bookshelvesData, searchText} = this.state
    return bookshelvesData.length > 0 ? (
      <ul className="bookshelves-books-list">
        {bookshelvesData.map(eachBook => (
          <BookItem key={eachBook.id} bookDetails={eachBook} />
        ))}
      </ul>
    ) : (
      <div className="no-search-results-container">
        <img
          src="https://res.cloudinary.com/djrcfvlqf/image/upload/v1728837360/Group_ftijrf.png"
          className="no-search-results-image"
          alt="no books"
        />
        <p className="no-search-results-text">
          Your search for {searchText} did not find any matches.
        </p>
      </div>
    )
  }
  onClickTryAgain = () => {
    this.getBookShelvesList()
  }
  renderFailure = () => {
    return (
      <div className="bookshelves-failure-container">
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
      <div className="bookshelves-loader-container" testid="loader">
        <Loader type="ThreeDots" color="#0284C7" height={50} width={50} />
      </div>
    )
  }
  renderBookShelves = () => {
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
  getBookShelvesList = async () => {
    this.setState({apiStatus: apiStatusConstants.onprogress})
    const {bookshelfName, searchText} = this.state
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {Authorization: `bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.books.map(eachBook => ({
        id: eachBook.id,
        title: eachBook.title,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        rating: eachBook.rating,
        readStatus: eachBook.read_status,
      }))
      console.log(updatedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        bookshelvesData: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }
  render() {
    const {bookshelvesData, bookshelfName, searchInput} = this.state
    const bookshelfNameLabelItem = bookshelvesList.filter(
      eachItem => eachItem.value === bookshelfName,
    )
    const bookshelfNameLabel = bookshelfNameLabelItem[0].label

    return (
      <>
        <div className="bookshelves-page-main">
          <Navbar />
          <div className="bookshelves-page-container">
            <div className="bookshelves-header">
              <h1 className="bookshelves-list-heading">BookShelves</h1>
              <ul className="bookshelves-list">
                {bookshelvesList.map(eachList => {
                  const activeClassName =
                    eachList.value === bookshelfName ? 'active-list-item' : ''
                  const onClickListItem = () => {
                    this.onClickBookshelvesItem(eachList.value)
                  }
                  return (
                    <button
                      className="bookshelves-list-item-button"
                      onClick={onClickListItem}
                      key={eachList.value}
                    >
                      {' '}
                      <li
                        className={`bookshelves-list-item ${activeClassName}`}
                      >
                        {eachList.label}
                      </li>
                    </button>
                  )
                })}
              </ul>
            </div>
            <div className="bookshelves-books-section">
              <div className="bookshelves-books-container">
                <div className="bookshelves-books-container-top-section">
                  <h1 className="bookshelves-books-container-heading">
                    {bookshelfNameLabel} Books
                  </h1>{' '}
                  <div className="input-container">
                    <input
                      type="search"
                      className="input"
                      onChange={this.onChangeSearchInput}
                      placeholder="Search"
                      value={searchInput}
                    />
                    <button
                      className="search-button-container"
                      testid="searchButton"
                      onClick={this.onClickSearchButton}
                      type="button"
                    >
                      <BsSearch color="#94A3B8" size={18} />
                    </button>
                  </div>
                </div>
                {this.renderBookShelves()}
              </div>
              <ContactUs />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Bookshelves
