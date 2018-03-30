import csv from 'csvtojson';
import fs from 'fs';

const csvFilePath = './pets.csv';
csv()
    .fromFile(csvFilePath)
    .on('json', (jsonObj) => {
        let json = JSON.stringify(obj);
        fs.writeFile('pets.json', json, 'utf8', (callback) => {
            if (err) {
                console.log("Error while writting to file")
            } else {
                console.log("Writing to file succsessful")
            }
        };
    })
    .on('done', (error) => {
        console.log('Csv file parsed')
    })
