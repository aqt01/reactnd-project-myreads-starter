import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import BookCategory from './BookCategory'


function ListBooks (props) {
  const { books, onChangeBookShelf } = props

    return (    <div>
                    <BookCategory 
                      title="Currently Reading"
                      books={books.filter(b => b.shelf === "currentlyReading")}
                      onChangeBookShelf={onChangeBookShelf}/>
                    <BookCategory 
                      title="Want to Read"
                      books={books.filter(b => b.shelf === "wantToRead")}
                      onChangeBookShelf={onChangeBookShelf}/>
                    <BookCategory 
                      title="Read"
                      books={books.filter(b => b.shelf === "read")}
                      onChangeBookShelf={onChangeBookShelf}
                    />
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
            </div>

    )
}

  ListBooks.propTypes = {
    books: PropTypes.array.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired
  }

export default ListBooks

