import React from 'react';
import Book from './Book';

class BookShelf extends React.Component {
  render() {
    const { title, booksByShelf } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="books">
          {booksByShelf !== undefined &&
            booksByShelf.length > 0 &&
            booksByShelf.map((book) => <Book bookData={book} />)}
        </div>
      </div>
    );
  }
}

export default BookShelf;
