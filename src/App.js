import React from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI';
import Library from './Library';

class App extends React.Component {
  state = {
    books: [],
  };
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }
  render() {
    const { books } = this.state;
    return (
      <div className="App">
        <header className="App-header">MyReads</header>
        <div className="container">
          <Library books={books} />
        </div>
      </div>
    );
  }
}

export default App;
