import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { AnimalNames } from './AnimalNames.js';
import { AnimalTypes } from './AnimalTypes.js';
import { ShowDeadAnimals } from './ShowDeadAnimals.js';
import { AnimalAttribute } from './AnimalAttribute.js';

const style = {
    margin: 12,
};

export class SearchOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            showDeadAnimals: false,
            dogChecked: true,
            catChecked: true,
            breeds: null,
            colors: null
        };
        this.updateName = this.updateName.bind(this);
        this.updateCatCheck = this.updateCatCheck.bind(this);
        this.updateDogCheck = this.updateDogCheck.bind(this);
        this.updateShowDeadAnimals = this.updateShowDeadAnimals.bind(this);
        this.updateBreeds = this.updateBreeds.bind(this);
        // this.updateColors = this.updateColors.bind(this);
    }

    updateName(name) {
        this.setState(() => {
            return {
                name: name
            };
        });
    }

    updateCatCheck() {
        this.setState((oldState) => {
            return {
                catChecked: !oldState.catChecked
            };
        });
    }

    updateDogCheck() {
        this.setState((oldState) => {
            return {
                dogChecked: !oldState.dogChecked
            };
        });
    }

    updateShowDeadAnimals(value) {
        this.setState((oldState) => {
            return {
                showDeadAnimals: value
            };
        });
    }

    updateBreeds(catBreeds, dogBreeds) {
        const breeds = null;
        if (catBreeds === null) {

        } else if (dogBreeds === null)
        this.setState(() => {
            return {
                breeds: catBreeds
            };
        });
    }

    createQuery() {
        const query = new Query(
            this.state.name,
            this.state.dogChecked,
            this.state.catChecked,
            this.state.breeds,
            this.state.colors,
            this.state.showDeadAnimals,
        );
        this.props.sendQuery(query);
    }

    render() {
        return (
            <div>
                <AnimalNames
                    names={this.props.names}
                />
                <h3>Animal types</h3>
                <AnimalTypes
                    dogChecked={this.state.dogChecked}
                    catChecked={this.state.catChecked}
                    updateDogCheck={() => this.updateDogCheck()}
                    updateCatCheck={() => this.updateCatCheck()}
                />
                <ShowDeadAnimals />
                <div>
                    <div>
                        <h3>Breeds</h3>
                        <AnimalAttribute
                            catAttributeValues={this.props.catBreeds}
                            dogAttributeValues={this.props.dogBreeds}
                            attributeName={'breeds'}
                            dogChecked={this.state.dogChecked}
                            catChecked={this.state.catChecked}
                        />
                    </div>
                    <div>
                        <h3>Colors</h3>
                        <AnimalAttribute
                            catAttributeValues={this.props.catColors}
                            dogAttributeValues={this.props.dogColors}
                            attributeName={'colors'}
                            dogChecked={this.state.dogChecked}
                            catChecked={this.state.catChecked}
                        />
                    </div>
                </div>
                <MuiThemeProvider>
                    <RaisedButton label="Submit" style={style} 
                        onClick={() => this.createQuery()}
                    />
                </MuiThemeProvider>
            </div>
        );
    }
}