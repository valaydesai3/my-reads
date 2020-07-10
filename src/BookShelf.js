import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    booksByShelf: PropTypes.arrayOf(PropTypes.object).isRequired,
    updateShelf: PropTypes.func.isRequired,
  };

  render() {
    const { title, booksByShelf, updateShelf } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="books">
          {booksByShelf !== undefined &&
            booksByShelf.length > 0 &&
            booksByShelf.map((book) => (
              <Book key={book.id} bookData={book} onShelfChange={updateShelf} />
            ))}
        </div>
      </div>
    );
  }
}

export default BookShelf;
