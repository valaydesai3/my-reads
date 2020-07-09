import React from 'react';

class Book extends React.Component {
  render() {
    const {
      bookData: { title, authors, imageLinks },
    } = this.props;

    return (
      <div>
        <img src={imageLinks.thumbnail} alt={title} />
        <p>{title}</p>
        <span>{authors}</span>
      </div>
    );
  }
}

export default Book;
