#/bin/bash

set -e

csvtojson ./data/pets.csv > ./data/pets.json
echo 'CSV file parsed'

mongo pets --eval "db.dropDatabase()"
echo 'Pets collection cleared'

mongoimport --db pets --collection pets --file ./data/pets.json --jsonArray
echo 'Imported to Mongo'