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
            showDeadAnimals: this.props.showDeadAnimals,
            breedsStatus: breedsStatus,
            colorsStatus: colorsStatus,
        };
        this.updateName = this.updateName.bind(this);
        this.updateTypeCheck = this.updateTypeCheck.bind(this);
        this.updateGenderCheck = this.updateGenderCheck.bind(this);
        this.updateShowDeadAnimals = this.updateShowDeadAnimals.bind(this);
        this.updateBreeds = this.updateBreeds.bind(this);
        this.updateColors = this.updateColors.bind(this);
        this.createQuery = this.createQuery.bind(this);
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
            console.log("BREEDS", newBreedsStatus);
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
        console.log("STATE", this.state);
        const checkedAnimalTypes = this.filterTrueChecks(this.state.typesStatus);
        const query = new Query(
            this.state.name,
            checkedAnimalTypes,
            this.filterTrueChecks(this.state.gendersStatus),
            this.state.showDeadAnimals,
            this.getCheckedAttributes(this.state.breedsStatus, checkedAnimalTypes, this.props.breeds),
            this.getCheckedAttributes(this.state.colorsStatus, checkedAnimalTypes, this.props.colors)
        );
        console.log("QUERY", query)
        this.props.getSearchOptions(query);
    }

    filterTrueChecks(map) {
        let result = [];
        for (const [key, value] of map) {
            if (value) {
                result.push(key);
            }
        }
        return result;
    }

    getCheckedAttributes(attributeStatus, checkedTypes, attributeValues) {
        let result = [];
        for (const type of checkedTypes) {
            const checkedAttributes = attributeStatus.get(type);
            if (checkedAttributes[0] === "Select all") {
                result = result.concat(attributeValues.get(type));
            } else {
                result = result.concat(checkedAttributes);
            }
        }
        return result;
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
                <div className="row">
                    <div className="col-md-6 col-lg-4">
                        <h3>Pet name</h3>
                        <AnimalNames
                            names={this.props.names}
                            updateName={this.updateName}
                        />
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <h3>Pet type</h3>
                        <AnimalTypes
                            typesStatus={this.props.typesStatus}
                            updateTypeCheck={this.updateTypeCheck}
                        />
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <h3>Pet gender</h3>
                        <AnimalGenders
                            gendersStatus={this.props.gendersStatus}
                            updateGenderCheck={this.updateGenderCheck}
                        />
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <h3>Pet breed</h3>
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
                    <div className="col-md-6 col-lg-4">
                        <h3>Pet color</h3>
                        {Array.from(this.props.typesStatus.keys()).map(type => (
                            <AnimalAttribute key={type}
                                animalAttributeValues={this.props.colors.get(type)}
                                attributeName={'Colors'}
                                animalTypeChecked={this.state.typesStatus.get(type)}
                                animalType={type}
                                updateAttribute={this.updateColors}
                            />
                        ))}
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <ShowDeadAnimals
                            updateShowDeadAnimals={this.updateShowDeadAnimals}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-0 col-sm-1 col-lg-2"></div>
                    <div className="col-xs-12 col-sm-10 col-lg-8">
                        <MuiThemeProvider>
                            <RaisedButton
                                label="Find pets"
                                style={style}
                                onClick={this.createQuery}
                                disabled={!this.state.name && this.checkNoAnimalTypeAndGenderIsChosen()}
                            />
                        </MuiThemeProvider>
                    </div>
                    <div className="col-xs-0 col-sm-1 col-lg-2"></div>
                </div>
            </div >
        );
    }
}

class Query {
    constructor(name, types, genders, showDeadAnimals, breeds, colors) {
        this.name = name;
        this.types = types;
        this.genders = genders;
        this.showDeadAnimals = showDeadAnimals;
        this.breeds = breeds;
        this.colors = colors;
    }
}
