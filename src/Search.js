import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { object } from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends React.Component {
  static propTypes = {
    myBooks: PropTypes.arrayOf(object).isRequired,
  };

  state = {
    currentQuery: '',
    previousQuery: '',
    books: [],
  };

  updateQuery = (query) => {
    this.setState(() => ({
      currentQuery: query,
    }));
  };

  componentDidUpdate = () => {
    const { currentQuery, previousQuery } = this.state;
    const { myBooks } = this.props;

    if (currentQuery !== previousQuery) {
      if (currentQuery !== '') {
        BooksAPI.search(currentQuery).then((books) => {
          if (books.error) {
            this.setState(() => ({
              books: [],
              previousQuery: currentQuery,
              booksNotFound: true,
            }));
          } else {
            // if search result has book/books in my library to show current shelf of a book
            const searchBooks = books.map((book) => {
              const myBook = myBooks.filter((myBook) => myBook.id === book.id);
              return myBook.length > 0 ? myBook[0] : book;
            });

            this.setState(() => ({
              books: searchBooks,
              previousQuery: currentQuery,
              booksNotFound: false,
            }));
          }
        });
      } else {
        this.setState(() => ({
          books: [],
          previousQuery: currentQuery,
          booksNotFound: false,
        }));
      }
    }
  };

  render() {
    const { currentQuery, books, booksNotFound } = this.state;
    const { updateShelf } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={currentQuery}
              onChange={(event) => this.updateQuery(event.target.value)}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          {booksNotFound ? (
            <div>No books found</div>
          ) : (
            <ol className="books-grid">
              {books.length > 0 &&
                books.map((book) => (
                  <li key={book.id}>
                    <Book
                      key={book.id}
                      onShelfChange={updateShelf}
                      bookData={book}
                    />
                  </li>
                ))}
            </ol>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
