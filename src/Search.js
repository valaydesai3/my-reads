import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends React.Component {
  state = {
    currentQuery: '',
    previousQuery: '',
    books: [],
  };

  updateQuery = (query) => {
    this.setState(() => ({
      currentQuery: query.trim(),
    }));
  };

  componentDidUpdate = () => {
    const { currentQuery, previousQuery } = this.state;
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
            this.setState(() => ({
              books,
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
