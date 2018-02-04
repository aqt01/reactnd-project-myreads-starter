import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

function BookCategory (props) {
  const { title, books, onChangeBookShelf } = props;

    return (
                <div className="bookshelf">
                  <h2 className="bookshelf-title"> { title } </h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {books.length > 0 && (books.map((book, index) => (
                        <Book
                          id={book.id}
                          title={book.title}
                          imageLinks={book.imageLinks}
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
