import React from 'react';

import { Header } from './Header.js';
import { Main } from './Main.js';
import { SearchOptions } from './SearchOptions.js';
import { SearchResults } from './SearchResults.js';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Main/>
      </div>
    );
  }
}