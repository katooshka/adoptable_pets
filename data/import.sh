#/bin/bash

set -e

csvtojson pets.csv > pets.json
echo 'CSV file parsed'

mongo pets --eval "db.dropDatabase()"
echo 'Pets collection cleared'

mongoimport --db pets --collection pets --file pets.json --jsonArray
echo 'Imported to Mongo'