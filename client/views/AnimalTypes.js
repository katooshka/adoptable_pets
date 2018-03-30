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
    }

    // updateDogCheck() {
    //     this.setState((oldState) => {
    //         return {
    //             dogChecked: !oldState.dogChecked,
    //         };
    //     });
    // }

    // updateCatCheck() {
    //     this.setState((oldState) => {
    //         return {
    //             catChecked: !oldState.catChecked,
    //         };
    //     });
    // }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <Checkbox
                        label="Dogs"
                        checked={this.props.dogChecked}
                        onCheck={() => this.props.updateDogCheck()}
                        style={styles.checkbox}
                    />
                </MuiThemeProvider>
                <MuiThemeProvider>
                    <Checkbox
                        label="Cats"
                        checked={this.props.catChecked}
                        onCheck={() => this.props.updateCatCheck()}
                        style={styles.checkbox}
                    />
                </MuiThemeProvider>
            </div>
        );
    }
}