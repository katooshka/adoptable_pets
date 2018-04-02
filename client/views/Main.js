import React from 'react';
import axios from 'axios';

import { SearchOptions } from './SearchOptions.js';
import { SearchResults } from './SearchResults.js';
import { InitialDataStatus, QueryResultStatus } from './StatusConstants.js';

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
            initialDataStatus: InitialDataStatus.LOADING,
            queryResultStatus: QueryResultStatus.NOT_REQUIRED
        };
        this.getSearchOptions = this.getSearchOptions.bind(this);
    }

    /**
     * This is the main client component that handles data flow from other code parts. 
     * After the component mounts, initial data is queried from the server via API call. The result is then processed
     * and added to the component state.
     */
    async componentDidMount() {
        const response = await axios.get('/get-data');
        if (response.status !== 200) {
            this.setState((oldState) => { oldState.initialDataStatus = InitialDataStatus.FAILED });
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
            typesStatus: typesStatus,
            initialDataStatus: InitialDataStatus.LOADED
        });

    }

    async getSearchOptions(query) {
        this.setState((oldState) => { oldState.queryResultStatus = QueryResultStatus.FETCHING })
        const pets = await this.getSearchResults('/get-animals', query);
        this.setState({ 
            queryResult: pets.data, 
            queryResultStatus: QueryResultStatus.FETCHED
         });
    }

    async getSearchResults(path, query) {
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
        const response = await axios.get(path, { params });
        return response;
    }

    /**
     * This part of code controls the flow between two components: SearchOptions and SearchResults. First initial data
     * is fetched from the server and passed to SearchOptions component as props and is then used to render search options available to a user.
     * After a user passes the required query parameters, they are then processed in getSearchOptions() method,
     * the required data is fetched from the server and passed to SearchResults component that is responsible for results rendering.
     */
    render() {
        if (this.state.initialDataStatus === InitialDataStatus.LOADING) {
            return <div>Loading...</div>
        } else if (this.state.initialDataStatus === InitialDataStatus.FAILED) {
            return <div>There is an issue on the server. Data cannot be loaded.</div>
        }
        let searchResultStatusText = 'Search Results';
        if (this.state.queryResultStatus === QueryResultStatus.FETCHING) searchResultStatusText = 'Fetching Data...';
        if (this.state.queryResultStatus === QueryResultStatus.FAILED) searchResultStatusText = 'Data Cannot Be Loaded';
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
                        {this.state.queryResultStatus !== QueryResultStatus.NOT_REQUIRED ? 
                        <div className="panel-heading divider center"><h1>{searchResultStatusText}</h1></div> : <div></div>}
                        <SearchResults
                            queryResultStatus={this.state.queryResultStatus}
                            queryResult={this.state.queryResult}
                        />
                    </div>
                </div>
                <div className="col-xs-0 col-sm-2 col-lg-2"> </div>
            </div>
        );
    }
}