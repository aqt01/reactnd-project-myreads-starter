import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import Book from './Book'


class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired
  }

  constructor(props) {
  super(props)
    this.state = {
      loading: false,
      searchResult: []
    }
  }

  updateSearch = (query) => {

    if (query=='') { // If no search is specified. We bring all books
    } else {
      BooksAPI.search(query).then(books => {
        if (!Array.isArray(books)) {
          this.setState({
            searchResult: []
          })
          return
        }
        
        this.setState({
          searchResult: books.map(book => {
            const found = this.props.books.find(b => book.id === b.id)
            if (found)
              book.shelf = found.shelf
            else
              book.shelf = 'none'
            return book
          })
      	})
      })
    }

  }
  removeBook = (book) => {
    this.setState((state) => ({
      contacts: state.books.filter((c) => c.id !== book.id)
    }))
  }

  onChangeBookShelf = (book, shelf) => {
    const found = this.state.searchResult.find(b => book.id === b.id)
    this.setState(state => ({
      searchResult: state.searchResult.map(b => {
        if (b.id === book.id) {
          b.shelf = shelf
        }
        return b
      })
    }))
    this.props.onChangeBookShelf(found, shelf)
  }
  
  componentDidMount() {
   	document.querySelector("#search").focus()
  }


  render() {
    const { books, onDeleteBook, onChangeBookShelf } = this.props;
    const { query } = this.state;

    return (

     <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
              <input
         		    id="search"
        		    type="text"
        		    placeholder="Search by title or author"
        		    onChange={(e) => this.updateSearch(e.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
	          { this.state.searchResult.length > 0 && (this.state.searchResult.map((book, index) => (
              <li key={ index }>
                        <Book
                          id={book.id}
                          title={book.title}
                          imageLinks={book.imageLinks}
                          shelf={book.shelf}
                          authors={book.authors}
                          onChangeBookShelf={onChangeBookShelf}
                        />
              </li>
            ))) }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks 
