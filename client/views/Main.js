import React from 'react';

import { SearchOptions } from './SearchOptions.js';
import { SearchResults } from './SearchResults.js';

export class Main extends React.Component {
    constructor(props) {
        super(props);
        let typesStatus = new Map();
        typesStatus.set('Dog', true);
        typesStatus.set('Cat', true);

        let gendersStatus = new Map();
        gendersStatus.set('Male', true);
        gendersStatus.set('Female', true);

        let breeds = new Map();
        breeds.set('Dog', ["Pit Bull", "Bull dog", "Hot dog"]);
        breeds.set('Cat', ["Domestic Shorthair", "Domestic Mediumhair", "Ragdoll", "Maine Coon"]);

        let colors = new Map();
        colors.set('Dog', ["Tricolor", "Black", "Brown"]);
        colors.set('Cat', ["Tabby", "Black", "White"]);
        this.state = {
            names: ["Keks", "Timka", "Alba", "Richi", "Rom", "Tim", "Timofey", "Timosha"],
            colors: colors,
            breeds: breeds,
            typesStatus: typesStatus,
            gendersStatus: gendersStatus
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
                    typesStatus = {this.state.typesStatus}
                    gendersStatus = {this.state.gendersStatus}
                    colors = {this.state.colors}
                    breeds = {this.state.breeds}
                    sendQuery = {this.sendQuery}
                />
                <SearchResults />
            </div>
        );
    }
}