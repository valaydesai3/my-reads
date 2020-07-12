import React from 'react';
import PropTypes from 'prop-types';
import NoCover from './No-Cover.png'; // if thumbnai is not available

class Book extends React.Component {
  static propTypes = {
    bookData: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired,
  };

  render() {
    const { bookData, onShelfChange } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${
                bookData.imageLinks ? bookData.imageLinks.thumbnail : NoCover
              })`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              onChange={(e) => onShelfChange(e, bookData)}
              value={bookData.shelf ? bookData.shelf : 'none'}
            >
              <option value="" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{bookData.title}</div>
        <div className="book-authors">{bookData.authors}</div>
      </div>
    );
  }
}

export default Book;
