# adoptable_pets
Searchable catalogue of data on adoptable pets.

## Description

A catalogue of data on adoptable pets where one can browse and search the dataset. 

![Pets gif](https://github.com/katooshka/adoptable_pets/blob/master/pets.gif)

[Notes](https://github.com/katooshka/adoptable_pets/blob/master/notes.md) file contains some of my thoughts about the challenge, what I found difficult, things to improve, etc.

## Installation

* Install git
  
  https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

* Clone repository

  `git clone https://github.com/katooshka/adoptable_pets.git`

* Navigate to the main app directory

  `cd adoptable_pets`

* Install NodeJS

  https://nodejs.org/en/download/package-manager/

* Install packages

  `npm install`

* Install MongoDB

  https://docs.mongodb.com/manual/installation/

* Start MongoDB

  `sudo service mongod start`
* Install the package and import data to the database

  ```
  sudo npm install -g csvtojson
  ./data/import.sh
  ```
* Run the server

  `sudo npm run build-prod`

You should be able to see the app up and running in your browser on http://localhost:80

The following installation steps have been tested for Amazon Linux EC2 instance:

  ```
  sudo yum install git-all -y
  git clone https://github.com/katooshka/adoptable_pets.git
  cd adoptable_pets/
  sudo chmod 755 ./install-on-amazon-linux.sh
  sudo ./install-on-amazon-linux.sh
  ```
  
## App flowchart
Here is the basic diagram on how the app is designed

![flowchart](https://user-images.githubusercontent.com/14299978/38213121-0d1d0d9a-36b8-11e8-9a98-75dbc6db7ac1.png)

## Technologies in use
* ReactJS, NodeJS, MongoDB
* Mocha, Chai for tests
* React components: [Material-UI](http://www.material-ui.com/)

The app has been tested and is working as expected in Chrome, Firefox and Opera browsers.



