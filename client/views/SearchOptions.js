import React from 'react';
import Checkbox from 'material-ui/Checkbox';

import { AnimalNames } from './AnimalNames.js';
import { AnimalTypes } from './AnimalTypes.js';
import { ShowDeadAnimals } from './ShowDeadAnimals.js';
import { AnimalAttribute } from './AnimalAttribute.js';

export class SearchOptions extends React.Component {
    render() {
        return (
            <div>
                <AnimalNames
                    names={this.props.names}
                />
                <h3>Animal types</h3>
                <AnimalTypes />
                <ShowDeadAnimals />
                <div>
                    <div>
                        <h3>Breeds</h3>
                        <AnimalAttribute
                            catAttributeValues={this.props.catBreeds}
                            dogAttributeValues={this.props.dogBreeds}
                            attributeName={'breed'}
                        />
                    </div>
                    <div>
                        <h3>Colors</h3>
                        <AnimalAttribute
                            catAttributeValues={this.props.catColors}
                            dogAttributeValues={this.props.dogColors}
                            attributeName={'color'}
                        />
                    </div>
                </div>
            </div>
        );
    }
}