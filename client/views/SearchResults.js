import React from 'react';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

import { QueryResultStatus } from './StatusConstants.js';

const style = {
  margin: 12
};

export class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxShown: 6
    }
    this.updateShownPetsState = this.updateShownPetsState.bind(this);
  }

  updateShownPetsState() {
    this.setState((oldState) => {
      return {
        maxShown: oldState.maxShown + 6
      };
    });
  }

  renderShowMore() {
    return (
      <div className="row center">
        <div className="col-xs-0 col-sm-1 col-lg-2"></div>
        <div className="col-xs-12 col-sm-10 col-lg-8 center">
          <MuiThemeProvider>
            <RaisedButton
              backgroundColor="#4db6ac"
              label="Show more"
              style={style}
              onClick={this.updateShownPetsState}
              fullWidth={true}
            />
          </MuiThemeProvider>
        </div>
        <div className="col-xs-0 col-sm-1 col-lg-2"></div>
      </div>
    );
  }

  renderPetsCard(pets) {
    const defaultImage = 'https://orig00.deviantart.net/998c/f/2014/209/a/f/dog_and_cat_adoption_logo_by_otakucutie-d7spj4n.png';
    return (
      <div className="row">
        {pets.map((pet) => (
          <div className="col-md-6 col-lg-4">
            <MuiThemeProvider>
              <div>
                <Card className="card">
                  <CardMedia
                    overlay={<CardTitle title={pet.animalName} />}
                  >
                    <img src={pet.image === '' ? defaultImage : pet.image} class={pet.isDead === 'TRUE' ? 'dead-pet' : 'alive-pet'} alt="Image not found" />
                  </CardMedia>
                  <CardText>
                    <h6><b>Type:</b> {pet.animalType}</h6>
                    <h6><b>Gender:</b> {pet.animalGender}</h6>
                    <h6><b>Breed:</b> {pet.animalBreed}</h6>
                    <h6><b>Color:</b> {pet.animalColor}</h6>
                    <h6><b>Address:</b> {pet.address}</h6>
                    {pet.isDead === 'TRUE' ? <h6>This pet is dead</h6> : ''}
                  </CardText>
                </Card>
              </div>
            </MuiThemeProvider>
          </div>
        ))}
      </div>
    );
  }

  /**
   * This method renders query result passed to the component from Main component if the request has been processed successfully.
   */
  render() {
    const pets = this.props.queryResult;
    if (this.props.queryResultStatus === QueryResultStatus.FETCHED) {
      const result = [];
      result.push(this.renderPetsCard(pets.slice(0, this.state.maxShown)));
      if (this.state.maxShown < pets.length) {
        result.push(this.renderShowMore());
      }
      return (
        <div>
          {result}
        </div>);
    } else {
      return (
        <div>
        </div>
      );
    }
  }
}