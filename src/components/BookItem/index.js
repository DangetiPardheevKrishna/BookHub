import './index.css'
import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
const BookItem = props => {
  const {bookDetails} = props
  const {rating, authorName, id, coverPic, title, readStatus} = bookDetails
  return (
    <li className="bookshelves-book-list-item">
      <Link className="bookshelves-link-item" to={`/books/${id}`}>
        <img className="bookshelves-item-image" src={coverPic} alt={title} />
        <div className="bookshelves-text-container">
          <h1 className="bookshelves-name">{title}</h1>
          <p className="bookshelves-author">{authorName}</p>
          <div className="bookshelves-rating-container">
            <p className="bookshelves-rating-text">Avg Rating</p>
            <BsFillStarFill color="#FBBF24" size={16} />
            <p className="bookshelves-rating">{rating}</p>
          </div>
          <p className="bookshelves-readstatus-text">
            Status: <span className="bookshelves-readstatus">{readStatus}</span>
          </p>
        </div>
      </Link>
    </li>
  )
}
export default BookItem
