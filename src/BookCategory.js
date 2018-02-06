import React from 'react';
import PropTypes from 'prop-types'
import Book from './Book'

const placeholderImage = 'http://via.placeholder.com/128x193';

function BookCategory (props) {
  const { title, books, onChangeBookShelf } = props;

    return (
                <div className="bookshelf">
                  <h2 className="bookshelf-title"> { title } </h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {books.length > 0 && (books.map((book) => (
                        <Book
                          id={book.id}
                          key={book.id}
                          title={book.title}
                          thumbnail={ (book.imageLinks || {} ).thumbnail || placeholderImage}
                          shelf={book.shelf}
                          authors={book.authors}
                          onChangeBookShelf={onChangeBookShelf}
                        />
                    )))}
                    </ol>
                  </div>
                </div>
    )
} 

  BookCategory.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired
  }

export default BookCategory 
