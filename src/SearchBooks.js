import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired

  }

  state = {
    query: ''
  }


 constructor(props) {
    super(props)
  	this.state = {
      error: null,
      loading: false,
      searchResult: []
    }
  }
  updateSearch = (query) => {
  	if (query) {
      // Search all books based on title or author name
      BooksAPI.search(query).then(books => {
        if (!Array.isArray(books)) {
          this.setState({
            searchResult: []
          })
          return
        }
        // Concat all current books shelved
        this.setState({
          // Compare all books found in the search and current books shelved to
          // Update the shelf value in the book if is already stored
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
                  <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
                  <div className="search-books-input-wrapper">
                    {/*
                      NOTES: The search from BooksAPI is limited to a particular set of search terms.
                      You can find these search terms here:
                      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                      you don't find a specific author or title. Every search is limited by search terms.
                    */
                    
                    }
                <input
                className='search-contacts'
                type='text'
                placeholder='Search by title or author'
                onChange={(event) => this.updateQuery(event.target.value)}
              />

                  </div>
                </div>
                <div className="search-books-results">
                  <ol className="books-grid"></ol>
                    <ListBooks  
                      onDeleteBook={this.removeBook}
                      books={this.state.books}
                      onChangeBookShelf={this.state.onChangeBookShelf}
                    />
                </div>
              </div>
    )
  }
}

export default SearchBooks 
