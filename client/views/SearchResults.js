import React from 'react';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export class SearchResults extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const pets = this.props.queryResult;
    if (pets !== "Find animals") {
      return (
        <div>
          {pets.map((pet) => (
            <MuiThemeProvider>
              <div>
              <Card>
                <CardMedia
                  overlay={<CardTitle title={pet.animalName} subtitle={pet.animalType} />}
                >
                  <img src="https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg" alt="No img" />
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
          ))}
        </div>
      );
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