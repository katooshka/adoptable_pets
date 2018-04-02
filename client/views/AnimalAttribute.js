import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export class AnimalAttribute extends React.Component {
    constructor(props) {
        super(props);
        this.state = { values: ["Select all"] };
        this.handleChange = this.handleChange.bind(this);
        this.createAttributeValuesList = this.createAttributeValuesList.bind(this);
    }

    /**
     * This method is used to validate user input in animal attributes fields (currently these are breeds and colors). 
     * A user can only select all the attributes available, or select one or more than one attributes. This search option cannot
     * provide no value to the final query.
     */
    handleChange(event, index, values) {
        let valuesList = [];
        if (!values.length) {
            valuesList.push("Select all")
            this.setState({ values: valuesList });
        }
        else if (values[0] === "Select all") {
            valuesList.push(values[values.length - 1]);
            this.setState({ values: valuesList });
        }
        else if (values[values.length - 1] === "Select all") {
            valuesList.push(values[values.length - 1]);
            this.setState({ values: valuesList });
        } else {
            valuesList.push(...values);
            this.setState({ values: valuesList });
        }
        this.props.updateAttribute(this.props.animalType, valuesList);
    }

    createAttributeValuesList(attributeValues, animalType, attributeName, values, disabled) {
        const text = `Choose ${animalType} ${attributeName}`;
        const includeAllText = `Include all ${animalType} ${attributeName}`;
        return (
            <MuiThemeProvider>
                <SelectField
                    floatingLabelText={animalType}
                    multiple={true}
                    hintText={text}
                    value={values}
                    onChange={this.handleChange}
                    disabled={disabled}
                    fullWidth={true}
                >
                    {<MenuItem
                        key="Select all"
                        insetChildren={true}
                        checked={values && values.indexOf("Select all") > -1}
                        value="Select all"
                        primaryText="Select all"
                    />}
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
        const animalAttributeValuesList = this.createAttributeValuesList(
            this.props.animalAttributeValues,
            this.props.animalType,
            this.props.attributeName,
            values,
            !this.props.animalTypeChecked);
        return (
            <div>
                {animalAttributeValuesList}
            </div>
        );
    }
}