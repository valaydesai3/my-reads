import React from 'react';
import PropTypes from 'prop-types';
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
      if (!booksByShelf[shelf]) booksByShelf[shelf] = [book];
      else booksByShelf[shelf].push(book);
    });

    return (
      <div className="library">
        {!!books.length &&
          shelfs.map((shelf) => (
            <BookShelf
              key={shelf.id}
              title={shelf.title}
              booksByShelf={booksByShelf[shelf.id]}
              updateShelf={handleChangeShelf}
            />
          ))}
      </div>
    );
  }
}

export default Library;
