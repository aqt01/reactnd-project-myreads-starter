import PropTypes from 'prop-types'
import React from 'react';


function Book (props) {
  const { id, title, thumbnail, shelf, authors, onChangeBookShelf } = props;
  console.log(thumbnail)

    return (
            <li>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${ thumbnail }")` }}></div>
                    <div className="book-shelf-changer"> 
                    <select value={shelf}
                        onChange={(e) => {
                          if (onChangeBookShelf) onChangeBookShelf({ id }, e.target.value)
          	              }}>                
                        <option value="" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{title}</div>
                  <div className="book-authors">
                    {(authors || []).map((author, key) => (
                    <div key={key} className="book-authors"> {Array.isArray(authors)?authors.join(', '):''} </div>)
                    )}
                  </div>
                </div>
              </li>
    )
}
Book.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired,
  }
export default Book 
