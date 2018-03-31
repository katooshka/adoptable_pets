import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';

export class AnimalNames extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <AutoComplete
                        hintText="Type animal name"
                        dataSource={this.props.names}
                        filter={AutoComplete.caseInsensitiveFilter}
                        onNewRequest={(chosenRequest) => this.props.updateName(chosenRequest)}
                    />
                </MuiThemeProvider>
            </div>
        );
    }
}