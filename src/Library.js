import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

class Library extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    handleChangeShelf: PropTypes.func.isRequired,
  };

  render() {
    const { books, handleChangeShelf } = this.props;
    const shelfs = [
      { id: 'currentlyReading', title: 'Currently Reading' },
      { id: 'wantToRead', title: 'Want to Read' },
      { id: 'read', title: 'Read' },
    ];

    const booksByShelf = {};
    books.forEach((book) => {
      const { shelf } = book;
      if (!shelf) return;
      if (shelf !== 'none') {
        if (!booksByShelf[shelf]) {
          booksByShelf[shelf] = [book];
        } else booksByShelf[shelf].push(book);
      }
    });

    return (
      <div className="library">
        {Object.keys(booksByShelf).length === 0 && (
          <div className="empty-bookshelf">
            <span>Your Bookshelf Is Curently Empty</span>
          </div>
        )}
        {!!books.length &&
          shelfs.map((shelf) => {
            const { id, title } = shelf;
            return (
              booksByShelf[id] && (
                <BookShelf
                  key={id}
                  title={title}
                  booksByShelf={booksByShelf[id]}
                  updateShelf={handleChangeShelf}
                />
              )
            );
          })}
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default Library;
