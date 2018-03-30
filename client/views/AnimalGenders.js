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
        let gendersStatus = new Map();
        gendersStatus.set("Male", true);
        gendersStatus.set("Female", true);
        gendersStatus.set("Neutered Male", true);
        gendersStatus.set("Spayed Female", true);
        super(props);
        this.state = { gendersStatus: gendersStatus };
    }

    // updateGenderStatus(event, isInputChecked) {
    //     console.log(event)
    //     console.log(isInputChecked)
    //     this.setState((oldState) => {
    //         let newGenderStatus = oldState.gendersStatus;
    //         newGenderStatus
    //         return {
    //             gendersStatus: !oldState.catChecked,
    //         };
    //     });
    //     this.props.updateGenders();
    // }

    /**
     * @returns 
     */
    createOnCheckForGender(gender) {
        const onCheck = function(event, isGenderChecked) {
            console.log('event', event);
            console.log('isInputChecked', isInputChecked);
            console.log('gender', gender);
            this.setState((oldState) => {
                let newGenderStatus = oldState.gendersStatus;
                newGenderStatus
                return {
                    gendersStatus: !oldState.catChecked,
                };
            });
            this.props.updateGenders();
        };
        return onCheck;
    }

    render() {
        return (
            <div>
                {Object.entries(gendersStatus).map((gender) => (
                    <MuiThemeProvider>
                        <Checkbox
                            label={gender}
                            checked={this.state.gendersStatus.get(gender)}
                            onCheck={this.createOnCheckForGender(gender)}  // function(Event, boolean)
                            style={styles.checkbox}
                        />
                    </MuiThemeProvider>))}
            </div>
        );
    }
}