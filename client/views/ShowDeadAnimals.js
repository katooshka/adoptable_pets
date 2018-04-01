import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
};

export class ShowDeadAnimals extends React.Component {

    createOnCheck() {
        const onCheck = (event, value) => {
            this.props.updateShowDeadAnimals(value);
        };
        return onCheck;
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <h3>Show dead animals?</h3>
                        <RadioButtonGroup
                            defaultSelected="false"
                            name="showDeadAnimals"
                            onChange={(event, value) => this.props.updateShowDeadAnimals(value)}
                            >
                            <RadioButton
                                value="true"
                                label="Yes"
                                style={styles.radioButton}
                            />
                            <RadioButton
                                value="false"
                                label="No"
                                style={styles.radioButton}
                            />
                        </RadioButtonGroup>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}