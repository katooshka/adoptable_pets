import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export class AnimalAttribute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.createAttributeValuesList = this.createAttributeValuesList.bind(this);
    }

    handleChange(event, index, values) {
        this.setState({ values });
    }

    createAttributeValuesList(attributeValues, animalType, attributeName, values) {
        const text = `Select a ${animalType} ${attributeName}`;
        return (
            <MuiThemeProvider>
                <SelectField
                    multiple={true}
                    hintText={text}
                    value={values}
                    onChange={this.handleChange}
                >
                    {attributeValues.map((attributeValue) => (
                        <MenuItem
                            key={attributeValue}
                            insetChildren={true}
                            checked={values && values.indexOf(attributeValue) > -1}
                            value={attributeValue}
                            primaryText={attributeValue}
                        />))}
                </SelectField>
            </MuiThemeProvider>
        );
    }

    render() {
        const { values } = this.state;
        const catAttributeValuesList = this.createAttributeValuesList(
            this.props.catAttributeValues,
            "cat",
            this.props.attributeName,
            values);
        const dogAttributeValuesList = this.createAttributeValuesList(
            this.props.dogAttributeValues,
            "dog",
            this.props.attributeName,
            values);
        return (
            <div>
                {catAttributeValuesList}

                {dogAttributeValuesList}
            </div>
        );
    }
}