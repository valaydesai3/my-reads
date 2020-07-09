import React from 'react';
import BookShelf from './BookShelf';

class Library extends React.Component {
  render() {
    const { books } = this.props;
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
        {shelfs.map((shelf) => (
          <BookShelf
            title={shelf.title}
            booksByShelf={booksByShelf[shelf.id]}
          />
        ))}
      </div>
    );
  }
}

export default Library;
