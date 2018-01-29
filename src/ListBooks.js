import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired
  }
  state = {
    query: ''
  }
  render() {
    const { title, books, onChangeBookShelf } = this.props;
    const { query } = this.state;
    return (
                <div className="bookshelf">
                  <h2 className="bookshelf-title"> { title } </h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {books.length > 0 && (books.map((book, index) => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                            <div className="book-shelf-changer">
                            <select value={book.shelf}>
                                <option value="" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">
                            {(book.authors || []).map((author, index) => (
                            <div key={index}>{author}</div>)
                            )}
                          </div>
                        </div>
                      </li>
                    )))}
                    </ol>
                  </div>
                </div>
    )
  }
}

export default ListBooks 
