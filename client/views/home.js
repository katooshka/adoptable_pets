import React from 'react';

import { Header } from './Header.js';
import { Main } from './Main.js';
import { SearchOptions } from './SearchOptions.js';
import { SearchResults } from './SearchResults.js';


export default class Home extends React.Component {

  constructor() {
    super();
    this.state = { 
      name: "Kitty",
     };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.setState({ name: "Bunny" });
  }

  render() {
    return (
      <div>
        <Header/>
        <div>
          <Main/>
          <h1 onClick={this.clickHandler}>
            {`Hello ${this.state.name}!`}
          </h1>
          <div>
            <SearchOptions/>
          </div>
          <div>
            <SearchResults/>
          </div>
        </div>
      </div>
    );
  }
}