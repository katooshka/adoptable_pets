import React from 'react';
import axios from 'axios';

import { SearchOptions } from './SearchOptions.js';
import { SearchResults } from './SearchResults.js';
import { Header } from './Header.js';

export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            names: null,
            colors: null,
            breeds: null,
            showDeadAnimals: false,
            typesStatus: null,
            gendersStatus: null,
            queryResultFetched: false,
            queryResult: "Find animals"
        };
        this.getSearchOptions = this.getSearchOptions.bind(this);
    }

    async componentDidMount() {
        const response = await axios.get('/get-data');
        if (response.status !== 200) {
            throw new Error('Bad response', response);
        }
        const responseData = response.data;

        let typesStatus = new Map();
        for (let type of responseData.types) {
            typesStatus.set(type, true);
        }
        let gendersStatus = new Map();
        for (let gender of responseData.genders) {
            gendersStatus.set(gender, true);
        }
        this.setState({
            names: responseData.names,
            colors: new Map(responseData.colors),
            breeds: new Map(responseData.breeds),
            gendersStatus: gendersStatus,
            typesStatus: typesStatus
        });
    }

    async getSearchOptions(query) {
        const pets = await this.getSearchResults('/get-animals', query);
        console.log("PETS DATA", pets.data);
        this.setState({ queryResult: pets.data });
    }

    async getSearchResults(path, query) {
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
        if (this.state.names === null) {
            return <div>Loading...</div>
        }
        return (
            <div className="row">
                <div className="col-xs-0 col-sm-1 col-lg-2"></div>
                <div className="col-xs-12 col-sm-10 col-lg-8">
                    <div className="panel-heading header center">
                        <h1>Adoptable Pets</h1>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-body"></div>
                        <SearchOptions
                            names={this.state.names}
                            typesStatus={this.state.typesStatus}
                            gendersStatus={this.state.gendersStatus}
                            colors={this.state.colors}
                            breeds={this.state.breeds}
                            showDeadAnimals={this.state.showDeadAnimals}
                            getSearchOptions={this.getSearchOptions}
                        />
                        <div className="panel-heading divider center">
                            <h1>Search Results</h1>
                        </div>
                        <SearchResults
                            queryResult={this.state.queryResult}
                        />
                    </div>
                </div>
                <div className="col-xs-0 col-sm-2 col-lg-2"> </div>
            </div>
        );
    }
}