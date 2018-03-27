import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutoComplete from 'material-ui/AutoComplete';

export class AnimalNames extends React.Component {
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <AutoComplete
                        hintText="Type animal name"
                        dataSource={this.props.names}
                        filter={AutoComplete.caseInsensitiveFilter}
                    />
                </MuiThemeProvider>
            </div>
        );
    }
}