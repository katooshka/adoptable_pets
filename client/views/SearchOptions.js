import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { AnimalNames } from './AnimalNames.js';
import { AnimalTypes } from './AnimalTypes.js';
import { AnimalGenders } from './AnimalGenders.js';
import { ShowDeadAnimals } from './ShowDeadAnimals.js';
import { AnimalAttribute } from './AnimalAttribute.js';

const style = {
    margin: 12,
};

export class SearchOptions extends React.Component {
    constructor(props) {
        super(props);
        let breedsStatus = new Map();
        Array.from(this.props.breeds.keys()).map(animal => {
            breedsStatus.set(animal, ['Select all']);
        });
        let colorsStatus = new Map();
        Array.from(this.props.colors.keys()).map(animal => {
            colorsStatus.set(animal, ['Select all']);
        });
        this.state = {
            name: null,
            typesStatus: this.props.typesStatus,
            gendersStatus: this.props.gendersStatus,
            showDeadAnimals: false,
            breedsStatus: breedsStatus,
            colorsStatus: colorsStatus,
        };
        this.updateName = this.updateName.bind(this);
        this.updateTypeCheck = this.updateTypeCheck.bind(this);
        this.updateGenderCheck = this.updateGenderCheck.bind(this);
        this.updateShowDeadAnimals = this.updateShowDeadAnimals.bind(this);
        this.updateBreeds = this.updateBreeds.bind(this);
        this.updateColors = this.updateColors.bind(this);
    }

    updateName(name) {
        this.setState(() => {
            return {
                name: name
            };
        });
    }

    updateTypeCheck(type) {
        this.setState((oldState) => {
            let newTypesStatus = new Map(oldState.typesStatus);
            newTypesStatus.set(type, !newTypesStatus.get(type));
            return {
                typesStatus: newTypesStatus
            };
        });
    }

    updateGenderCheck(gender) {
        this.setState((oldState) => {
            let newGendersStatus = new Map(oldState.gendersStatus);
            newGendersStatus.set(gender, !newGendersStatus.get(gender));
            return {
                gendersStatus: newGendersStatus
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

    updateBreeds(animalType, values) {
        this.setState((oldState) => {
            let newBreedsStatus = new Map(oldState.breedsStatus);
            newBreedsStatus.set(animalType, values);
            return {
                breedsStatus: newBreedsStatus
            };
        });
    }

    updateColors(animalType, values) {
        this.setState((oldState) => {
            let newColorsStatus = new Map(oldState.colorsStatus);
            newColorsStatus.set(animalType, values);
            return {
                colorsStatus: newColorsStatus
            };
        });
    }

    createQuery() {
        const query = new Query(this.state );
        this.props.sendQuery(query);
    }

    checkNoAnimalTypeAndGenderIsChosen() {
        let typeIsChosen = false;
        for (const [key, value] of this.state.typesStatus) {
            if (value) {
                typeIsChosen = true;
            }
        }
        let genderIsChosen = false;
        for (const [key, value] of this.state.gendersStatus) {
            if (value) {
                genderIsChosen = true;
            }
        }
        return !typeIsChosen && !genderIsChosen;
    }

    render() {
        return (
            <div>
                <AnimalNames
                    names={this.props.names}
                    updateName={this.updateName}
                />
                <h3>Animal types</h3>
                <AnimalTypes
                    typesStatus={this.props.typesStatus}
                    updateTypeCheck={this.updateTypeCheck}
                />
                <h3>Animal genders</h3>
                <AnimalGenders
                    gendersStatus={this.props.gendersStatus}
                    updateGenderCheck={this.updateGenderCheck}
                />
                <ShowDeadAnimals 
                    updateShowDeadAnimals={this.updateShowDeadAnimals}
                />
                <div>
                    <div>
                        <h3>Breeds</h3>
                        {Array.from(this.props.typesStatus.keys()).map(type => (
                            <AnimalAttribute key={type}
                                animalAttributeValues={this.props.breeds.get(type)}
                                attributeName={'Breeds'}
                                animalTypeChecked={this.state.typesStatus.get(type)}
                                animalType={type}
                                updateAttribute={this.updateBreeds}
                            />
                        ))}
                    </div>
                    <div>
                        <h3>Colors</h3>
                        {Array.from(this.props.typesStatus.keys()).map(type => (
                            <AnimalAttribute
                                animalAttributeValues={this.props.colors.get(type)}
                                attributeName={'Colors'}
                                animalTypeChecked={this.state.typesStatus.get(type)}
                                animalType={type}
                                updateAttribute={this.updateColors}
                            />
                        ))}
                    </div>
                </div>
                <MuiThemeProvider>
                    <RaisedButton 
                        label="Submit" 
                        style={style}
                        onClick={this.createQuery()}
                        disabled={!this.state.name && this.checkNoAnimalTypeAndGenderIsChosen()}
                    />
                </MuiThemeProvider>
            </div>
        );
    }
}

class Query {
    constructor(state) {
        this.state = state;
    }
}
