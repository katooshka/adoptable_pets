import React from 'react';

import { SearchOptions } from './SearchOptions.js';
import { SearchResults } from './SearchResults.js';

export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            names: ["Keks", "Timka", "Alba", "Richi", "Rom", "Tim", "Timofey", "Timosha"],
            catBreeds: ["Domestic Shorthair", "Domestic Mediumhair", "Ragdoll", "Maine Coon"],
            dogBreeds: ["Pit Bull", "Bull dog", "Hot dog"],
            catColors: ["Tabby", "Black", "White"],
            dogColors: ["Tricolor", "Black", "Brown"]
        };
        this.sendQuery = this.sendQuery.bind(this);
    }

    sendQuery(query) {
        console.log(query);
    }

    render() {
        return (
            <div>
                <SearchOptions 
                    names = {this.state.names}
                    catBreeds = {this.state.catBreeds}
                    dogBreeds = {this.state.dogBreeds}
                    catColors = {this.state.catColors}
                    dogColors = {this.state.dogColors}
                />
                <SearchResults />
            </div>
        );
    }
}