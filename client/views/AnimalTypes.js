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
        let typesStatus = this.props.typesStatus;
        this.state = { typesStatus: typesStatus };
    }

    createOnCheckForType(type) {
        const onCheck = (event, isInputChecked) => {
            this.setState((oldState) => {
                let newTypesStatus = new Map(oldState.typesStatus);
                newTypesStatus.set(type, isInputChecked);
                return {
                    typesStatus: newTypesStatus
                };
            });
            this.props.updateTypeCheck(type);
        };
        return onCheck;
    }

    render() {
        return (
            <div>
                {Array.from(this.state.typesStatus.keys()).map(type => (
                    <MuiThemeProvider key={type}>
                        <Checkbox
                            label={type}
                            checked={this.state.typesStatus.get(type)}
                            onCheck={this.createOnCheckForType(type)}
                            style={styles.checkbox}
                        />
                    </MuiThemeProvider>))}
            </div>
        );
    }
}