import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';

const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
};

export class AnimalGenders extends React.Component {
    constructor(props) {
        super(props);
        let gendersStatus = this.props.gendersStatus;
        this.state = { gendersStatus: gendersStatus };
    }

    createOnCheckForGender(gender) {
        const onCheck = (event, isInputChecked) => {
            this.setState((oldState) => {
                let newGenderStatus = new Map(oldState.gendersStatus);
                newGenderStatus.set(gender, isInputChecked);
                return {
                    gendersStatus: newGenderStatus
                };
            });
            this.props.updateGenderCheck(gender);
        };
        return onCheck;
    }

    render() {
        return (
            <div>
                {Array.from(this.state.gendersStatus.keys()).map(gender => (
                    <MuiThemeProvider key={gender}>
                        <Checkbox 
                            label={gender}
                            checked={this.state.gendersStatus.get(gender)}
                            onCheck={this.createOnCheckForGender(gender)}
                            style={styles.checkbox}
                        />
                    </MuiThemeProvider>))}
            </div>
        );
    }
}