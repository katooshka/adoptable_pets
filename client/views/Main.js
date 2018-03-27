import React from 'react';

import { SearchOptions } from './SearchOptions.js';
import { SearchResults } from './SearchResults.js';

export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            names: ["Include all names", "Keks", "Timka", "Alba", "Richi", "Rom", "Tim", "Timofey", "Timosha"],
            catBreeds: ["Include all cat breeds", "Domestic Shorthair", "Domestic Mediumhair", "Ragdoll", "Maine Coon"],
            dogBreeds: ["Include all dog breeds", "Pit Bull", "Bull dog", "Hot dog"],
            catColors: ["Include all cat colors", "Tabby", "Black", "White"],
            dogColors: ["Include all dog colors", "Tricolor", "Black", "Brown"],
            dogChecked: true,
            catChecked: true
        };
        this.handleAnimalTypeChange = this.handleAnimalTypeChange.bind(this);
    }

    handleAnimalTypeChange(event, index, values) {
        this.setState({ values });
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