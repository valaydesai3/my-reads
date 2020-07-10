import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    booksByShelf: PropTypes.arrayOf(PropTypes.object),
    updateShelf: PropTypes.func.isRequired,
  };

  render() {
    const { title, booksByShelf, updateShelf } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <ol className="books-grid">
          {booksByShelf !== undefined &&
            booksByShelf.length > 0 &&
            booksByShelf.map((book) => (
              <li key={book.id}>
                <Book bookData={book} onShelfChange={updateShelf} />
              </li>
            ))}
        </ol>
      </div>
    );
  }
}

export default BookShelf;
