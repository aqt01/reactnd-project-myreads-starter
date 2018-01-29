// import * as BooksAPI from './BooksAPI'
import './App.css'
import PropTypes from 'prop-types'

import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'
import ListBooks from "./ListBooks"
import SearchBooks from "./SearchBooks"

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    query:'',
    books: [],
  }

  componentDidMount() {
  	BooksAPI.getAll().then(books => {
      this.setState({
    	  books,
		    loading: false
      })
  	})
  }
onChangeBookShelf = (book, shelf, newBookInfo) => {
    this.setState({
      loading: true
    })
    BooksAPI.update(book, shelf).then(books => {
      books = [].concat(
        books.currentlyReading,
      	books.wantToRead,
        books.read
      )
      this.setState(state => {
        let bookToUpdate = state.books.find(b => book.id === b.id)

        // Verify if the book are in the current state
        if (!bookToUpdate) {
          state.books.push(book)
          bookToUpdate = book
        }

        // Update shelf value
        bookToUpdate.shelf = shelf

        // Create new book collection based on the update response, retreiving all book information
        // from last state based on the book id
        state.books = books.map(bookId => state.books.find(book => book.id === bookId))

        state.loading = false

        return state
      })
    })
  }
    
  removeBook = (book) => {
    this.setState((state) => ({
      contacts: state.books.filter((c) => c.id !== book.id)
    }))

    BooksAPI.remove(book)
  }

  render() {

    return (
      <div className="app">
        {this.state.showSearchPage ? (
            <SearchBooks 
              books={this.state.books}
              onChangeBookShelf={this.onChangeBookShelf}
            />
            ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                    <ListBooks 
                      title="Currently Reading"
                      books={this.state.books.filter(b => b.shelf === "currentlyReading")}
                      onChangeBookShelf={this.onChangeBookShelf}
                    />
                    <ListBooks 
                      title="Want to Read"
                      books={this.state.books.filter(b => b.shelf === "wantToRead")}
                      onChangeBookShelf={this.onChangeBookShelf}
                    />
                    <ListBooks 
                      title="Read"
                      books={this.state.books.filter(b => b.shelf === "read")}
                      onChangeBookShelf={this.onChangeBookShelf}
                    />
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
