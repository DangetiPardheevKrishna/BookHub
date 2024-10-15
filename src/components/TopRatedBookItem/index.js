import './index.css'
import {Link} from 'react-router-dom'

const TopRatedBookItem = props => {
  const {bookDetails} = props
  const {id, title, coverPic, authorName} = bookDetails

  return (
    <li className="top-rated-book-item">
      <Link className="top-rated-book-link" to={`/books/${id}`}>
        <img src={coverPic} className="top-rated-book-image" alt={title} />
        <h1 className="top-rated-book-name">{title}</h1>
         <p className="top-rated-book-author">{authorName}</p>
      </Link>
    </li>
  )
}

export default TopRatedBookItem
