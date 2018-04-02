import React from 'react';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

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
                    <img src={pet.image} class={pet.imageClass} alt="Image not found" />
                  </CardMedia>
                  <CardText>
                    <h6><b>Type:</b> {pet.animalType}</h6>
                    <h6><b>Gender:</b> {pet.animalGender}</h6>
                    <h6><b>Breed:</b> {pet.animalBreed}</h6>
                    <h6><b>Color:</b> {pet.animalColor}</h6>
                    <h6><b>Address:</b> {pet.address}</h6>
                    <h6>{pet.isDead}</h6>
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
    if (pets !== "No results") {
      let image = 'https://orig00.deviantart.net/998c/f/2014/209/a/f/dog_and_cat_adoption_logo_by_otakucutie-d7spj4n.png';
      for (let pet of pets) {
        if (pet.image === '') {
          pet.image = image;
          pet.imageClass = 'alive-pet';
        }
        if (pet.isDead === 'TRUE') {
          pet.isDead = 'This pet is dead';
          pet.imageClass = 'dead-pet';
        } else {
          pet.isDead = ''
        }
      }
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