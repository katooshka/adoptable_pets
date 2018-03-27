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
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <h3>Show dead animals?</h3>
                        <RadioButtonGroup name="showDeadAnimals">
                            <RadioButton
                                value="not_light"
                                label="Yes"
                                style={styles.radioButton}
                            />
                            <RadioButton
                                value="light"
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