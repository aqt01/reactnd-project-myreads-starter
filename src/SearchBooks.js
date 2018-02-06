import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

const placeholderImage = 'http://via.placeholder.com/128x193';

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

    if (query) {
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
    const { onChangeBookShelf } = this.props;
    console.log(this.state)
    return (

     <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              id="search"
              type="text"
              placeholder="Search by title or author"
              onChange={(e) => this.updateSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { this.state.searchResult.length > 0 && (this.state.searchResult.map((book) => (              
              <Book
                id={book.id}
                key={book.id}
                title={book.title}
                thumbnail={ (book.imageLinks || {} ).thumbnail || placeholderImage}
                shelf={book.shelf}
                authors={book.authors}
                onChangeBookShelf={onChangeBookShelf} />              
            ))) }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks 
