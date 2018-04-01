import React from 'react';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
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
      <div className="row">
      <div className="col-xs-0 col-sm-1 col-lg-2"></div>
      <div className="col-xs-12 col-sm-10 col-lg-8">
        <MuiThemeProvider>
          <RaisedButton
            label="Show more"
            style={style}
            onClick={this.updateShownPetsState}
          />
        </MuiThemeProvider>
      </div>
      <div className="col-xs-0 col-sm-1 col-lg-2"></div>
    </div>
    );
  }

  renderPetsCard(pets) {
    return (
      <div className="row">
      {pets.map((pet) => (
        <div className="col-md-6 col-lg-4">
          <MuiThemeProvider>
            <div>
              <Card className="pet-card">
                <CardMedia
                  overlay={<CardTitle title={pet.animalName} subtitle={pet.animalType} />}
                >
                  <img src={pet.image} alt="Image not found" />
                </CardMedia>
                <CardText>
                  <ul>
                    <li>
                      <h4>Gender: {pet.animalGender}</h4>
                    </li>
                    <li>
                      <h4>Breed: {pet.animalBreed}</h4>
                    </li>
                    <li>
                      <h4>Color: {pet.animalColor}</h4>
                    </li>
                    <li>
                      <h4>Address: {pet.address}</h4>
                    </li>
                  </ul>
                </CardText>
              </Card>
            </div>
          </MuiThemeProvider>
        </div>
      ))}
    </div>
    );
  }

  render() {
    const pets = this.props.queryResult;
    if (pets !== "Find animals") {
      let image = 'https://orig00.deviantart.net/998c/f/2014/209/a/f/dog_and_cat_adoption_logo_by_otakucutie-d7spj4n.png';
      for (let pet of pets) {
        if (pet.image === '') {
          pet.image = image;
        }
      }
      const result = [];
        result.push(this.renderPetsCard(pets.slice(0, this.state.maxShown)));
        if (this.state.maxShown < pets.length) {
          result.push(this.renderShowMore());
        }
      return (<div>
        {result}
      </div>);
    } else {
      return (
        <div>
          <h2>
            {pets}
          </h2>
        </div>
      );
    }
  }
}