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

export class AnimalTypes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dogChecked: false,
            catChecked: false
        };
    }

    updateDogCheck() {
        this.setState((oldState) => {
            return {
                dogChecked: !oldState.dogChecked,
            };
        });
    }

    updateCatCheck() {
        this.setState((oldState) => {
            return {
                catChecked: !oldState.catChecked,
            };
        });
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <Checkbox
                        label="Dogs"
                        checked={this.state.dogChecked}
                        onCheck={this.updateDogCheck.bind(this)}
                        style={styles.checkbox}
                    />
                </MuiThemeProvider>
                <MuiThemeProvider>
                    <Checkbox
                        label="Cats"
                        checked={this.state.catChecked}
                        onCheck={this.updateCatCheck.bind(this)}
                        style={styles.checkbox}
                    />
                </MuiThemeProvider>
            </div>
        );
    }
}