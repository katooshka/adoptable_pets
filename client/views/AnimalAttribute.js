import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export class AnimalAttribute extends React.Component {
    constructor(props) {
        super(props);
        this.state = { values: [] };
        this.handleChange = this.handleChange.bind(this);
        this.createAttributeValuesList = this.createAttributeValuesList.bind(this);
    }

    handleChange(event, index, values) {
        if (!values.length) {
            let valuesList = [];
            valuesList.push("Select all")
            this.setState({ values: valuesList });
        } 
        else if (values[0] === "Select all") {
            let valuesList = [];
            valuesList.push(values[values.length - 1]);
            this.setState({ values: valuesList });
        } 
        else if (values[values.length - 1] === "Select all") {
            let valuesList = [];
            valuesList.push(values[values.length - 1]);
            this.setState({ values: valuesList });
        } else {
            this.setState({ values: values });
        }
    }

    createAttributeValuesList(attributeValues, animalType, attributeName, values, disabled) {
        console.log("values", values)
        const text = `Choose ${animalType} ${attributeName}`;
        const includeAllText = `Include all ${animalType} ${attributeName}`;
        return (
            <MuiThemeProvider>
                <SelectField
                    multiple={true}
                    hintText={text}
                    value={values}
                    onChange={this.handleChange}
                    disabled={disabled}
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
        const catAttributeValuesList = this.createAttributeValuesList(
            this.props.catAttributeValues,
            "cat",
            this.props.attributeName,
            values,
            this.props.catChecked === false);
        const dogAttributeValuesList = this.createAttributeValuesList(
            this.props.dogAttributeValues,
            "dog",
            this.props.attributeName,
            values,
            this.props.dogChecked === false);
        return (
            <div>
                {catAttributeValuesList}
                {dogAttributeValuesList}
            </div>
        );
    }
}