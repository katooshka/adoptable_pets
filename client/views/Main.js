import React from 'react';
import axios from 'axios';

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
            names: ["Keks", "Timka", "Alba", "Richi", "Rom", "Tim", "Timofey", "Timosha", "Cooper"],
            colors: colors,
            breeds: breeds,
            showDeadAnimals: false,
            typesStatus: typesStatus,
            gendersStatus: gendersStatus,
            queryResultFetched: false,
            queryResult: "Find animals"
        };
        this.getSearchOptions = this.getSearchOptions.bind(this);
    }

    async getSearchOptions(query) {
        const pets = await this.getPetsData('/get-animals', query);
        console.log("PETS DATA", pets.data);
        this.setState({ queryResult: pets.data });
    }

    async getPetsData(path, query) {
        try {
            const params = {
                showDeadAnimals: query.showDeadAnimals,
                animalBreed: query.breeds,
                animalColor: query.colors,
            }
            if (query.name) {
                params.animalName = query.name;
            }
            if (query.types.length > 0) {
                params.animalType = query.types;
            }
            if (query.genders.length > 0) {
                params.animalGender = query.genders;
            }
            console.log("PARAMS", params);
            const response = await axios.get(path, { params });
            return response;
        } catch (err) {
            console.log("Error while fetching query results", err);
        }
    }

    render() {
        return (
            <div>
                <SearchOptions
                    names={this.state.names}
                    typesStatus={this.state.typesStatus}
                    gendersStatus={this.state.gendersStatus}
                    colors={this.state.colors}
                    breeds={this.state.breeds}
                    showDeadAnimals={this.state.showDeadAnimals}
                    getSearchOptions={this.getSearchOptions}
                />
                <SearchResults
                    queryResult={this.state.queryResult}
                />
            </div>
        );
    }
}