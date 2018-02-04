// import * as BooksAPI from './BooksAPI'
import './App.css'

import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from "./ListBooks"
import SearchBooks from "./SearchBooks"

class BooksApp extends Component {

  constructor(props) {  
    super(props)
    
  this.state = {
    showSearchPage: false,
    query:'',
    books:[]
    }
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
    
  render() {
    return (
      <div className="app">
        {this.state.loading && (
          <div className="loading-wrapper">
            <div className="body-loading">
              <div className="loading">
                <strong>Please wait</strong>
              </div>
            </div>
          </div>
        )}
        <BrowserRouter>
        <Route exact path="/" render={() => (
          <ListBooks 
            books={this.state.books}
            onChangeBookShelf={this.onChangeBookShelf}
          />
          )}/>
        </BrowserRouter>
        <BrowserRouter>
          <Route path="/search" render={() => (
            <SearchBooks
              books={this.state.books}
              onChangeBookShelf={this.onChangeBookShelf}
            />
          )}/>
        </BrowserRouter>
      </div>
      );
    }
  }
export default BooksApp
