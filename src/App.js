import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';
import Library from './Library';
import Search from './Search';

class App extends React.Component {
  state = {
    books: [],
  };

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      const books = this.state.books.map((currBook) => {
        if (currBook.id === book.id) currBook.shelf = shelf;
        return currBook;
      });
      this.setState(() => ({
        books,
      }));
    });
  };

  handleChangeShelf = (e, book) => {
    const shelf = e.target.value;
    this.updateShelf(book, shelf);
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }
  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <header className="header">MyReads</header>
        <div className="container">
          <Route
            exact
            path="/"
            render={() => (
              <Library
                books={books}
                handleChangeShelf={this.handleChangeShelf}
              />
            )}
          />
          <Route
            path="/search"
            render={() => <Search updateShelf={this.handleChangeShelf} />}
          />
        </div>
      </div>
    );
  }
}

export default App;
